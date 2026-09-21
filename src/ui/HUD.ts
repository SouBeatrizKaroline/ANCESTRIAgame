import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ANDES_MISSIONS } from '../data/missions/andesMissions';
import { getLanguage, t } from '../i18n';
import { PEOPLE_CATALOG } from '../data/peopleCatalog';

export class HUD {
  private container: HTMLElement;
  private onOpenJournal: () => void;
  private onOpenAtlas: () => void;
  private onOpenSettings: () => void;
  private onOpenMainMenu: () => void;
  private onInteract: () => void;
  private onJump: () => void;
  private onVirtualMove: (dx: number, dz: number) => void;

  constructor(
    container: HTMLElement,
    callbacks: {
      onOpenJournal: () => void;
      onOpenAtlas: () => void;
      onOpenSettings: () => void;
      onOpenMainMenu: () => void;
      onInteract: () => void;
      onJump: () => void;
      onVirtualMove: (dx: number, dz: number) => void;
    }
  ) {
    this.container = container;
    this.onOpenJournal = callbacks.onOpenJournal;
    this.onOpenAtlas = callbacks.onOpenAtlas;
    this.onOpenSettings = callbacks.onOpenSettings;
    this.onOpenMainMenu = callbacks.onOpenMainMenu;
    this.onInteract = callbacks.onInteract;
    this.onJump = callbacks.onJump;
    this.onVirtualMove = callbacks.onVirtualMove;
  }

  public render(): void {
    const state = GameState.getInstance();
    const catalogProfile = PEOPLE_CATALOG.find((item) => item.id === state.selectedCultureId);
    const lang = getLanguage();
    const journeyName =
      state.selectedCultureId === 'mexica'
        ? 'Mexico-Tenochtitlan'
        : state.selectedCultureId === 'inca'
          ? (lang === 'es' ? 'Andes · Tawantinsuyu' : lang === 'pt-BR' ? 'Andes · Tawantinsuyu' : 'Andes · Tawantinsuyu')
          : catalogProfile?.name[lang] || 'Atlas';

    this.container.innerHTML = `
      <div class="hud-layer">
        <!-- Barra Superior -->
        <header class="hud-top-bar">
          <div class="hud-brand">
            <span class="region-pill">ANCESTRIA • ${journeyName}</span>
          </div>

          <div class="hud-center-stats">
            <div class="stat-pill fragments-stat" title="${t('hud.fragments')}">
              <span class="stat-icon">✨</span>
              <span class="stat-value" id="hud-fragments-count">${state.knowledgeFragments}</span>
              <span class="stat-label">${t('hud.fragments')}</span>
            </div>
          </div>

          <div class="hud-top-actions">
            <button class="hud-btn" id="btn-hud-journal" title="${t('hud.journal')} [J]">
              <span class="hud-btn-icon">📖</span><span class="hud-btn-label">${t('hud.journal')}</span>
            </button>
            <button class="hud-btn" id="btn-hud-atlas" title="${t('hud.map')} [M]">
              <span class="hud-btn-icon">🗺️</span><span class="hud-btn-label">${t('hud.map')}</span>
            </button>
            <button class="hud-btn" id="btn-hud-settings" title="${t('hud.settings')}">
              <span class="hud-btn-icon">⚙️</span><span class="hud-btn-label">${t('hud.settings')}</span>
            </button>
            <button class="hud-btn" id="btn-hud-menu" title="${t('hud.home')}">
              <span class="hud-btn-icon">🏠</span><span class="hud-btn-label">${t('hud.home')}</span>
            </button>
          </div>
        </header>

        <!-- Cartão de Missão Ativa -->
        <aside class="hud-mission-card" id="hud-mission-card" tabindex="0" role="button" aria-expanded="false">
          ${this.renderActiveMission()}
        </aside>

        <!-- Indicador Central Flutuante de Interação -->
        <div class="hud-interaction-banner" id="hud-interaction-banner" style="display: none;">
          <button class="btn-interaction-prompt" id="btn-hud-interact">
            <span id="interaction-prompt-text">${t('action.interact')}</span>
          </button>
        </div>

        <!-- Controles Virtuais para Dispositivos Móveis / Touch -->
        <div class="hud-touch-controls" id="hud-touch-controls">
          <div class="dpad-container">
            <button class="dpad-btn dpad-up" data-dir="up" aria-label="Mover hacia arriba">▲</button>
            <div class="dpad-middle">
              <button class="dpad-btn dpad-left" data-dir="left" aria-label="Mover a la izquierda">◀</button>
              <div class="dpad-center"></div>
              <button class="dpad-btn dpad-right" data-dir="right" aria-label="Mover a la derecha">▶</button>
            </div>
            <button class="dpad-btn dpad-down" data-dir="down" aria-label="Mover hacia abajo">▼</button>
          </div>

          <div class="touch-action-cluster">
            <button class="touch-action-btn touch-jump-btn" id="btn-touch-jump" aria-label="${t('hud.jump')}">
              <span>${t('hud.jump').toUpperCase()}</span>
            </button>
            <button class="touch-action-btn" id="btn-touch-action" aria-label="${t('hud.action')}">
              <span>${t('hud.action').toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
    this.subscribeStateChanges();
  }

  private renderActiveMission(): string {
    const state = GameState.getInstance();
    const lang = getLanguage();

    if (state.selectedCultureId === 'mexica') {
      return `
        <div class="mission-header">
          <span class="mission-badge">${t('mexica.mission')}</span>
          <h4>${t('mexica.missionTitle')}</h4>
        </div>
        <div class="mission-step">
          <span class="step-bullet">●</span>
          <p>${t('mexica.objective')}</p>
        </div>
      `;
    }

    if (state.selectedCultureId !== 'inca') {
      const profile = PEOPLE_CATALOG.find((item) => item.id === state.selectedCultureId);
      if (profile) {
        const badge = lang === 'es' ? 'Recorrido exploratorio' : lang === 'pt-BR' ? 'Percurso exploratório' : 'Exploratory journey';
        const objective = lang === 'es'
          ? 'Explora los tres núcleos de memoria viva y conversa con el personaje educativo.'
          : lang === 'pt-BR'
            ? 'Explore os três núcleos de memória viva e converse com o personagem educativo.'
            : 'Explore the three living memory nodes and speak with the educational resident.';
        return `
          <div class="mission-header">
            <span class="mission-badge">${badge}</span>
            <h4>${profile.name[lang]}</h4>
          </div>
          <div class="mission-step">
            <span class="step-bullet">●</span>
            <p>${objective}</p>
          </div>
        `;
      }
    }

    const mission = ANDES_MISSIONS.find((m) => m.id === state.activeMissionId) || ANDES_MISSIONS[0];

    if (!mission) {
      const freeTitle = lang === 'es' ? 'Exploración libre' : lang === 'pt-BR' ? 'Exploração livre' : 'Free exploration';
      const freeDesc = lang === 'es' ? 'Descubre memorias y registra hallazgos en tu diario.' : lang === 'pt-BR' ? 'Descubra memórias e registre achados no seu diário.' : 'Discover memories and record findings in your journal.';
      return `
        <div class="mission-header">
          <h4>${freeTitle}</h4>
        </div>
        <p class="mission-desc">${freeDesc}</p>
      `;
    }

    const currentStep = mission.steps.find((s) => !s.isCompleted);
    const completedCount = mission.steps.filter((s) => s.isCompleted).length;
    const progressPercent = Math.round((completedCount / mission.steps.length) * 100);
    const badgeLabel = mission.type === 'principal'
      ? (lang === 'es' ? 'Misión principal' : lang === 'pt-BR' ? 'Missão principal' : 'Main mission')
      : (lang === 'es' ? 'Misión secundaria' : lang === 'pt-BR' ? 'Missão secundária' : 'Side mission');
    const completeLabel = lang === 'es' ? '¡Misión completada!' : lang === 'pt-BR' ? 'Missão concluída!' : 'Mission completed!';

    return `
      <div class="mission-header">
        <span class="mission-badge">${badgeLabel}</span>
        <h4>${mission.title}</h4>
      </div>
      <div class="mission-step">
        <span class="step-bullet">●</span>
        <p>${currentStep ? currentStep.description : completeLabel}</p>
      </div>
      <div class="mission-progress-bar">
        <div class="progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    `;
  }

  private attachEvents(): void {
    const missionCard = this.container.querySelector<HTMLElement>('#hud-mission-card');
    const toggleMission = () => {
      if (!window.matchMedia('(max-width: 600px)').matches || !missionCard) return;
      const expanded = missionCard.classList.toggle('expanded');
      missionCard.setAttribute('aria-expanded', String(expanded));
    };
    missionCard?.addEventListener('click', toggleMission);
    missionCard?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMission();
      }
    });

    this.container.querySelector('#btn-hud-journal')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.onOpenJournal();
    });

    this.container.querySelector('#btn-hud-atlas')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.onOpenAtlas();
    });

    this.container.querySelector('#btn-hud-settings')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.onOpenSettings();
    });

    this.container.querySelector('#btn-hud-menu')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.onOpenMainMenu();
    });

    this.container.querySelector('#btn-hud-interact')?.addEventListener('click', () => {
      this.onInteract();
    });

    // Touch Action button
    const actionBtn = this.container.querySelector('#btn-touch-action');
    if (actionBtn) {
      actionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.onInteract();
      });
      actionBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.onInteract();
      }, { passive: false });
    }

    // Touch Jump button
    const jumpBtn = this.container.querySelector('#btn-touch-jump');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.onJump();
      });
      jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.onJump();
      }, { passive: false });
    }

    // D-Pad Touch events com suporte contínuo a arrasto e multi-toque móvel
    const dpadButtons = this.container.querySelectorAll<HTMLElement>('.dpad-btn');
    const dpadContainer = this.container.querySelector<HTMLElement>('.dpad-container');
    let activeDir = { x: 0, z: 0 };

    const updateDir = (dir: string | null) => {
      activeDir = { x: 0, z: 0 };
      if (dir === 'up') activeDir.z = -1;
      if (dir === 'down') activeDir.z = 1;
      if (dir === 'left') activeDir.x = -1;
      if (dir === 'right') activeDir.x = 1;
      this.onVirtualMove(activeDir.x, activeDir.z);
    };

    const findDirFromTouch = (touch: Touch): string | null => {
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const btn = el?.closest<HTMLElement>('.dpad-btn');
      return btn ? btn.getAttribute('data-dir') : null;
    };

    let activeTouchId: number | null = null;

    if (dpadContainer) {
      dpadContainer.addEventListener('touchstart', (e: TouchEvent) => {
        e.preventDefault();
        if (e.changedTouches.length > 0) {
          const t = e.changedTouches[0];
          activeTouchId = t.identifier;
          updateDir(findDirFromTouch(t));
        }
      }, { passive: false });

      dpadContainer.addEventListener('touchmove', (e: TouchEvent) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.identifier === activeTouchId) {
            updateDir(findDirFromTouch(t));
            break;
          }
        }
      }, { passive: false });

      const endTouch = (e: TouchEvent) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === activeTouchId) {
            activeTouchId = null;
            updateDir(null);
            break;
          }
        }
      };

      dpadContainer.addEventListener('touchend', endTouch, { passive: false });
      dpadContainer.addEventListener('touchcancel', endTouch, { passive: false });
    }

    // Fallback mouse listeners para ambiente desktop
    dpadButtons.forEach((btn) => {
      const dir = btn.getAttribute('data-dir');
      btn.addEventListener('mousedown', (e) => { e.preventDefault(); updateDir(dir); });
      btn.addEventListener('mouseup', (e) => { e.preventDefault(); updateDir(null); });
      btn.addEventListener('mouseleave', (e) => { e.preventDefault(); updateDir(null); });
    });

    // Atalhos de teclado [J] para diário e [M] para mapa
    window.addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'KeyJ') {
        this.onOpenJournal();
      } else if (e.code === 'KeyM') {
        this.onOpenAtlas();
      }
    });
  }

  private subscribeStateChanges(): void {
    const state = GameState.getInstance();

    state.on('fragments_changed', (fragments: number) => {
      const el = this.container.querySelector('#hud-fragments-count');
      if (el) el.textContent = String(fragments);
    });

    state.on('mission_updated', () => {
      const card = this.container.querySelector('#hud-mission-card');
      if (card) card.innerHTML = this.renderActiveMission();
    });

    state.on('mission_completed', () => {
      const card = this.container.querySelector('#hud-mission-card');
      if (card) card.innerHTML = this.renderActiveMission();
    });

    state.on('interaction_target_changed', (interaction) => {
      const banner = this.container.querySelector('#hud-interaction-banner') as HTMLElement;
      const text = this.container.querySelector('#interaction-prompt-text');
      if (banner && text) {
        if (interaction) {
          text.textContent = interaction.promptText;
          banner.style.display = 'flex';
        } else {
          banner.style.display = 'none';
        }
      }
    });
  }
}
