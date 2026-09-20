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
              <span class="badge">Registro e Contabilidade Andina</span>
              <h2>O Enigma do Quipu Imperial</h2>
            </div>
            <button class="btn-close" id="btn-close-quipu" aria-label="Fechar">&times;</button>
          </div>

          <div class="minigame-intro">
            <p><strong>Desafio de Tupaq:</strong> "Chegaram novas provisões de milho aos armazéns Qullqa! Precisamos registrar exatamente <strong>342 sacas de milho</strong> no cordão amarelo. Cada nó representa um algarismo de base 10 de acordo com sua altura!"</p>
          </div>

          <div class="quipu-workspace">
            <div class="quipu-main-cord">
              <div class="quipu-top-beam">Cordão Mestre Principal</div>
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
                  <div class="zone-label">Dezenas (x10)</div>
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
              <h4>Valor Registrado no Cordão</h4>
              <div class="calculated-value" id="current-total-val">120</div>
              <p class="target-hint">Meta a registrar: <strong>342 sacas</strong></p>
              <div class="academic-note">
                <small><strong>Nota Histórica:</strong> Os quipus usavam a ausência de nós para representar o zero e cores específicas (amarelo = milho, marrom = batata, branco = prata/lã) para categorizar os bens (Gary Urton, 2003).</small>
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="quipu-feedback"></div>
            <button class="btn-primary" id="btn-check-quipu">Validar Registro no Quipu</button>
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
      el.innerHTML = '<span class="zero-space">(espaço liso: zero)</span>';
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
        'Perfeito! O quipu foi atado com 3 centenas, 4 dezenas e 2 unidades no cordão amarelo do milho. O Quipucamayoc Tupaq arquivou o registro com sucesso!',
        'success'
      );

      const checkBtn = this.container.querySelector('#btn-check-quipu') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = 'Registro Validado! (+30 Fragmentos)';
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
        `O cordão registra ${current} sacas. Precisamos de exatamente 342 (3 nós de centenas, 4 nós de dezenas e 2 nós de unidades). Ajuste os nós e tente novamente!`,
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
