import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { HUD } from './HUD';
import { MainMenu } from './MainMenu';
import { DialogueModal } from './DialogueModal';
import { JournalModal } from './JournalModal';
import { RegionMapModal } from './RegionMapModal';
import { SettingsModal } from './SettingsModal';
import { AboutModal } from './AboutModal';
import { TerracesMinigame } from './Minigames/TerracesMinigame';
import { QuipuMinigame } from './Minigames/QuipuMinigame';
import { StoneworkMinigame } from './Minigames/StoneworkMinigame';
import { ANDES_DISCOVERIES } from '../data/discoveries/andesDiscoveries';

export class UIManager {
  private uiRoot: HTMLElement;
  private hudContainer: HTMLElement;
  private modalContainer: HTMLElement;
  private toastContainer: HTMLElement;

  public hud!: HUD;
  public mainMenu!: MainMenu;
  public dialogueModal!: DialogueModal;
  public journalModal!: JournalModal;
  public regionMapModal!: RegionMapModal;
  public settingsModal!: SettingsModal;
  public aboutModal!: AboutModal;

  private onVirtualMoveCallback: (dx: number, dz: number) => void;
  private onInteractCallback: () => void;

  constructor(
    uiRoot: HTMLElement,
    callbacks: {
      onVirtualMove: (dx: number, dz: number) => void;
      onInteract: () => void;
      onStartGame: () => void;
    }
  ) {
    this.uiRoot = uiRoot;
    this.onVirtualMoveCallback = callbacks.onVirtualMove;
    this.onInteractCallback = callbacks.onInteract;

    // Cria as subcamadas da interface
    this.hudContainer = document.createElement('div');
    this.hudContainer.id = 'hud-container';
    this.uiRoot.appendChild(this.hudContainer);

    this.modalContainer = document.createElement('div');
    this.modalContainer.id = 'modal-container';
    this.uiRoot.appendChild(this.modalContainer);

    this.toastContainer = document.createElement('div');
    this.toastContainer.id = 'toast-container';
    this.uiRoot.appendChild(this.toastContainer);

    this.initComponents(callbacks.onStartGame);
    this.setupGlobalStateListeners();
  }

  private initComponents(onStartGame: () => void): void {
    this.dialogueModal = new DialogueModal(this.modalContainer, (minigameId) => {
      this.openMinigame(minigameId);
    });

    this.journalModal = new JournalModal(this.modalContainer);
    this.settingsModal = new SettingsModal(this.modalContainer);
    this.aboutModal = new AboutModal(this.modalContainer);

    this.regionMapModal = new RegionMapModal(this.modalContainer, (regionId) => {
      this.showToast(`Região ${regionId.toUpperCase()} selecionada.`, 'info');
    });

    this.hud = new HUD(this.hudContainer, {
      onOpenJournal: () => this.journalModal.show(),
      onOpenAtlas: () => this.regionMapModal.show(),
      onOpenSettings: () => this.settingsModal.show(),
      onOpenMainMenu: () => this.mainMenu.show(),
      onInteract: () => this.onInteractCallback(),
      onVirtualMove: (dx, dz) => this.onVirtualMoveCallback(dx, dz)
    });

    this.mainMenu = new MainMenu(this.modalContainer, {
      onPlayGame: () => {
        this.hud.render();
        onStartGame();
      },
      onOpenAtlas: () => this.regionMapModal.show(),
      onOpenJournal: () => this.journalModal.show(),
      onOpenSettings: () => this.settingsModal.show(),
      onOpenAbout: () => this.aboutModal.show()
    });
  }

  public openNpcDialogue(npcId: string): void {
    const dialogueIdMap: Record<string, string> = {
      npc_kuntur: 'dia_kuntur_intro',
      npc_sumaq: 'dia_sumaq_intro',
      npc_tupaq: 'dia_tupaq_intro',
      npc_wayra: 'dia_wayra_intro'
    };
    const dialogueId = dialogueIdMap[npcId] || 'dia_kuntur_intro';
    this.dialogueModal.show(dialogueId);
  }

  public openObjectInteraction(objectId: string): void {
    const state = GameState.getInstance();

    if (objectId === 'obj_intihuatana') {
      state.completeMissionStep('mission_main_andes', 'step_intihuatana');
      state.unlockDiscovery('disc_intihuatana');
      this.showToast(
        'Você contemplou o alinhamento solar no Intihuatana! (+25 Fragmentos)',
        'success'
      );
    } else if (objectId === 'obj_qullqa_deposito') {
      state.unlockDiscovery('disc_qullqa');
      this.showToast('Você examinou o sistema de ventilação das Qullqas!', 'info');
    } else if (objectId === 'obj_terraces_canal') {
      state.unlockDiscovery('disc_andenes');
      this.showToast('Você inspecionou a engenharia hidráulica dos terraços!', 'info');
    } else if (objectId === 'obj_bridge') {
      state.unlockDiscovery('disc_qeswachaka');
      this.showToast('Você atravessou a ponte pênsil Q\'eswachaka!', 'success');
    }
  }

  public openMinigame(minigameId: 'terraces' | 'quipu' | 'stonework'): void {
    if (minigameId === 'terraces') {
      const game = new TerracesMinigame(this.modalContainer, () => {
        this.showToast('Desafio dos Andenes Concluído!', 'success');
      });
      game.render();
    } else if (minigameId === 'quipu') {
      const game = new QuipuMinigame(this.modalContainer, () => {
        this.showToast('Desafio do Quipu Concluído!', 'success');
      });
      game.render();
    } else if (minigameId === 'stonework') {
      const game = new StoneworkMinigame(this.modalContainer, () => {
        this.showToast('Desafio da Cantaria Concluído!', 'success');
      });
      game.render();
    }
  }

  public showToast(message: string, type: 'info' | 'success' | 'warning' = 'info'): void {
    const toast = document.createElement('div');
    toast.className = `toast-pill toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✨' : type === 'warning' ? '⚠️' : '💡'}</span>
      <span class="toast-message">${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  private setupGlobalStateListeners(): void {
    const state = GameState.getInstance();

    state.on('discovery_unlocked', (discoveryId: string) => {
      AudioManager.getInstance().playDiscovery();
      const disc = ANDES_DISCOVERIES.find((d) => d.id === discoveryId);
      const name = disc ? disc.name : 'Nova Sabedoria';
      this.showToast(`Nova Descoberta Registrada no Diário: ${name} (+20 Fragmentos)`, 'success');
    });

    state.on('mission_completed', (mission) => {
      if (mission) {
        AudioManager.getInstance().playMissionComplete();
        this.showToast(`Missão Concluída: ${mission.title}! (+${mission.rewardFragments} Fragmentos)`, 'success');
      }
    });

    // Aplica configurações iniciais no DOM
    if (state.settings.highContrast) {
      document.body.classList.add('high-contrast-mode');
    }
    document.body.setAttribute('data-font-size', state.settings.fontSize);
  }
}
