import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';

export class SettingsModal {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
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
              <span class="badge">Preferências</span>
              <h2>Configurações & Acessibilidade</h2>
            </div>
            <button class="btn-close" id="btn-close-settings" aria-label="Fechar">&times;</button>
          </div>

          <div class="settings-body">
            <!-- Acessibilidade Visual e Motora -->
            <section class="settings-section">
              <h3>Acessibilidade e Visual</h3>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>Reduzir Movimento</strong>
                  <small>Minimiza animações de câmera, oscilação de passos e rotações dinâmicas.</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-reduce-motion" ${s.reduceMotion ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>Alto Contraste</strong>
                  <small>Aumenta a nitidez visual dos textos, botões e contornos de interface.</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-high-contrast" ${s.highContrast ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>Tamanho do Texto</strong>
                  <small>Ajusta a escala tipográfica das descrições, diálogos e diário.</small>
                </div>
                <select id="setting-font-size" class="select-input">
                  <option value="normal" ${s.fontSize === 'normal' ? 'selected' : ''}>Normal</option>
                  <option value="grande" ${s.fontSize === 'grande' ? 'selected' : ''}>Grande</option>
                  <option value="muito_grande" ${s.fontSize === 'muito_grande' ? 'selected' : ''}>Muito Grande</option>
                </select>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>Legendas e Diálogos Escritos</strong>
                  <small>Exibe todas as falas, descrições e avisos sem depender de áudio.</small>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="setting-subtitles" ${s.subtitles ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>
            </section>

            <!-- Áudio e Som -->
            <section class="settings-section">
              <h3>Áudio e Trilha Sonora</h3>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>Efeitos Sonoros (SFX)</strong>
                  <small>Passos, cliques, interações com objetos e fanfarras.</small>
                </div>
                <div class="range-wrapper">
                  <input type="range" id="setting-sfx-volume" min="0" max="1" step="0.05" value="${s.soundVolume}" />
                  <span id="sfx-volume-val">${Math.round(s.soundVolume * 100)}%</span>
                </div>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <strong>Música Ambiente Andina</strong>
                  <small>Melodias pentatônicas calmas de flauta quena e sons naturais.</small>
                </div>
                <div class="range-wrapper">
                  <input type="range" id="setting-music-volume" min="0" max="1" step="0.05" value="${s.musicVolume}" />
                  <span id="music-volume-val">${Math.round(s.musicVolume * 100)}%</span>
                </div>
              </div>
            </section>

            <!-- Gerenciamento de Dados -->
            <section class="settings-section">
              <h3>Armazenamento e Dados Locais</h3>
              <p class="setting-note">Seu progresso é gravado de forma 100% segura e privada diretamente no seu navegador, sem envio de informações pessoais para a nuvem.</p>
              <button class="btn-danger" id="btn-reset-save">Reiniciar Todo o Progresso do Jogo</button>
            </section>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const state = GameState.getInstance();

    this.container.querySelector('#btn-close-settings')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
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
      if (confirm('Tem certeza de que deseja apagar o progresso e reiniciar as descobertas?')) {
        state.resetProgress();
        alert('Progresso reiniciado com sucesso.');
        this.close();
        window.location.reload();
      }
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
