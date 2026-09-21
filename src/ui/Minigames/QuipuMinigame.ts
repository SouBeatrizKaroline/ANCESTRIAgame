import { GameState } from '../../state/GameState';
import { AudioManager } from '../../engine/AudioManager';

export class QuipuMinigame {
  private container: HTMLElement;
  private onCompleteCallback: () => void;

  // Desafio: Contabilizar 342 sacas de milho no cordão do quipu
  // O quipu utiliza sistema posicional decimal:
  // - Nível Superior: Centenas
  // - Nível Médio: Dezenas
  // - Nível Inferior: Unidades
  private targetHundreds = 3;
  private targetTens = 4;
  private targetUnits = 2;

  private currentHundreds = 1;
  private currentTens = 2;
  private currentUnits = 0;

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
              <span class="badge">Registro y contabilidad andina</span>
              <h2>El desafío del quipu</h2>
            </div>
            <button class="btn-close" id="btn-close-quipu" aria-label="Cerrar">&times;</button>
          </div>

          <div class="minigame-intro">
            <p><strong>Desafío de Tupaq:</strong> Registra <strong>342 unidades de maíz</strong> en el cordón amarillo. La posición de cada nudo representa un valor decimal.</p>
          </div>

          <div class="quipu-workspace">
            <div class="quipu-main-cord">
              <div class="quipu-top-beam">Cordón principal</div>
              <div class="quipu-hanging-strand strand-yellow">
                <!-- Centenas -->
                <div class="knot-zone" data-pos="hundreds">
                  <div class="zone-label">Centenas (x100)</div>
                  <div class="knots-display" id="knots-hundreds"></div>
                  <div class="knot-controls">
                    <button class="btn-knot-adjust" data-action="dec" data-target="hundreds">-</button>
                    <span class="knot-counter" id="count-hundreds">1</span>
                    <button class="btn-knot-adjust" data-action="inc" data-target="hundreds">+</button>
                  </div>
                </div>

                <!-- Dezenas -->
                <div class="knot-zone" data-pos="tens">
                  <div class="zone-label">Decenas (x10)</div>
                  <div class="knots-display" id="knots-tens"></div>
                  <div class="knot-controls">
                    <button class="btn-knot-adjust" data-action="dec" data-target="tens">-</button>
                    <span class="knot-counter" id="count-tens">2</span>
                    <button class="btn-knot-adjust" data-action="inc" data-target="tens">+</button>
                  </div>
                </div>

                <!-- Unidades -->
                <div class="knot-zone" data-pos="units">
                  <div class="zone-label">Unidades (x1)</div>
                  <div class="knots-display" id="knots-units"></div>
                  <div class="knot-controls">
                    <button class="btn-knot-adjust" data-action="dec" data-target="units">-</button>
                    <span class="knot-counter" id="count-units">0</span>
                    <button class="btn-knot-adjust" data-action="inc" data-target="units">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="quipu-summary-panel">
              <h4>Valor registrado en el cordón</h4>
              <div class="calculated-value" id="current-total-val">120</div>
              <p class="target-hint">Meta: <strong>342 unidades</strong></p>
              <div class="academic-note">
                <small><strong>Nota histórica:</strong> Los quipus podían usar la ausencia de nudos para representar el cero; colores y estructuras ayudaban a categorizar información (Gary Urton, 2003).</small>
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="quipu-feedback"></div>
            <button class="btn-primary" id="btn-check-quipu">Validar registro</button>
          </div>
        </div>
      </div>
    `;

    this.updateDisplay();
    this.attachEvents();
  }

  private attachEvents(): void {
    const closeBtn = this.container.querySelector('#btn-close-quipu');
    closeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
    });

    const adjustBtns = this.container.querySelectorAll('.btn-knot-adjust');
    adjustBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        AudioManager.getInstance().playInteract();
        const action = btn.getAttribute('data-action');
        const target = btn.getAttribute('data-target');

        if (target === 'hundreds') {
          if (action === 'inc' && this.currentHundreds < 9) this.currentHundreds++;
          if (action === 'dec' && this.currentHundreds > 0) this.currentHundreds--;
        } else if (target === 'tens') {
          if (action === 'inc' && this.currentTens < 9) this.currentTens++;
          if (action === 'dec' && this.currentTens > 0) this.currentTens--;
        } else if (target === 'units') {
          if (action === 'inc' && this.currentUnits < 9) this.currentUnits++;
          if (action === 'dec' && this.currentUnits > 0) this.currentUnits--;
        }

        this.updateDisplay();
      });
    });

    const checkBtn = this.container.querySelector('#btn-check-quipu');
    checkBtn?.addEventListener('click', () => {
      this.verifySolution();
    });
  }

  private updateDisplay(): void {
    const countH = this.container.querySelector('#count-hundreds');
    const countT = this.container.querySelector('#count-tens');
    const countU = this.container.querySelector('#count-units');

    if (countH) countH.textContent = String(this.currentHundreds);
    if (countT) countT.textContent = String(this.currentTens);
    if (countU) countU.textContent = String(this.currentUnits);

    // Nós visuais
    this.renderKnots('#knots-hundreds', this.currentHundreds, 'knot-hundred');
    this.renderKnots('#knots-tens', this.currentTens, 'knot-ten');
    this.renderKnots('#knots-units', this.currentUnits, 'knot-unit');

    const total = this.currentHundreds * 100 + this.currentTens * 10 + this.currentUnits;
    const totalEl = this.container.querySelector('#current-total-val');
    if (totalEl) totalEl.textContent = `${total} sacas`;
  }

  private renderKnots(selector: string, count: number, knotClass: string): void {
    const el = this.container.querySelector(selector);
    if (!el) return;
    if (count === 0) {
      el.innerHTML = '<span class="zero-space">(espacio sin nudos: cero)</span>';
      return;
    }
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `<span class="visual-knot ${knotClass}">●</span>`;
    }
    el.innerHTML = html;
  }

  private verifySolution(): void {
    if (
      this.currentHundreds === this.targetHundreds &&
      this.currentTens === this.targetTens &&
      this.currentUnits === this.targetUnits
    ) {
      AudioManager.getInstance().playMissionComplete();
      const state = GameState.getInstance();
      state.completeMissionStep('mission_main_andes', 'step_solve_quipu');
      state.unlockDiscovery('disc_quipu');
      state.addKnowledgeFragments(30);

      this.setFeedback(
        '¡Correcto! El cordón registra 3 centenas, 4 decenas y 2 unidades.',
        'success'
      );

      const checkBtn = this.container.querySelector('#btn-check-quipu') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = '¡Registro validado! (+30 fragmentos)';
        checkBtn.disabled = true;
      }

      setTimeout(() => {
        this.close();
        this.onCompleteCallback();
      }, 2500);
    } else {
      AudioManager.getInstance().playClick();
      const current = this.currentHundreds * 100 + this.currentTens * 10 + this.currentUnits;
      this.setFeedback(
        `El cordón registra ${current}. Necesitamos 342: 3 centenas, 4 decenas y 2 unidades. Ajusta los nudos e inténtalo otra vez.`,
        'error'
      );
    }
  }

  private setFeedback(text: string, type: 'info' | 'success' | 'error'): void {
    const el = this.container.querySelector('#quipu-feedback');
    if (el) {
      el.textContent = text;
      el.className = `feedback-msg ${type}`;
    }
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
