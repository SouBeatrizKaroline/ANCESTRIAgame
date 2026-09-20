import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ANDES_MISSIONS } from '../data/missions/andesMissions';

export class HUD {
  private container: HTMLElement;
  private onOpenJournal: () => void;
  private onOpenAtlas: () => void;
  private onOpenSettings: () => void;
  private onOpenMainMenu: () => void;
  private onInteract: () => void;
  private onVirtualMove: (dx: number, dz: number) => void;

  constructor(
    container: HTMLElement,
    callbacks: {
      onOpenJournal: () => void;
      onOpenAtlas: () => void;
      onOpenSettings: () => void;
      onOpenMainMenu: () => void;
      onInteract: () => void;
      onVirtualMove: (dx: number, dz: number) => void;
    }
  ) {
    this.container = container;
    this.onOpenJournal = callbacks.onOpenJournal;
    this.onOpenAtlas = callbacks.onOpenAtlas;
    this.onOpenSettings = callbacks.onOpenSettings;
    this.onOpenMainMenu = callbacks.onOpenMainMenu;
    this.onInteract = callbacks.onInteract;
    this.onVirtualMove = callbacks.onVirtualMove;
  }

  public render(): void {
    const state = GameState.getInstance();

    this.container.innerHTML = `
      <div class="hud-layer">
        <!-- Barra Superior -->
        <header class="hud-top-bar">
          <div class="hud-brand">
            <span class="region-pill">ANCESTRIA • Andes</span>
          </div>

          <div class="hud-center-stats">
            <div class="stat-pill fragments-stat" title="Fragmentos de conocimiento">
              <span class="stat-icon">✨</span>
              <span class="stat-value" id="hud-fragments-count">${state.knowledgeFragments}</span>
              <span class="stat-label">Fragmentos</span>
            </div>
          </div>

          <div class="hud-top-actions">
            <button class="hud-btn" id="btn-hud-journal" title="Abrir diario [J]">
              <span>📖 Diario</span>
            </button>
            <button class="hud-btn" id="btn-hud-atlas" title="Abrir mapa de ANCESTRIA [M]">
              <span>🗺️ Mapa</span>
            </button>
            <button class="hud-btn" id="btn-hud-settings" title="Configuración">
              <span>⚙️</span>
            </button>
            <button class="hud-btn" id="btn-hud-menu" title="Menú principal">
              <span>🏠</span>
            </button>
          </div>
        </header>

        <!-- Cartão de Missão Ativa -->
        <aside class="hud-mission-card" id="hud-mission-card">
          ${this.renderActiveMission()}
        </aside>

        <!-- Indicador Central Flutuante de Interação -->
        <div class="hud-interaction-banner" id="hud-interaction-banner" style="display: none;">
          <button class="btn-interaction-prompt" id="btn-hud-interact">
            <span class="key-badge">E</span>
            <span id="interaction-prompt-text">Interactuar</span>
          </button>
        </div>

        <!-- Controles Virtuais para Dispositivos Móveis / Touch -->
        <div class="hud-touch-controls" id="hud-touch-controls">
          <div class="dpad-container">
            <button class="dpad-btn dpad-up" data-dir="up">▲</button>
            <div class="dpad-middle">
              <button class="dpad-btn dpad-left" data-dir="left">◀</button>
              <div class="dpad-center"></div>
              <button class="dpad-btn dpad-right" data-dir="right">▶</button>
            </div>
            <button class="dpad-btn dpad-down" data-dir="down">▼</button>
          </div>

          <button class="touch-action-btn" id="btn-touch-action">
            <span>ACCIÓN [E]</span>
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
    this.subscribeStateChanges();
  }

  private renderActiveMission(): string {
    const state = GameState.getInstance();
    const mission = ANDES_MISSIONS.find((m) => m.id === state.activeMissionId) || ANDES_MISSIONS[0];

    if (!mission) {
      return `
        <div class="mission-header">
          <h4>Exploración libre</h4>
        </div>
        <p class="mission-desc">Descubre memorias y registra hallazgos en tu diario.</p>
      `;
    }

    const currentStep = mission.steps.find((s) => !s.isCompleted);
    const completedCount = mission.steps.filter((s) => s.isCompleted).length;
    const progressPercent = Math.round((completedCount / mission.steps.length) * 100);

    return `
      <div class="mission-header">
        <span class="mission-badge">${mission.type === 'principal' ? 'Misión principal' : 'Misión secundaria'}</span>
        <h4>${mission.title}</h4>
      </div>
      <div class="mission-step">
        <span class="step-bullet">●</span>
        <p><strong>Objetivo actual:</strong> ${currentStep ? currentStep.description : '¡Misión completada!'}</p>
      </div>
      <div class="mission-progress-bar">
        <div class="progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    `;
  }

  private attachEvents(): void {
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

    this.container.querySelector('#btn-touch-action')?.addEventListener('click', () => {
      this.onInteract();
    });

    // D-Pad Touch events
    const dpadButtons = this.container.querySelectorAll('.dpad-btn');
    let moveTimer: number | null = null;
    let activeDir = { x: 0, z: 0 };

    const updateDir = (dir: string | null) => {
      activeDir = { x: 0, z: 0 };
      if (dir === 'up') activeDir.z = -1;
      if (dir === 'down') activeDir.z = 1;
      if (dir === 'left') activeDir.x = -1;
      if (dir === 'right') activeDir.x = 1;
      this.onVirtualMove(activeDir.x, activeDir.z);
    };

    dpadButtons.forEach((btn) => {
      const dir = btn.getAttribute('data-dir');
      const startMove = (e: Event) => {
        e.preventDefault();
        updateDir(dir);
      };
      const endMove = (e: Event) => {
        e.preventDefault();
        updateDir(null);
      };

      btn.addEventListener('touchstart', startMove, { passive: false });
      btn.addEventListener('touchend', endMove, { passive: false });
      btn.addEventListener('mousedown', startMove);
      btn.addEventListener('mouseup', endMove);
      btn.addEventListener('mouseleave', endMove);
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
