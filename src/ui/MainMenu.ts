import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { t } from '../i18n';

export class MainMenu {
  private container: HTMLElement;
  private onPlayGame: () => void;
  private onOpenAtlas: () => void;
  private onOpenJournal: () => void;
  private onOpenSettings: () => void;
  private onOpenAbout: () => void;

  constructor(
    container: HTMLElement,
    callbacks: {
      onPlayGame: () => void;
      onOpenAtlas: () => void;
      onOpenJournal: () => void;
      onOpenSettings: () => void;
      onOpenAbout: () => void;
    }
  ) {
    this.container = container;
    this.onPlayGame = callbacks.onPlayGame;
    this.onOpenAtlas = callbacks.onOpenAtlas;
    this.onOpenJournal = callbacks.onOpenJournal;
    this.onOpenSettings = callbacks.onOpenSettings;
    this.onOpenAbout = callbacks.onOpenAbout;
  }

  public show(): void {
    const state = GameState.getInstance();
    const hasSave = state.knowledgeFragments > 0 || state.completedMissionIds.length > 0;

    this.container.innerHTML = `
      <div class="main-menu-overlay">
        <div class="main-menu-backdrop">
          <div class="main-menu-mountains-silhouette"></div>
        </div>

        <div class="main-menu-card">
          <div class="menu-brand">
            <span class="hero-badge">${t('menu.badge')}</span>
            <h1 class="game-title">Atlas das Origens</h1>
            <p class="game-tagline">${t('menu.tagline')}</p>
          </div>

          <div class="menu-nav-buttons">
            <button class="btn-menu-primary" id="btn-play-game">
              <span class="btn-icon">▶</span>
              <span>${hasSave ? t('menu.continue') : t('menu.start')}</span>
            </button>

            <button class="btn-menu-option" id="btn-menu-atlas">
              <span class="btn-icon">🗺️</span>
              <span>${t('menu.atlas')}</span>
            </button>

            <button class="btn-menu-option" id="btn-menu-journal">
              <span class="btn-icon">📖</span>
              <span>${t('menu.journal')}</span>
            </button>

            <button class="btn-menu-option" id="btn-menu-settings">
              <span class="btn-icon">⚙️</span>
              <span>${t('menu.settings')}</span>
            </button>

            <button class="btn-menu-option" id="btn-menu-about">
              <span class="btn-icon">📜</span>
              <span>${t('menu.about')}</span>
            </button>
          </div>

          <footer class="main-menu-footer">
            <p>${t('menu.footer')}</p>
          </footer>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    this.container.querySelector('#btn-play-game')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      AudioManager.getInstance().startAndeanMusic();
      this.close();
      this.onPlayGame();
    });

    this.container.querySelector('#btn-menu-atlas')?.addEventListener('click', () => {
      this.onOpenAtlas();
    });

    this.container.querySelector('#btn-menu-journal')?.addEventListener('click', () => {
      this.onOpenJournal();
    });

    this.container.querySelector('#btn-menu-settings')?.addEventListener('click', () => {
      this.onOpenSettings();
    });

    this.container.querySelector('#btn-menu-about')?.addEventListener('click', () => {
      this.onOpenAbout();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
