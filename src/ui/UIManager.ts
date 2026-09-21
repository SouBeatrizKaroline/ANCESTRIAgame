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
import { MexicaDialogueModal } from './MexicaDialogueModal';
import { PeopleJourneyModal } from './PeopleJourneyModal';
import { PrototypeCompleteModal } from './PrototypeCompleteModal';
import { TerracesMinigame } from './Minigames/TerracesMinigame';
import { QuipuMinigame } from './Minigames/QuipuMinigame';
import { StoneworkMinigame } from './Minigames/StoneworkMinigame';
import { ANDES_DISCOVERIES } from '../data/discoveries/andesDiscoveries';
import { PEOPLE_CATALOG } from '../data/peopleCatalog';
import { getLanguage } from '../i18n';
import { CultureId } from '../data/types';
import { getPrototypeCompletion } from '../data/journeyProgress';
import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';

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
  public mexicaDialogueModal!: MexicaDialogueModal;
  public peopleJourneyModal!: PeopleJourneyModal;
  public prototypeCompleteModal!: PrototypeCompleteModal;

  private onVirtualMoveCallback: (dx: number, dz: number) => void;
  private onInteractCallback: () => void;
  private onJumpCallback: () => void;
  private modalOrigin: 'menu' | 'hud' = 'menu';

  constructor(
    uiRoot: HTMLElement,
    callbacks: {
      onVirtualMove: (dx: number, dz: number) => void;
      onInteract: () => void;
      onJump: () => void;
      onStartGame: (cultureId: CultureId) => void;
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
    this.toastContainer.className = 'toast-container';
    this.uiRoot.appendChild(this.toastContainer);

    this.initComponents(callbacks.onStartGame);
    this.setupGlobalStateListeners();
  }

  private initComponents(onStartGame: (cultureId: CultureId) => void): void {
    this.mainMenu = new MainMenu(this.modalContainer, {
      onPlayGame: () => {
        this.hud.render();
        onStartGame(GameState.getInstance().selectedCultureId);
      },
      onOpenAtlas: () => {
        this.modalOrigin = 'menu';
        this.regionMapModal.show();
      },
      onOpenJournal: () => {
        this.modalOrigin = 'menu';
        this.journalModal.show();
      },
      onOpenSettings: () => {
        this.modalOrigin = 'menu';
        this.settingsModal.show();
      },
      onOpenAbout: () => {
        this.modalOrigin = 'menu';
        this.aboutModal.show();
      }
    });

    this.dialogueModal = new DialogueModal(this.modalContainer, (minigameId) => {
      this.openMinigame(minigameId);
    });
    this.mexicaDialogueModal = new MexicaDialogueModal(this.modalContainer, () => this.checkPrototypeCompletion('mexica'));

    const restoreModalOrigin = () => {
      if (this.modalOrigin === 'menu') this.mainMenu.show();
    };

    this.journalModal = new JournalModal(this.modalContainer, restoreModalOrigin);
    this.settingsModal = new SettingsModal(this.modalContainer, restoreModalOrigin);
    this.aboutModal = new AboutModal(this.modalContainer, restoreModalOrigin);
    this.mexicaJourneyModal = new MexicaJourneyModal(this.modalContainer, () => this.cultureSelectionModal.show());
    this.andeanJourneyModal = new AndeanJourneyModal(this.modalContainer, () => this.cultureSelectionModal.show());
    this.peopleJourneyModal = new PeopleJourneyModal(this.modalContainer, () => this.cultureSelectionModal.show());
    const openEducation = (cultureId: CultureId) => {
      if (cultureId === 'mexica') this.mexicaJourneyModal.show();
      else if (cultureId === 'inca') this.andeanJourneyModal.show();
      else this.peopleJourneyModal.show(cultureId);
    };
    this.prototypeCompleteModal = new PrototypeCompleteModal(this.modalContainer, () => {}, () => this.mainMenu.show(), openEducation, (cultureId) => {
      GameState.getInstance().selectCulture(cultureId); this.hud.render(); onStartGame(cultureId);
    });
    this.cultureSelectionModal = new CultureSelectionModal(this.modalContainer, (cultureId) => {
      this.hud.render();
      onStartGame(cultureId);
    }, () => this.mexicaJourneyModal.show(), () => this.andeanJourneyModal.show(), (cultureId) => this.peopleJourneyModal.show(cultureId), () => this.mainMenu.show());

    this.regionMapModal = new RegionMapModal(this.modalContainer, (regionId) => {
      const lang = getLanguage();
      const msg = lang === 'es'
        ? `Territorio ${regionId.toUpperCase()} seleccionado.`
        : lang === 'pt-BR'
          ? `Território ${regionId.toUpperCase()} selecionado.`
          : `Territory ${regionId.toUpperCase()} selected.`;
      this.showToast(msg, 'info');
      restoreModalOrigin();
    }, (cultureId) => {
      GameState.getInstance().selectCulture(cultureId);
      this.hud.render();
      onStartGame(cultureId);
    }, (cultureId) => {
      if (cultureId === 'mexica') this.mexicaJourneyModal.show();
      else if (cultureId === 'inca') this.andeanJourneyModal.show();
      else this.peopleJourneyModal.show(cultureId);
    }, restoreModalOrigin);

    this.hud = new HUD(this.hudContainer, {
      onOpenJournal: () => {
        this.modalOrigin = 'hud';
        this.journalModal.show();
      },
      onOpenAtlas: () => {
        this.modalOrigin = 'hud';
        this.regionMapModal.show();
      },
      onOpenSettings: () => {
        this.modalOrigin = 'hud';
        this.settingsModal.show();
      },
      onOpenMainMenu: () => {
        this.modalContainer.innerHTML = '';
        this.mainMenu.show();
      },
      onInteract: () => {
        this.onInteractCallback();
      },
      onJump: () => {
        this.onJumpCallback();
      },
      onVirtualMove: (dx, dz) => {
        this.onVirtualMoveCallback(dx, dz);
      }
    });

    this.mainMenu.show();
  }

  public openNpcDialogue(npcId: string): void {
    if (npcId.startsWith('npc_mexica_')) {
      this.mexicaDialogueModal.show(npcId as 'npc_mexica_chinampa' | 'npc_mexica_market' | 'npc_mexica_language');
      return;
    }
    if (npcId.startsWith('npc_people_')) {
      const cultureId = npcId.replace('npc_people_', '');
      const profile = PEOPLE_CATALOG.find((item) => item.id === cultureId);
      if (profile) {
        const lang = getLanguage();
        const key = `ancestria_dialogue_${npcId}`;
        const first = !localStorage.getItem(key);
        if (first) {
          localStorage.setItem(key, '1');
          GameState.getInstance().addKnowledgeFragments(10);
        }
        const suffix = first
          ? (lang === 'es' ? ' (+10 fragmentos)' : lang === 'pt-BR' ? ' (+10 fragmentos)' : ' (+10 fragments)')
          : '';
        this.showToast(`${profile.name[lang]} — ${profile.summary[lang]}${suffix}`, first ? 'success' : 'info');
        this.checkPrototypeCompletion(cultureId as CultureId);
      }
      return;
    }
    const dialogueIdMap: Record<string, string> = {
      npc_kuntur: 'dia_kuntur_intro',
      npc_sumaq: 'dia_sumaq_intro',
      npc_tupaq: 'dia_tupaq_intro',
      npc_wayra: 'dia_wayra_intro'
    };
    const targetDialogueId = dialogueIdMap[npcId] || 'dia_kuntur_intro';
    this.dialogueModal.show(targetDialogueId);
  }

  public openObjectInteraction(objectId: string): void {
    const state = GameState.getInstance();
    const lang = getLanguage();

    if (objectId.startsWith('people_')) {
      const match = objectId.match(/^people_(.+)_(0|1|2)$/);
      if (match) {
        const cultureId = match[1];
        const index = Number(match[2]);
        const profile = PEOPLE_CATALOG.find((item) => item.id === cultureId);
        const labels = lang === 'es' ? ['Territorio', 'Lenguas', 'Memoria viva'] : lang === 'pt-BR' ? ['Território', 'Línguas', 'Memória viva'] : ['Territory', 'Languages', 'Living memory'];
        const text = profile ? `${labels[index]} · ${profile.name[lang]}` : labels[index];
        const key = `ancestria_find_${objectId}`;
        const isFirst = !localStorage.getItem(key);
        if (isFirst) {
          localStorage.setItem(key, '1');
          state.addKnowledgeFragments(10);
        }
        const suffix = isFirst
          ? (lang === 'es' ? ' (+10 fragmentos la primera vez)' : lang === 'pt-BR' ? ' (+10 fragmentos na primeira vez)' : ' (+10 fragments the first time)')
          : '';
        this.showToast(`${text}${suffix}`, isFirst ? 'success' : 'info');
        this.checkPrototypeCompletion(match[1] as CultureId);
      }
      return;
    }

    const mexicaFinds: Record<string, Record<string, string>> = {
      mexica_chinampas: {
        es: 'Las chinampas combinan suelo construido, canales y manejo continuo del agua. Son una práctica lacustre milenaria desarrollada por pueblos de la cuenca.',
        'pt-BR': 'As chinampas combinam solo fértil construído, canais e manejo contínuo da água. São uma prática lacustre milenar desenvolvida por povos da bacia.',
        en: 'Chinampas combine engineered soil, canals, and continuous water management—a long-standing wetland tradition in the basin.'
      },
      mexica_causeway: {
        es: 'Las calzadas y canales permitían la circulación simultánea a pie y en canoa, conectando a Mexico-Tenochtitlan con múltiples territorios.',
        'pt-BR': 'As calçadas e canais permitiam a circulação simultânea a pé e em canoas, conectando Mexico-Tenochtitlan com múltiplos territórios.',
        en: 'Causeways and canals enabled travel both on foot and by canoe, connecting Mexico-Tenochtitlan to surrounding territories.'
      },
      mexica_templo: {
        es: 'El recinto ceremonial del Templo Mayor era el corazón cósmico y ritual de Tenochtitlan, orientado a los solsticios y a los ciclos agrícolas del agua y el maíz.',
        'pt-BR': 'O recinto cerimonial do Templo Maior era o centro cósmico e ritual de Tenochtitlan, alinhado aos solstícios e aos ciclos agrícolas da água e do milho.',
        en: 'The ceremonial precinct of the Templo Mayor was the cosmic and ritual center of Tenochtitlan, aligned with solstices and agricultural cycles.'
      }
    };

    if (mexicaFinds[objectId]) {
      const key = `ancestria_find_${objectId}`;
      const isFirst = !localStorage.getItem(key);
      if (isFirst) {
        localStorage.setItem(key, '1');
        state.addKnowledgeFragments(10);
      }
      const findText = mexicaFinds[objectId][lang] || mexicaFinds[objectId]['es'];
      const suffix = isFirst
        ? (lang === 'es' ? ' (+10 fragmentos la primera vez)' : lang === 'pt-BR' ? ' (+10 fragmentos na primeira vez)' : ' (+10 fragments the first time)')
        : '';
      this.showToast(`${findText}${suffix}`, isFirst ? 'success' : 'info');
      this.checkPrototypeCompletion('mexica');
      return;
    }

    if (objectId === 'obj_intihuatana') {
      state.completeMissionStep('mission_main_andes', 'step_intihuatana');
      state.unlockDiscovery('disc_intihuatana');
      const msg = lang === 'es'
        ? '¡Has observado la alineación solar en el Intihuatana! (+25 fragmentos)'
        : lang === 'pt-BR'
          ? 'Você contemplou o alinhamento solar no Intihuatana! (+25 fragmentos)'
          : 'You observed the solar alignment at the Intihuatana! (+25 fragments)';
      this.showToast(msg, 'success');
    } else if (objectId === 'obj_qullqa_deposito') {
      state.unlockDiscovery('disc_qullqa');
      const msg = lang === 'es'
        ? '¡Has examinado el sistema de ventilación de las qullqas!'
        : lang === 'pt-BR'
          ? 'Você examinou o sistema de ventilação das Qullqas!'
          : 'You examined the ventilation system of the Qullqas!';
      this.showToast(msg, 'info');
    } else if (objectId === 'obj_terraces_canal') {
      state.unlockDiscovery('disc_andenes');
      const msg = lang === 'es'
        ? '¡Has observado la ingeniería hidráulica de las terrazas!'
        : lang === 'pt-BR'
          ? 'Você inspecionou a engenharia hidráulica dos terraços!'
          : 'You inspected the hydraulic engineering of the terraces!';
      this.showToast(msg, 'info');
    } else if (objectId === 'obj_bridge') {
      state.unlockDiscovery('disc_qeswachaka');
      const msg = lang === 'es'
        ? '¡Has cruzado el puente colgante Q\'eswachaka de fibra vegetal!'
        : lang === 'pt-BR'
          ? 'Você atravessou a ponte pênsil Q\'eswachaka de fibra vegetal!'
          : 'You crossed the Q\'eswachaka vegetable fiber rope bridge!';
      this.showToast(msg, 'success');
    }
  }

  public openMinigame(minigameId: 'terraces' | 'quipu' | 'stonework'): void {
    if (minigameId === 'terraces') {
      new TerracesMinigame(this.modalContainer, () => {
        GameState.getInstance().completeMissionStep('mission_main_andes', 'step_solve_terraces');
        const lang = getLanguage();
        const msg = lang === 'es'
          ? '¡Completaste el ordenamiento de los andenes con Sumaq!'
          : lang === 'pt-BR'
            ? 'Você concluiu o ordenamento dos andenes com Sumaq!'
            : 'You completed the terrace farming challenge with Sumaq!';
        this.showToast(msg, 'success');
        this.checkPrototypeCompletion('inca');
      }).render();
    } else if (minigameId === 'quipu') {
      new QuipuMinigame(this.modalContainer, () => {
        GameState.getInstance().completeMissionStep('mission_main_andes', 'step_solve_quipu');
        const lang = getLanguage();
        const msg = lang === 'es'
          ? '¡Descifraste con éxito el khipu con Tupaq!'
          : lang === 'pt-BR'
            ? 'Você decifrou com sucesso o quipu com Tupaq!'
            : 'You successfully deciphered the khipu with Tupaq!';
        this.showToast(msg, 'success');
        this.checkPrototypeCompletion('inca');
      }).render();
    } else if (minigameId === 'stonework') {
      new StoneworkMinigame(this.modalContainer, () => {
        GameState.getInstance().completeMissionStep('mission_main_andes', 'step_solve_stonework');
        const lang = getLanguage();
        const msg = lang === 'es'
          ? '¡Ajustaste con precisión la piedra poligonal con Wayra!'
          : lang === 'pt-BR'
            ? 'Você ajustou com precisão a pedra poligonal com Wayra!'
            : 'You precisely fitted the polygonal stone with Wayra!';
        this.showToast(msg, 'success');
        this.checkPrototypeCompletion('inca');
      }).render();
    }
  }

  public showToast(message: string, type: 'info' | 'success' | 'warning' = 'info'): void {
    const toast = document.createElement('div');
    toast.className = `ancestria-toast toast-${type}`;
    const icon = type === 'success' ? '✦' : type === 'warning' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;
    this.toastContainer.appendChild(toast);
    window.setTimeout(() => {
      toast.classList.add('toast-exit');
      window.setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  private checkPrototypeCompletion(cultureId: CultureId): void {
    const state = GameState.getInstance();
    const progress = getPrototypeCompletion(cultureId, state.unlockedDiscoveryIds);
    const noticeKey = `ancestria_prototype_complete_prompt_${cultureId}`;
    if (progress.completed < progress.total || localStorage.getItem(noticeKey)) return;
    localStorage.setItem(noticeKey, '1');
    window.setTimeout(() => this.prototypeCompleteModal.show(cultureId), 180);
  }

  private setupGlobalStateListeners(): void {
    const state = GameState.getInstance();

    state.on('discovery_unlocked', (discoveryId: string) => {
      AudioManager.getInstance().playDiscovery();
      const disc = ANDES_DISCOVERIES.find((d) => d.id === discoveryId);
      const lang = getLanguage();
      const name = disc ? disc.name : (lang === 'es' ? 'Nuevo saber' : lang === 'pt-BR' ? 'Novo saber' : 'New discovery');
      const msg = lang === 'es'
        ? `Nuevo descubrimiento registrado: ${name} (+20 fragmentos)`
        : lang === 'pt-BR'
          ? `Nova descoberta registrada: ${name} (+20 fragmentos)`
          : `New discovery recorded: ${name} (+20 fragments)`;
      this.showToast(msg, 'success');
      this.checkPrototypeCompletion('inca');
    });

    state.on('mission_completed', (mission) => {
      if (mission) {
        AudioManager.getInstance().playMissionComplete();
        const lang = getLanguage();
        const msg = lang === 'es'
          ? `Misión completada: ${mission.title} (+${mission.rewardFragments} fragmentos)`
          : lang === 'pt-BR'
            ? `Missão concluída: ${mission.title} (+${mission.rewardFragments} fragmentos)`
            : `Mission completed: ${mission.title} (+${mission.rewardFragments} fragments)`;
        this.showToast(msg, 'success');
      }
    });

    state.on('settings_changed', () => {
      this.hud.render();
    });
  }
}
