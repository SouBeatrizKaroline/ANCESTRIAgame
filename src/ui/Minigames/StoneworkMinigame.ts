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
              <span class="badge">Arquitetura e Engenharia Sísmica</span>
              <h2>O Encaixe da Pedra de Doze Ângulos</h2>
            </div>
            <button class="btn-close" id="btn-close-stonework" aria-label="Fechar">&times;</button>
          </div>

          <div class="minigame-intro">
            <p><strong>Desafio de Wayra:</strong> "Os edifícios incas resistem a terremotos porque as pedras poligonais se abraçam perfeitamente a seco, sem argamassa. Gire e faça o assentamento abrasivo para encaixar o bloco central na muralha!"</p>
          </div>

          <div class="stonework-workspace">
            <div class="stone-puzzle-board">
              <!-- Muralha de apoio em torno -->
              <div class="wall-frame">
                <div class="wall-rock rock-top">Blocos Superiores de Andesita</div>
                <div class="wall-rock rock-left">Bloco Lateral</div>
                
                <!-- Encaixe central onde a pedra deve assentar -->
                <div class="socket-zone">
                  <div class="twelve-angle-stone" id="target-stone" style="transform: rotate(${this.currentAngle}deg);">
                    <div class="stone-face">
                      <span class="stone-label">Pedra de 12 Ângulos</span>
                      <div class="stone-bevel"></div>
                    </div>
                  </div>
                </div>

                <div class="wall-rock rock-right">Bloco Lateral</div>
                <div class="wall-rock rock-bottom">Base Sísmica Almofadada</div>
              </div>
            </div>

            <div class="stonework-tools-panel">
              <h4>Ajustes de Cantaria</h4>
              <div class="tool-section">
                <label>Girar Bloco de Pedra:</label>
                <div class="rotation-controls">
                  <button class="btn-tool" id="btn-rot-left">↺ Girar -30°</button>
                  <button class="btn-tool" id="btn-rot-right">↻ Girar +30°</button>
                </div>
              </div>

              <div class="tool-section">
                <label>Polimento com Areia Úmida e Hematita:</label>
                <button class="btn-tool btn-abrade" id="btn-abrade-stone">
                  <span>🔨 Polir Juntas de Atrito</span>
                  <span class="abrade-progress" id="abrade-progress-label">Nível: 0 / 3</span>
                </button>
              </div>

              <div class="academic-note">
                <small><strong>Nota Técnica:</strong> Experimentos de Jean-Pierre Protzen (1993) comprovaram que operários andinos talhavam os blocos por percussão direta com martelos líticos, criando encaixes côncavo-convexos tão justos que uma lâmina de barbear não penetra entre as pedras.</small>
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="stonework-feedback"></div>
            <button class="btn-primary" id="btn-check-stonework">Testar Estabilidade Sísmica</button>
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
        if (label) label.textContent = `Nível: ${this.smoothingStep} / 3 (Polido)`;
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
        'Sensacional! O bloco de doze ângulos assentou-se com precisão milimétrica. A muralha agora é capaz de absorver qualquer onda sísmica com total segurança!',
        'success'
      );

      const checkBtn = this.container.querySelector('#btn-check-stonework') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = 'Encaixe Sísmico Perfeito! (+30 Fragmentos)';
        checkBtn.disabled = true;
      }

      setTimeout(() => {
        this.close();
        this.onCompleteCallback();
      }, 2500);
    } else if (!isAngleCorrect) {
      AudioManager.getInstance().playClick();
      this.setFeedback(
        'O ângulo da pedra ainda não coincide com as facetas dos blocos vizinhos. Gire a pedra até que seus doze vértices fiquem nivelados com o soquete da muralha.',
        'error'
      );
    } else {
      AudioManager.getInstance().playClick();
      this.setFeedback(
        'A orientação está quase certa, mas as juntas ainda estão ásperas. Use o polimento abrasivo com areia úmida (Nível 3/3) para garantir o contato contínuo!',
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
