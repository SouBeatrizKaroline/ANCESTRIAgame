import { GameState } from '../../state/GameState';
import { AudioManager } from '../../engine/AudioManager';
import { getLanguage } from '../../i18n';

export class QuipuMinigame {
  private container: HTMLElement;
  private onCompleteCallback: () => void;

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
    const lang = getLanguage();

    const copy = lang === 'es'
      ? {
          badge: 'Registro y contabilidad andina',
          title: 'El enigma del khipu de provisiones',
          close: 'Cerrar',
          intro: '<strong>Desafío de Tupaq:</strong> "¡Llegaron nuevas provisiones de maíz a los almacenes qullqa! Debemos registrar exactamente <strong>342 sacos de maíz</strong> en el cordón amarillo. ¡Cada nudo representa un dígito en base 10 según su altura!"',
          mainBeam: 'Cordón principal del khipu',
          hundredsLabel: 'Centenas (x100)',
          tensLabel: 'Decenas (x10)',
          unitsLabel: 'Unidades (x1)',
          recordedTitle: 'Valor registrado en el cordón',
          unitWord: 'sacos',
          targetLabel: 'Meta a registrar: <strong>342 sacos</strong>',
          histNote: '<strong>Nota histórica:</strong> Los khipus utilizaban la ausencia de nudos para representar el cero y colores específicos (amarillo = maíz, pardo = papa, blanco = lana) para categorizar bienes (Gary Urton, 2003).',
          btnValidate: 'Validar registro en el khipu',
          zeroSpace: '(espacio liso: cero)',
          success: '¡Excelente! El khipu fue anudado con 3 centenas, 4 decenas y 2 unidades en el cordón amarillo del maíz. ¡El quipucamayoc Tupaq archivó el registro con éxito!',
          btnSuccess: '¡Registro validado! (+30 fragmentos)',
          error: (curr: number) => `El cordón registra ${curr} sacos. Necesitamos exactamente 342 (3 nudos de centenas, 4 de decenas y 2 de unidades). ¡Ajusta los nudos y vuelve a intentar!`
        }
      : lang === 'pt-BR'
      ? {
          badge: 'Registro e contabilidade andina',
          title: 'O enigma do quipu imperial',
          close: 'Fechar',
          intro: '<strong>Desafio de Tupaq:</strong> "Chegaram novas provisões de milho aos armazéns qullqa! Precisamos registrar exatamente <strong>342 sacas de milho</strong> no cordão amarelo. Cada nó representa um algarismo de base 10!"',
          mainBeam: 'Cordão mestre principal',
          hundredsLabel: 'Centenas (x100)',
          tensLabel: 'Dezenas (x10)',
          unitsLabel: 'Unidades (x1)',
          recordedTitle: 'Valor registrado no cordão',
          unitWord: 'sacas',
          targetLabel: 'Meta a registrar: <strong>342 sacas</strong>',
          histNote: '<strong>Nota histórica:</strong> Os quipus usavam a ausência de nós para representar o zero e cores específicas para categorizar os bens (Gary Urton, 2003).',
          btnValidate: 'Validar registro no quipu',
          zeroSpace: '(espaço liso: zero)',
          success: 'Perfeito! O quipu foi atado com 3 centenas, 4 dezenas e 2 unidades no cordão amarelo do milho. O Quipucamayoc Tupaq arquivou o registro com sucesso!',
          btnSuccess: 'Registro validado! (+30 fragmentos)',
          error: (curr: number) => `O cordão registra ${curr} sacas. Precisamos de exatamente 342 (3 nós de centenas, 4 nós de dezenas e 2 nós de unidades). Ajuste os nós e tente novamente!`
        }
      : {
          badge: 'Andean numeracy and records',
          title: 'The enigma of the supply khipu',
          close: 'Close',
          intro: '<strong>Tupaq’s Challenge:</strong> "Fresh stores of maize arrived at the qullqa storehouses! We must record exactly <strong>342 bags of maize</strong> on the yellow cord. Each knot represents a base-10 digit according to its tier!"',
          mainBeam: 'Main primary khipu cord',
          hundredsLabel: 'Hundreds (x100)',
          tensLabel: 'Tens (x10)',
          unitsLabel: 'Units (x1)',
          recordedTitle: 'Value recorded on cord',
          unitWord: 'bags',
          targetLabel: 'Target to record: <strong>342 bags</strong>',
          histNote: '<strong>Historical note:</strong> Khipus used the absence of knots to denote zero and specific fiber colors to categorize items (Gary Urton, 2003).',
          btnValidate: 'Validate khipu record',
          zeroSpace: '(empty space: zero)',
          success: 'Perfect! The khipu is knotted with 3 hundreds, 4 tens, and 2 units on the yellow maize cord. Khipukamayuq Tupaq has archived the count!',
          btnSuccess: 'Record validated! (+30 fragments)',
          error: (curr: number) => `The cord currently records ${curr} bags. We need exactly 342 (3 hundred-knots, 4 ten-knots, 2 unit-knots). Adjust knots and retry!`
        };

    this.container.innerHTML = `
      <div class="minigame-modal-overlay">
        <div class="minigame-modal-content">
          <div class="minigame-header">
            <div>
              <span class="badge">${copy.badge}</span>
              <h2>${copy.title}</h2>
            </div>
            <button class="btn-close" id="btn-close-quipu" aria-label="${copy.close}">&times;</button>
          </div>

          <div class="minigame-intro">
            <p>${copy.intro}</p>
          </div>

          <div class="quipu-workspace">
            <div class="quipu-main-cord">
              <div class="quipu-top-beam">${copy.mainBeam}</div>
              <div class="quipu-hanging-strand strand-yellow">
                <div class="knot-zone" data-pos="hundreds">
                  <div class="zone-label">${copy.hundredsLabel}</div>
                  <div class="knots-display" id="knots-hundreds"></div>
                  <div class="knot-controls">
                    <button class="btn-knot-adjust" data-action="dec" data-target="hundreds">-</button>
                    <span class="knot-counter" id="count-hundreds">1</span>
                    <button class="btn-knot-adjust" data-action="inc" data-target="hundreds">+</button>
                  </div>
                </div>

                <div class="knot-zone" data-pos="tens">
                  <div class="zone-label">${copy.tensLabel}</div>
                  <div class="knots-display" id="knots-tens"></div>
                  <div class="knot-controls">
                    <button class="btn-knot-adjust" data-action="dec" data-target="tens">-</button>
                    <span class="knot-counter" id="count-tens">2</span>
                    <button class="btn-knot-adjust" data-action="inc" data-target="tens">+</button>
                  </div>
                </div>

                <div class="knot-zone" data-pos="units">
                  <div class="zone-label">${copy.unitsLabel}</div>
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
              <h4>${copy.recordedTitle}</h4>
              <div class="calculated-value" id="current-total-val">120 ${copy.unitWord}</div>
              <p class="target-hint">${copy.targetLabel}</p>
              <div class="academic-note">
                <small>${copy.histNote}</small>
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="quipu-feedback"></div>
            <button class="btn-primary" id="btn-check-quipu">${copy.btnValidate}</button>
          </div>
        </div>
      </div>
    `;

    this.updateDisplay(copy);
    this.attachEvents(copy);
  }

  private attachEvents(copy: any): void {
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

        this.updateDisplay(copy);
      });
    });

    const checkBtn = this.container.querySelector('#btn-check-quipu');
    checkBtn?.addEventListener('click', () => {
      this.verifySolution(copy);
    });
  }

  private updateDisplay(copy: any): void {
    const countH = this.container.querySelector('#count-hundreds');
    const countT = this.container.querySelector('#count-tens');
    const countU = this.container.querySelector('#count-units');

    if (countH) countH.textContent = String(this.currentHundreds);
    if (countT) countT.textContent = String(this.currentTens);
    if (countU) countU.textContent = String(this.currentUnits);

    this.renderKnots('#knots-hundreds', this.currentHundreds, 'knot-hundred', copy.zeroSpace);
    this.renderKnots('#knots-tens', this.currentTens, 'knot-ten', copy.zeroSpace);
    this.renderKnots('#knots-units', this.currentUnits, 'knot-unit', copy.zeroSpace);

    const total = this.currentHundreds * 100 + this.currentTens * 10 + this.currentUnits;
    const totalEl = this.container.querySelector('#current-total-val');
    if (totalEl) totalEl.textContent = `${total} ${copy.unitWord}`;
  }

  private renderKnots(selector: string, count: number, knotClass: string, zeroSpace: string): void {
    const el = this.container.querySelector(selector);
    if (!el) return;
    if (count === 0) {
      el.innerHTML = `<span class="zero-space">${zeroSpace}</span>`;
      return;
    }
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `<span class="visual-knot ${knotClass}">●</span>`;
    }
    el.innerHTML = html;
  }

  private verifySolution(copy: any): void {
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

      this.setFeedback(copy.success, 'success');

      const checkBtn = this.container.querySelector('#btn-check-quipu') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = copy.btnSuccess;
        checkBtn.disabled = true;
      }

      setTimeout(() => {
        this.close();
        this.onCompleteCallback();
      }, 2500);
    } else {
      AudioManager.getInstance().playClick();
      const current = this.currentHundreds * 100 + this.currentTens * 10 + this.currentUnits;
      this.setFeedback(copy.error(current), 'error');
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
