import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { HUD } from './HUD';
import { MainMenu } from './MainMenu';
import { DialogueModal } from './DialogueModal';
import { JournalModal } from './JournalModal';
import { RegionMapModal } from './RegionMapModal';
import { SettingsModal } from './SettingsModal';
import { AboutModal } from './AboutModal';
import { CultureSelectionModal } from './CultureSelectionModal';
import { MexicaJourneyModal } from './MexicaJourneyModal';
import { AndeanJourneyModal } from './AndeanJourneyModal';
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
  public cultureSelectionModal!: CultureSelectionModal;
  public mexicaJourneyModal!: MexicaJourneyModal;
  public andeanJourneyModal!: AndeanJourneyModal;

  private onVirtualMoveCallback: (dx: number, dz: number) => void;
  private onInteractCallback: () => void;
  private onJumpCallback: () => void;

  constructor(
    uiRoot: HTMLElement,
    callbacks: {
      onVirtualMove: (dx: number, dz: number) => void;
      onInteract: () => void;
      onJump: () => void;
      onStartGame: (cultureId: import('../data/types').CultureId) => void;
    }
  ) {
    this.uiRoot = uiRoot;
    this.onVirtualMoveCallback = callbacks.onVirtualMove;
    this.onInteractCallback = callbacks.onInteract;
    this.onJumpCallback = callbacks.onJump;

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

  private initComponents(onStartGame: (cultureId: import('../data/types').CultureId) => void): void {
    this.dialogueModal = new DialogueModal(this.modalContainer, (minigameId) => {
      this.openMinigame(minigameId);
    });

    this.journalModal = new JournalModal(this.modalContainer);
    this.settingsModal = new SettingsModal(this.modalContainer);
    this.aboutModal = new AboutModal(this.modalContainer);
    this.mexicaJourneyModal = new MexicaJourneyModal(this.modalContainer, () => this.cultureSelectionModal.show());
    this.andeanJourneyModal = new AndeanJourneyModal(this.modalContainer, () => this.cultureSelectionModal.show());
    this.cultureSelectionModal = new CultureSelectionModal(this.modalContainer, (cultureId) => {
      this.hud.render();
      onStartGame(cultureId);
    }, () => this.mexicaJourneyModal.show(), () => this.andeanJourneyModal.show(), () => this.mainMenu.show());

    this.regionMapModal = new RegionMapModal(this.modalContainer, (regionId) => {
      this.showToast(`Territorio ${regionId.toUpperCase()} seleccionado.`, 'info');
    });

    this.hud = new HUD(this.hudContainer, {
      onOpenJournal: () => this.journalModal.show(),
      onOpenAtlas: () => this.regionMapModal.show(),
      onOpenSettings: () => this.settingsModal.show(),
      onOpenMainMenu: () => this.mainMenu.show(),
      onInteract: () => this.onInteractCallback(),
      onJump: () => this.onJumpCallback(),
      onVirtualMove: (dx, dz) => this.onVirtualMoveCallback(dx, dz)
    });

    this.mainMenu = new MainMenu(this.modalContainer, {
      onPlayGame: () => {
        this.cultureSelectionModal.show();
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

    const mexicaFinds: Record<string, string> = {
      mexica_chinampas: 'Las chinampas combinan suelo construido, canales y manejo continuo del agua. Son una práctica lacustre de larga duración, no una invención aislada de un único pueblo.',
      mexica_causeway: 'Las calzadas facilitaron el tránsito terrestre; los canales sostuvieron la movilidad por agua y conectaron la ciudad con otros territorios de la cuenca.',
      mexica_templo: 'El recinto ceremonial se presenta con contexto y fuentes: no reconstruimos ceremonias ni voces como si existiera una interpretación única.'
    };
    if (mexicaFinds[objectId]) {
      const key = `ancestria_find_${objectId}`;
      if (!localStorage.getItem(key)) { localStorage.setItem(key, '1'); state.addKnowledgeFragments(10); }
      this.showToast(`${mexicaFinds[objectId]} (+10 fragmentos la primera vez)`, 'success');
      return;
    }

    if (objectId === 'obj_intihuatana') {
      state.completeMissionStep('mission_main_andes', 'step_intihuatana');
      state.unlockDiscovery('disc_intihuatana');
      this.showToast(
        '¡Has observado la alineación solar del Intihuatana! (+25 fragmentos)',
        'success'
      );
    } else if (objectId === 'obj_qullqa_deposito') {
      state.unlockDiscovery('disc_qullqa');
      this.showToast('¡Has examinado el sistema de ventilación de las qullqas!', 'info');
    } else if (objectId === 'obj_terraces_canal') {
      state.unlockDiscovery('disc_andenes');
      this.showToast('¡Has observado la ingeniería hidráulica de las terrazas!', 'info');
    } else if (objectId === 'obj_bridge') {
      state.unlockDiscovery('disc_qeswachaka');
      this.showToast('¡Has cruzado el puente colgante Q\'eswachaka!', 'success');
    }
  }

  public openMinigame(minigameId: 'terraces' | 'quipu' | 'stonework'): void {
    if (minigameId === 'terraces') {
      const game = new TerracesMinigame(this.modalContainer, () => {
        this.showToast('¡Desafío de los andenes completado!', 'success');
      });
      game.render();
    } else if (minigameId === 'quipu') {
      const game = new QuipuMinigame(this.modalContainer, () => {
        this.showToast('¡Desafío del quipu completado!', 'success');
      });
      game.render();
    } else if (minigameId === 'stonework') {
      const game = new StoneworkMinigame(this.modalContainer, () => {
        this.showToast('¡Desafío de cantería completado!', 'success');
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
      const name = disc ? disc.name : 'Nuevo saber';
      this.showToast(`Nuevo descubrimiento registrado: ${name} (+20 fragmentos)`, 'success');
    });

    state.on('mission_completed', (mission) => {
      if (mission) {
        AudioManager.getInstance().playMissionComplete();
        this.showToast(`Misión completada: ${mission.title} (+${mission.rewardFragments} fragmentos)`, 'success');
      }
    });

    // Aplica configurações iniciais no DOM
    if (state.settings.highContrast) {
      document.body.classList.add('high-contrast-mode');
    }
    document.body.setAttribute('data-font-size', state.settings.fontSize);
  }
}
