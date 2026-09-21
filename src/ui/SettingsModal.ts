import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { Language } from '../data/types';
import { applyDocumentLanguage, getLanguage, t } from '../i18n';

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
    const lang = getLanguage();

    const copy = lang === 'es'
      ? {
          badge: 'Preferencias',
          title: 'Configuración y accesibilidad',
          close: 'Cerrar',
          langHeader: 'Idioma y localización',
          langTitle: 'Idioma de la experiencia',
          langSub: 'El español es el idioma principal. Puedes alternar a portugués o inglés en cualquier momento.',
          accessHeader: 'Accesibilidad visual y motriz',
          reduceMotion: 'Reducir movimiento',
          reduceMotionSub: 'Minimiza animaciones de cámara, oscilación de pasos y transiciones dinámicas.',
          highContrast: 'Alto contraste',
          highContrastSub: 'Aumenta la visibilidad y nitidez de textos, botones y contornos.',
          fontSize: 'Tamaño del texto',
          fontSizeSub: 'Ajusta la escala tipográfica de descripciones, diálogos y el diario.',
          normal: 'Normal',
          large: 'Grande',
          xlarge: 'Muy grande',
          subtitles: 'Subtítulos y textos completos',
          subtitlesSub: 'Muestra todos los diálogos y avisos por escrito, permitiendo jugar sin audio.',
          audioHeader: 'Audio y ambientación sonora',
          sfx: 'Efectos de sonido (SFX)',
          sfxSub: 'Pasos, interacciones, campanas y avisos de progreso.',
          music: 'Música ambiental andina',
          musicSub: 'Melodías pentatónicas de flauta quena y sonidos naturales sintetizados.',
          storageHeader: 'Almacenamiento y privacidad',
          storageSub: 'Tu progreso se guarda de forma segura y privada directamente en tu navegador, sin enviar datos a servidores externos.',
          resetBtn: 'Reiniciar todo el progreso del juego',
          resetConfirm: '¿Estás seguro de que deseas reiniciar todo el progreso de ANCESTRIA? Se borrarán los fragmentos y descubrimientos guardados en este navegador.'
        }
      : lang === 'pt-BR'
      ? {
          badge: 'Preferências',
          title: 'Configurações e acessibilidade',
          close: 'Fechar',
          langHeader: 'Idioma e localização',
          langTitle: 'Idioma da experiência',
          langSub: 'O espanhol é o idioma principal. Você pode alternar para português ou inglês a qualquer momento.',
          accessHeader: 'Acessibilidade visual e motora',
          reduceMotion: 'Reduzir movimento',
          reduceMotionSub: 'Minimiza animações de câmera, oscilação de passos e rotações dinâmicas.',
          highContrast: 'Alto contraste',
          highContrastSub: 'Aumenta a nitidez visual de textos, botões e contornos de interface.',
          fontSize: 'Tamanho do texto',
          fontSizeSub: 'Ajusta a escala tipográfica das descrições, diálogos e diário.',
          normal: 'Normal',
          large: 'Grande',
          xlarge: 'Muito grande',
          subtitles: 'Legendas e diálogos escritos',
          subtitlesSub: 'Exibe todas as falas, descrições e avisos sem depender de áudio.',
          audioHeader: 'Áudio e ambientação sonora',
          sfx: 'Efeitos sonoros (SFX)',
          sfxSub: 'Passos, cliques, interações com objetos e fanfarras.',
          music: 'Música ambiente andina',
          musicSub: 'Melodias pentatônicas calmas de flauta quena e sons naturais sintetizados.',
          storageHeader: 'Armazenamento e privacidade',
          storageSub: 'Seu progresso é gravado de forma 100% segura e privada diretamente no seu navegador, sem envio de informações pessoais.',
          resetBtn: 'Reiniciar todo o progresso do jogo',
          resetConfirm: 'Tem certeza de que deseja reiniciar todo o progresso de ANCESTRIA? Os fragmentos e memórias salvos neste navegador serão limpos.'
        }
      : {
          badge: 'Preferences',
          title: 'Settings and accessibility',
          close: 'Close',
          langHeader: 'Language and localization',
          langTitle: 'Experience language',
          langSub: 'Spanish is the primary language. You can switch to Portuguese or English at any time.',
          accessHeader: 'Visual and motor accessibility',
          reduceMotion: 'Reduce motion',
          reduceMotionSub: 'Minimizes camera swings, walking bob, and dynamic camera rotations.',
          highContrast: 'High contrast',
          highContrastSub: 'Enhances visibility and contrast of text, buttons, and borders.',
          fontSize: 'Text size',
          fontSizeSub: 'Adjusts font scale across descriptions, dialogues, and the journal.',
          normal: 'Normal',
          large: 'Large',
          xlarge: 'Extra large',
          subtitles: 'Subtitles and full text',
          subtitlesSub: 'Presents all dialogue and alerts in text, enabling complete play without audio.',
          audioHeader: 'Audio and soundscape',
          sfx: 'Sound effects (SFX)',
          sfxSub: 'Footsteps, clicks, interactions, and progress fanfares.',
          music: 'Andean ambient soundtrack',
          musicSub: 'Procedural pentatonic quena flute melodies and natural wind soundscapes.',
          storageHeader: 'Local storage and privacy',
          storageSub: 'Progress is saved privately and securely on this device without transmitting personal data.',
          resetBtn: 'Reset all game progress',
          resetConfirm: 'Are you sure you want to reset all ANCESTRIA progress? All saved fragments and journal discoveries on this device will be cleared.'
        };

    this.container.innerHTML = `
      <div class="settings-modal-overlay">
        <div class="settings-window">
          <div class="settings-header">
            <div>
              <span class="badge">${copy.badge}</span>
              <h2>${copy.title}</h2>
            </div>
            <button class="btn-close" id="btn-close-settings" aria-label="${copy.close}">&times;</button>
          </div>

          <div class="settings-body">
            <section class="settings-section">
              <h3>${copy.langHeader}</h3>
              <div class="setting-row">
                <div class="setting-info">
                  <strong>${copy.langTitle}</strong>
                  <small>${copy.langSub}</small>
                </div>
                <select id="setting-language-select" class="select-input">
                  <option value="es" ${s.language === 'es' ? 'selected' : ''}>Español (Principal)</option>
                  <option value="pt-BR" ${s.language === 'pt-BR' ? 'selected' : ''}>Português</option>
                  <option value="en" ${s.language === 'en' ? 'selected' : ''}>English</option>
                </select>
              </div>
            </section>

            <section class="settings-section">
              <h3>${copy.accessHeader}</h3>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${copy.reduceMotion}</strong>
                  <small>${copy.reduceMotionSub}</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-reduce-motion" ${s.reduceMotion ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${copy.highContrast}</strong>
                  <small>${copy.highContrastSub}</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-high-contrast" ${s.highContrast ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${copy.fontSize}</strong>
                  <small>${copy.fontSizeSub}</small>
                </div>
                <select id="setting-font-size" class="select-input">
                  <option value="normal" ${s.fontSize === 'normal' ? 'selected' : ''}>${copy.normal}</option>
                  <option value="grande" ${s.fontSize === 'grande' ? 'selected' : ''}>${copy.large}</option>
                  <option value="muito_grande" ${s.fontSize === 'muito_grande' ? 'selected' : ''}>${copy.xlarge}</option>
                </select>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${copy.subtitles}</strong>
                  <small>${copy.subtitlesSub}</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-subtitles" ${s.subtitles ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>
            </section>

            <section class="settings-section">
              <h3>${copy.audioHeader}</h3>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${copy.sfx}</strong>
                  <small>${copy.sfxSub}</small>
                </div>
                <div class="range-wrapper">
                  <input type="range" id="setting-sfx-volume" min="0" max="1" step="0.05" value="${s.soundVolume}" />
                  <span id="sfx-volume-val">${Math.round(s.soundVolume * 100)}%</span>
                </div>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>${copy.music}</strong>
                  <small>${copy.musicSub}</small>
                </div>
                <div class="range-wrapper">
                  <input type="range" id="setting-music-volume" min="0" max="1" step="0.05" value="${s.musicVolume}" />
                  <span id="music-volume-val">${Math.round(s.musicVolume * 100)}%</span>
                </div>
              </div>
            </section>

            <section class="settings-section">
              <h3>${copy.storageHeader}</h3>
              <p class="setting-note">${copy.storageSub}</p>
              <button class="btn-danger" id="btn-reset-save">${copy.resetBtn}</button>
            </section>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(copy.resetConfirm);
  }

  private attachEvents(resetConfirmMsg: string): void {
    const state = GameState.getInstance();

    this.container.querySelector('#btn-close-settings')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
      this.onDismiss();
    });

    const langSelect = this.container.querySelector('#setting-language-select') as HTMLSelectElement;
    langSelect?.addEventListener('change', () => {
      const language = langSelect.value as Language;
      state.updateSettings({ language });
      applyDocumentLanguage(language);
      this.render();
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
      if (sfxVal) sfxVal.textContent = `${Math.round(val * 100)}%`;
      AudioManager.getInstance().updateVolumes();
    });

    const musicVol = this.container.querySelector('#setting-music-volume') as HTMLInputElement;
    const musicVal = this.container.querySelector('#music-volume-val');
    musicVol?.addEventListener('input', () => {
      const val = parseFloat(musicVol.value);
      state.updateSettings({ musicVolume: val });
      if (musicVal) musicVal.textContent = `${Math.round(val * 100)}%`;
      AudioManager.getInstance().updateVolumes();
    });

    this.container.querySelector('#btn-reset-save')?.addEventListener('click', () => {
      if (confirm(resetConfirmMsg)) {
        state.resetProgress();
        this.render();
      }
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
