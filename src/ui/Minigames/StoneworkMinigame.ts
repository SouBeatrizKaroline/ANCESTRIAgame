import { GameState } from '../../state/GameState';
import { AudioManager } from '../../engine/AudioManager';

export class StoneworkMinigame {
  private container: HTMLElement;
  private onCompleteCallback: () => void;

  // Minigame de Cantaria Inca: Encaixar a Pedra de Doze Ângulos
  // Rotação necessária e ajuste de atrito com areia abrasiva
  private currentAngle: number = 90; // graus
  private targetAngle: number = 0; // 0 graus é o encaixe perfeito
  private smoothingStep: number = 0; // 0 a 3 passos de polimento com areia

  constructor(container: HTMLElement, onComplete: () => void) {
    this.container = container;
    this.onCompleteCallback = onComplete;
  }

  public render(): void {
    this.container.innerHTML = `
      <div class="minigame-modal-overlay">
        <div class="minigame-modal-content">
          <div class="minigame-header">
            <div>
              <span class="badge">Arquitectura e ingeniería sísmica</span>
              <h2>El ajuste de la piedra poligonal</h2>
            </div>
            <button class="btn-close" id="btn-close-stonework" aria-label="Cerrar">&times;</button>
          </div>

          <div class="minigame-intro">
            <p><strong>Desafío de Wayra:</strong> Gira la pieza y usa el pulido abrasivo para aproximarla al espacio central del muro.</p>
          </div>

          <div class="stonework-workspace">
            <div class="stone-puzzle-board">
              <!-- Muralha de apoio em torno -->
              <div class="wall-frame">
                <div class="wall-rock rock-top">Bloques superiores</div>
                <div class="wall-rock rock-left">Bloque lateral</div>
                
                <!-- Encaixe central onde a pedra deve assentar -->
                <div class="socket-zone">
                  <div class="twelve-angle-stone" id="target-stone" style="transform: rotate(${this.currentAngle}deg);">
                    <div class="stone-face">
                      <span class="stone-label">Piedra poligonal</span>
                      <div class="stone-bevel"></div>
                    </div>
                  </div>
                </div>

                <div class="wall-rock rock-right">Bloque lateral</div>
                <div class="wall-rock rock-bottom">Base sismorresistente</div>
              </div>
            </div>

            <div class="stonework-tools-panel">
              <h4>Ajustes de cantería</h4>
              <div class="tool-section">
                <label>Girar el bloque:</label>
                <div class="rotation-controls">
                  <button class="btn-tool" id="btn-rot-left">↺ Girar -30°</button>
                  <button class="btn-tool" id="btn-rot-right">↻ Girar +30°</button>
                </div>
              </div>

              <div class="tool-section">
                <label>Pulido abrasivo:</label>
                <button class="btn-tool btn-abrade" id="btn-abrade-stone">
                  <span>🔨 Pulir las juntas</span>
                  <span class="abrade-progress" id="abrade-progress-label">Nivel: 0 / 3</span>
                </button>
              </div>

              <div class="academic-note">
                <small><strong>Nota técnica:</strong> La arqueología experimental estudia el tallado por percusión con herramientas líticas y el pulido de las superficies de contacto (Jean-Pierre Protzen, 1993).</small>
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="stonework-feedback"></div>
            <button class="btn-primary" id="btn-check-stonework">Comprobar el ajuste</button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const closeBtn = this.container.querySelector('#btn-close-stonework');
    closeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
    });

    const rotLeft = this.container.querySelector('#btn-rot-left');
    rotLeft?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.currentAngle = (this.currentAngle - 30 + 360) % 360;
      this.updateStoneVisual();
    });

    const rotRight = this.container.querySelector('#btn-rot-right');
    rotRight?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.currentAngle = (this.currentAngle + 30) % 360;
      this.updateStoneVisual();
    });

    const abradeBtn = this.container.querySelector('#btn-abrade-stone');
    abradeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playInteract();
      if (this.smoothingStep < 3) {
        this.smoothingStep++;
        const label = this.container.querySelector('#abrade-progress-label');
        if (label) label.textContent = `Nivel: ${this.smoothingStep} / 3 (pulido)`;
        this.updateStoneVisual();
      }
    });

    const checkBtn = this.container.querySelector('#btn-check-stonework');
    checkBtn?.addEventListener('click', () => {
      this.verifySolution();
    });
  }

  private updateStoneVisual(): void {
    const stone = this.container.querySelector('#target-stone') as HTMLElement;
    if (stone) {
      stone.style.transform = `rotate(${this.currentAngle}deg)`;
      if (this.smoothingStep === 3) {
        stone.classList.add('perfectly-polished');
      }
    }
  }

  private verifySolution(): void {
    const isAngleCorrect = this.currentAngle === 0 || this.currentAngle === 360;
    const isPolished = this.smoothingStep >= 3;

    if (isAngleCorrect && isPolished) {
      AudioManager.getInstance().playMissionComplete();
      const state = GameState.getInstance();
      state.completeMissionStep('mission_main_andes', 'step_solve_stonework');
      state.unlockDiscovery('disc_cantaria');
      state.addKnowledgeFragments(30);

      this.setFeedback(
        '¡Muy bien! La pieza quedó orientada y pulida para ajustarse al muro.',
        'success'
      );

      const checkBtn = this.container.querySelector('#btn-check-stonework') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = '¡Ajuste completado! (+30 fragmentos)';
        checkBtn.disabled = true;
      }

      setTimeout(() => {
        this.close();
        this.onCompleteCallback();
      }, 2500);
    } else if (!isAngleCorrect) {
      AudioManager.getInstance().playClick();
      this.setFeedback(
        'El ángulo de la piedra todavía no coincide con el espacio. Gírala hasta alinear sus caras.',
        'error'
      );
    } else {
      AudioManager.getInstance().playClick();
      this.setFeedback(
        'La orientación es correcta, pero todavía falta pulir las juntas hasta el nivel 3/3.',
        'error'
      );
    }
  }

  private setFeedback(text: string, type: 'info' | 'success' | 'error'): void {
    const el = this.container.querySelector('#stonework-feedback');
    if (el) {
      el.textContent = text;
      el.className = `feedback-msg ${type}`;
    }
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
