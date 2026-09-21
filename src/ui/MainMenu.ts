import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { applyDocumentLanguage, t } from '../i18n';
import { Language } from '../data/types';

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
        <div class="menu-background-slides" aria-hidden="true">
          <span class="menu-bg-slide menu-bg-mexica"></span>
          <span class="menu-bg-slide menu-bg-andes"></span>
          <span class="menu-bg-slide menu-bg-amazonia"></span>
        </div>
        <div class="ancestria-sky" aria-hidden="true"><span class="ancestria-sun"></span><span class="ancestria-stars"></span></div>
        <div class="ancestria-landscape" aria-hidden="true"><span></span><span></span><span></span></div>

        <div class="main-menu-card">
          <section class="menu-story-panel">
            <div class="ancestria-glyph" aria-hidden="true"><span>◆</span><span>✦</span><span>◆</span></div>
            <span class="hero-badge">${t('menu.badge')}</span>
            <h1 class="game-title">ANCESTRIA</h1>
            <p class="game-brand-subtitle">Stories. Peoples. Memories.</p>
            <p class="game-tagline">${t('menu.tagline')}</p>
            <div class="featured-journey">
              <span class="featured-kicker">${t('menu.featuredKicker')}</span>
              <strong>Mexica</strong>
              <p>${t('menu.featuredText')}</p>
            </div>
            <p class="menu-ethics-note">${t('menu.footer')}</p>
          </section>

          <section class="menu-action-panel">
            <div class="menu-language-switch" aria-label="Idioma">
              ${(['es', 'pt-BR', 'en'] as Language[]).map((language) => `<button class="language-chip ${state.settings.language === language ? 'active' : ''}" data-language="${language}">${language === 'es' ? 'ES' : language === 'pt-BR' ? 'PT' : 'EN'}</button>`).join('')}
            </div>
            <div class="menu-nav-buttons">
            <button class="btn-menu-primary" id="btn-play-game">
              <span class="btn-icon">✦</span><span>${hasSave ? t('menu.continue') : t('menu.start')}</span><span class="btn-arrow">→</span>
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
            <footer class="main-menu-footer"><span>${t('menu.prototype')}</span><span>${t('menu.educational3d')}</span></footer>
          </section>
        </div>
      </div>
    `;

    applyDocumentLanguage(state.settings.language);

    this.attachEvents();
  }

  private attachEvents(): void {
    this.container.querySelectorAll<HTMLButtonElement>('.language-chip').forEach((button) => {
      button.addEventListener('click', () => {
        const language = button.dataset.language as Language;
        GameState.getInstance().updateSettings({ language });
        applyDocumentLanguage(language);
        this.show();
      });
    });
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
