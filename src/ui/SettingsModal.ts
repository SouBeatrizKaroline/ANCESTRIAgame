import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { applyDocumentLanguage, t } from '../i18n';
import { Language } from '../data/types';

export class SettingsModal {
  private container: HTMLElement;
  private onDismiss: () => void;

  constructor(container: HTMLElement, onDismiss: () => void = () => {}) {
    this.container = container;
    this.onDismiss = onDismiss;
  }

  public show(): void {
    AudioManager.getInstance().playClick();
    this.render();
  }

  private render(): void {
    const state = GameState.getInstance();
    const s = state.settings;

    this.container.innerHTML = `
      <div class="settings-modal-overlay">
        <div class="settings-window">
          <div class="settings-header">
            <div>
              <span class="badge">${t('settings.badge')}</span>
              <h2>${t('settings.title')}</h2>
            </div>
            <button class="btn-close" id="btn-close-settings" aria-label="${t('settings.close')}">&times;</button>
          </div>

          <div class="settings-body">
            <section class="settings-section">
              <h3>${t('settings.language')}</h3>
              <div class="setting-row">
                <div class="setting-info"><strong>${t('settings.language')}</strong><small>${t('settings.languageHelp')}</small></div>
                <select id="setting-language" class="select-input" aria-label="${t('settings.language')}">
                  <option value="es" ${s.language === 'es' ? 'selected' : ''}>Español</option>
                  <option value="pt-BR" ${s.language === 'pt-BR' ? 'selected' : ''}>Português</option>
                  <option value="en" ${s.language === 'en' ? 'selected' : ''}>English</option>
                </select>
              </div>
            </section>

            <section class="settings-section">
              <h3>${t('settings.accessibility')}</h3>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${t('settings.motion')}</strong>
                  <small>${t('settings.motionHelp')}</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-reduce-motion" ${s.reduceMotion ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${t('settings.contrast')}</strong>
                  <small>${t('settings.contrastHelp')}</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-high-contrast" ${s.highContrast ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${t('settings.textSize')}</strong>
                  <small>Ajusta la escala de las descripciones, los diálogos y el diario.</small>
                </div>
                <select id="setting-font-size" class="select-input">
                  <option value="normal" ${s.fontSize === 'normal' ? 'selected' : ''}>${t('size.normal')}</option>
                  <option value="grande" ${s.fontSize === 'grande' ? 'selected' : ''}>${t('size.large')}</option>
                  <option value="muito_grande" ${s.fontSize === 'muito_grande' ? 'selected' : ''}>${t('size.xlarge')}</option>
                </select>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${t('settings.subtitles')}</strong>
                  <small>Muestra diálogos, descripciones y avisos sin depender del audio.</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-subtitles" ${s.subtitles ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>
            </section>

            <!-- Áudio e Som -->
            <section class="settings-section">
              <h3>${t('settings.audio')}</h3>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${t('settings.sfx')} (SFX)</strong>
                  <small>Pasos, clics, interacciones con objetos y celebraciones.</small>
                </div>
                <div class="range-wrapper">
                  <input type="range" id="setting-sfx-volume" min="0" max="1" step="0.05" value="${s.soundVolume}" />
                  <span id="sfx-volume-val">${Math.round(s.soundVolume * 100)}%</span>
                </div>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${t('settings.music')}</strong>
                  <small>Melodías pentatónicas suaves de quena y sonidos naturales.</small>
                </div>
                <div class="range-wrapper">
                  <input type="range" id="setting-music-volume" min="0" max="1" step="0.05" value="${s.musicVolume}" />
                  <span id="music-volume-val">${Math.round(s.musicVolume * 100)}%</span>
                </div>
              </div>
            </section>

            <!-- Gerenciamento de Dados -->
            <section class="settings-section">
              <h3>${t('settings.storage')}</h3>
              <p class="setting-note">${t('settings.storageHelp')}</p>
              <button class="btn-danger" id="btn-reset-save">${t('settings.reset')}</button>
            </section>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const state = GameState.getInstance();

    const language = this.container.querySelector('#setting-language') as HTMLSelectElement;
    language?.addEventListener('change', () => {
      state.updateSettings({ language: language.value as Language });
      applyDocumentLanguage(language.value as Language);
      this.render();
    });

    this.container.querySelector('#btn-close-settings')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
      this.onDismiss();
    });

    const reduceMotion = this.container.querySelector('#setting-reduce-motion') as HTMLInputElement;
    reduceMotion?.addEventListener('change', () => {
      state.updateSettings({ reduceMotion: reduceMotion.checked });
    });

    const highContrast = this.container.querySelector('#setting-high-contrast') as HTMLInputElement;
    highContrast?.addEventListener('change', () => {
      state.updateSettings({ highContrast: highContrast.checked });
      document.body.classList.toggle('high-contrast-mode', highContrast.checked);
    });

    const fontSize = this.container.querySelector('#setting-font-size') as HTMLSelectElement;
    fontSize?.addEventListener('change', () => {
      state.updateSettings({ fontSize: fontSize.value as any });
      document.body.setAttribute('data-font-size', fontSize.value);
    });

    const subtitles = this.container.querySelector('#setting-subtitles') as HTMLInputElement;
    subtitles?.addEventListener('change', () => {
      state.updateSettings({ subtitles: subtitles.checked });
    });

    const sfxVol = this.container.querySelector('#setting-sfx-volume') as HTMLInputElement;
    const sfxVal = this.container.querySelector('#sfx-volume-val');
    sfxVol?.addEventListener('input', () => {
      const val = parseFloat(sfxVol.value);
      state.updateSettings({ soundVolume: val });
      AudioManager.getInstance().updateVolumes();
      if (sfxVal) sfxVal.textContent = `${Math.round(val * 100)}%`;
    });

    const musVol = this.container.querySelector('#setting-music-volume') as HTMLInputElement;
    const musVal = this.container.querySelector('#music-volume-val');
    musVol?.addEventListener('input', () => {
      const val = parseFloat(musVol.value);
      state.updateSettings({ musicVolume: val });
      AudioManager.getInstance().updateVolumes();
      if (musVal) musVal.textContent = `${Math.round(val * 100)}%`;
    });

    const resetBtn = this.container.querySelector('#btn-reset-save');
    resetBtn?.addEventListener('click', () => {
      if (confirm(t('settings.confirmReset'))) {
        state.resetProgress();
        alert(t('settings.resetDone'));
        this.close();
        window.location.reload();
      }
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
