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
    const lang = getLanguage();
    const catalogProfile = PEOPLE_CATALOG.find((item) => item.id === state.selectedCultureId);
    const journeyName = state.selectedCultureId === 'mexica'
      ? 'Mexico-Tenochtitlan'
      : state.selectedCultureId === 'inca'
      ? 'Andes · Tawantinsuyu'
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

        <!-- Controles Virtuais Touch Mobile -->
        <div class="hud-touch-controls" id="hud-touch-controls" style="touch-action: none; -webkit-touch-callout: none; user-select: none;">
          <div class="dpad-container" id="dpad-touch-area" style="touch-action: none; user-select: none;">
            <button class="dpad-btn dpad-up" data-dir="up" aria-label="Mover arriba" style="touch-action: none;">▲</button>
            <div class="dpad-middle" style="touch-action: none;">
              <button class="dpad-btn dpad-left" data-dir="left" aria-label="Mover izquierda" style="touch-action: none;">◀</button>
              <div class="dpad-center" style="touch-action: none;"></div>
              <button class="dpad-btn dpad-right" data-dir="right" aria-label="Mover derecha" style="touch-action: none;">▶</button>
            </div>
            <button class="dpad-btn dpad-down" data-dir="down" aria-label="Mover abajo" style="touch-action: none;">▼</button>
          </div>

          <button class="touch-action-btn touch-jump-btn" id="btn-touch-jump" aria-label="${t('hud.jump')}" style="touch-action: none; user-select: none;">
            <span>${t('hud.jump').toUpperCase()}</span>
          </button>
          <button class="touch-action-btn" id="btn-touch-action" aria-label="${t('hud.action')}" style="touch-action: none; user-select: none;">
            <span>${t('hud.action').toUpperCase()}</span>
          </button>
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
        <div class="mission-header"><span class="mission-badge">${t('mexica.mission')}</span><h4>${t('mexica.missionTitle')}</h4></div>
        <div class="mission-step"><span class="step-bullet">●</span><p>${t('mexica.objective')}</p></div>
      `;
    }

    if (state.selectedCultureId !== 'inca') {
      const profile = PEOPLE_CATALOG.find((item) => item.id === state.selectedCultureId);
      if (profile) {
        const badge = lang === 'es' ? 'Recorrido exploratorio' : lang === 'pt-BR' ? 'Percurso exploratório' : 'Exploratory journey';
        const objective = lang === 'es'
          ? 'Explora los tres núcleos de saber (territorio, lenguas y memoria) y conversa con la guía educativa.'
          : lang === 'pt-BR'
          ? 'Explore os três núcleos de saber (território, línguas e memória) e converse com a guia educativa.'
          : 'Explore the three knowledge centers (territory, languages, and memory) and talk to the guide.';
        return `
          <div class="mission-header"><span class="mission-badge">${badge}</span><h4>${profile.name[lang]}</h4></div>
          <div class="mission-step"><span class="step-bullet">●</span><p>${objective}</p></div>
        `;
      }
    }

    const mission = ANDES_MISSIONS.find((m) => m.id === state.activeMissionId) || ANDES_MISSIONS[0];

    if (!mission) {
      return `
        <div class="mission-header">
          <h4>${lang === 'es' ? 'Exploración libre' : lang === 'pt-BR' ? 'Exploração livre' : 'Free exploration'}</h4>
        </div>
        <p class="mission-desc">${lang === 'es' ? 'Descubre saberes y registra hallazgos en tu diario.' : lang === 'pt-BR' ? 'Descubra saberes e registre achados no seu diário.' : 'Discover knowledge and record findings in your journal.'}</p>
      `;
    }

    const currentStep = mission.steps.find((s) => !s.isCompleted);
    const completedCount = mission.steps.filter((s) => s.isCompleted).length;
    const progressPercent = Math.round((completedCount / mission.steps.length) * 100);

    const typeBadge = mission.type === 'principal'
      ? (lang === 'es' ? 'Misión principal' : lang === 'pt-BR' ? 'Missão principal' : 'Main mission')
      : (lang === 'es' ? 'Misión secundaria' : lang === 'pt-BR' ? 'Missão secundária' : 'Side mission');

    const objLabel = lang === 'es' ? 'Objetivo actual' : lang === 'pt-BR' ? 'Objetivo atual' : 'Current objective';
    const doneLabel = lang === 'es' ? '¡Misión completada!' : lang === 'pt-BR' ? '¡Missão concluída!' : 'Mission completed!';

    return `
      <div class="mission-header">
        <span class="mission-badge">${typeBadge}</span>
        <h4>${mission.title}</h4>
      </div>
      <div class="mission-step">
        <span class="step-bullet">●</span>
        <p><strong>${objLabel}:</strong> ${currentStep ? currentStep.description : doneLabel}</p>
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

    const touchAction = this.container.querySelector('#btn-touch-action');
    const touchJump = this.container.querySelector('#btn-touch-jump');

    const handleAction = (e: Event) => {
      e.preventDefault();
      this.onInteract();
    };

    const handleJump = (e: Event) => {
      e.preventDefault();
      this.onJump();
    };

    touchAction?.addEventListener('touchstart', handleAction, { passive: false });
    touchAction?.addEventListener('click', handleAction);

    touchJump?.addEventListener('touchstart', handleJump, { passive: false });
    touchJump?.addEventListener('click', handleJump);

    const dpadContainer = this.container.querySelector<HTMLElement>('#dpad-touch-area');
    const dpadButtons = this.container.querySelectorAll<HTMLButtonElement>('.dpad-btn');

    const setMove = (x: number, z: number) => {
      this.onVirtualMove(x, z);
    };

    if (dpadContainer) {
      let isTouchingDpad = false;

      const calcDpadVector = (clientX: number, clientY: number) => {
        const rect = dpadContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 8) {
          setMove(0, 0);
          return;
        }

        const vx = Math.abs(dx) > 10 ? Math.sign(dx) : 0;
        const vz = Math.abs(dy) > 10 ? Math.sign(dy) : 0;
        setMove(vx, vz);
      };

      dpadContainer.addEventListener('touchstart', (e: TouchEvent) => {
        e.preventDefault();
        isTouchingDpad = true;
        if (e.touches.length > 0) {
          calcDpadVector(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: false });

      dpadContainer.addEventListener('touchmove', (e: TouchEvent) => {
        e.preventDefault();
        if (isTouchingDpad && e.touches.length > 0) {
          calcDpadVector(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: false });

      const endDpadTouch = (e: Event) => {
        e.preventDefault();
        isTouchingDpad = false;
        setMove(0, 0);
      };

      dpadContainer.addEventListener('touchend', endDpadTouch, { passive: false });
      dpadContainer.addEventListener('touchcancel', endDpadTouch, { passive: false });
    }

    dpadButtons.forEach((btn) => {
      const dir = btn.getAttribute('data-dir');
      const startMove = (e: Event) => {
        e.preventDefault();
        let vx = 0, vz = 0;
        if (dir === 'up') vz = -1;
        if (dir === 'down') vz = 1;
        if (dir === 'left') vx = -1;
        if (dir === 'right') vx = 1;
        setMove(vx, vz);
      };

      const endMove = (e: Event) => {
        e.preventDefault();
        setMove(0, 0);
      };

      btn.addEventListener('mousedown', startMove);
      btn.addEventListener('mouseup', endMove);
      btn.addEventListener('mouseleave', endMove);
    });

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
