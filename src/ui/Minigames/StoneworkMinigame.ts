import { GameState } from '../../state/GameState';
import { AudioManager } from '../../engine/AudioManager';
import { getLanguage } from '../../i18n';

export class StoneworkMinigame {
  private container: HTMLElement;
  private onCompleteCallback: () => void;

  private currentAngle: number = 90;
  private targetAngle: number = 0;
  private smoothingStep: number = 0;

  constructor(container: HTMLElement, onComplete: () => void) {
    this.container = container;
    this.onCompleteCallback = onComplete;
  }

  public render(): void {
    const lang = getLanguage();

    const copy = lang === 'es'
      ? {
          badge: 'Arquitectura e ingeniería sísmica',
          title: 'El ajuste de la Piedra de los Doce Ángulos',
          close: 'Cerrar',
          intro: '<strong>Desafío de Wayra:</strong> "Las construcciones andinas resisten terremotos porque los bloques poligonales se abrazan a seco, sin mortero. ¡Gira y asienta con abrasivo para encajar la roca central en la muralla!"',
          topRock: 'Bloques superiores de andesita',
          leftRock: 'Bloque lateral',
          rightRock: 'Bloque lateral',
          bottomRock: 'Base sísmica almohadillada',
          stoneLabel: 'Piedra de 12 Ángulos',
          toolsTitle: 'Ajustes de cantería',
          rotateLabel: 'Girar bloque de piedra:',
          rotLeft: '↺ Girar -30°',
          rotRight: '↻ Girar +30°',
          polishLabel: 'Pulido con arena húmeda y hematita:',
          polishBtn: '🔨 Pulir juntas de contacto',
          polishLevel: 'Nivel:',
          polished: '(Pulido)',
          techNote: '<strong>Nota técnica:</strong> Ensayos de Jean-Pierre Protzen (1993) confirmaron que los canteros andinos tallaban los bloques con percutores líticos de hematita, logrando juntas tan herméticas que impiden introducir una hoja entre las piedras.',
          btnTest: 'Probar estabilidad sísmica',
          success: '¡Sensacional! El bloque de doce ángulos encajó con precisión milimétrica. La muralla ahora es capaz de absorber ondas sísmicas con total seguridad.',
          btnSuccess: '¡Ajuste sísmico perfecto! (+30 fragmentos)',
          errAngle: 'El ángulo de la piedra aún no coincide con los bloques vecinos. Gira la roca hasta nivelar sus doce vértices con el muro.',
          errPolish: 'La orientación es correcta, pero las caras aún están rugosas. Usa el pulido abrasivo con arena húmeda (Nivel 3/3) para lograr contacto continuo.'
        }
      : lang === 'pt-BR'
      ? {
          badge: 'Arquitetura e engenharia sísmica',
          title: 'O encaixe da Pedra de Doze Ângulos',
          close: 'Fechar',
          intro: '<strong>Desafio de Wayra:</strong> "Os edifícios incas resistem a terremotos porque as pedras poligonais se abraçam a seco, sem argamassa. Gire e faça o assentamento abrasivo para encaixar o bloco central na muralha!"',
          topRock: 'Blocos superiores de andesita',
          leftRock: 'Bloco lateral',
          rightRock: 'Bloco lateral',
          bottomRock: 'Base sísmica almofadada',
          stoneLabel: 'Pedra de 12 Ângulos',
          toolsTitle: 'Ajustes de cantaria',
          rotateLabel: 'Girar bloco de pedra:',
          rotLeft: '↺ Girar -30°',
          rotRight: '↻ Girar +30°',
          polishLabel: 'Polimento com areia úmida e hematita:',
          polishBtn: '🔨 Polir juntas de atrito',
          polishLevel: 'Nível:',
          polished: '(Polido)',
          techNote: '<strong>Nota técnica:</strong> Experimentos de Jean-Pierre Protzen (1993) comprovaram que operários andinos talhavam blocos por percussão direta com martelos líticos, criando encaixes perfeitos sem argamassa.',
          btnTest: 'Testar estabilidade sísmica',
          success: 'Sensacional! O bloco de doze ângulos assentou-se com precisão milimétrica. A muralha agora é capaz de absorver qualquer onda sísmica com total segurança!',
          btnSuccess: 'Encaixe sísmico perfeito! (+30 fragmentos)',
          errAngle: 'O ângulo da pedra ainda não coincide com as facetas dos blocos vizinhos. Gire a pedra até que seus doze vértices fiquem nivelados.',
          errPolish: 'A orientação está quase certa, mas as juntas ainda estão ásperas. Use o polimento abrasivo com areia úmida (Nível 3/3) para garantir o contato contínuo!'
        }
      : {
          badge: 'Architecture and seismic engineering',
          title: 'Fitting the Twelve-Angled Stone',
          close: 'Close',
          intro: '<strong>Wayra’s Challenge:</strong> "Andean stone architecture withstands earthquakes because polygonal ashlar masonry interlocks dry, without mortar. Rotate and abrade the stone to seat it securely into the wall!"',
          topRock: 'Upper andesite blocks',
          leftRock: 'Flanking block',
          rightRock: 'Flanking block',
          bottomRock: 'Cushioned seismic base',
          stoneLabel: 'Twelve-Angled Stone',
          toolsTitle: 'Masonry adjustments',
          rotateLabel: 'Rotate stone block:',
          rotLeft: '↺ Rotate -30°',
          rotRight: '↻ Rotate +30°',
          polishLabel: 'Abrading with wet sand & hematite:',
          polishBtn: '🔨 Abrade contact joints',
          polishLevel: 'Level:',
          polished: '(Polished)',
          techNote: '<strong>Technical note:</strong> Experiments by Jean-Pierre Protzen (1993) demonstrated that Andean masons shaped blocks using stone hammerstones, achieving joints so tight not even a thin blade penetrates.',
          btnTest: 'Test seismic stability',
          success: 'Sensational! The twelve-angled block settled with millimetric precision. The dry-stone wall can now absorb seismic tremors safely.',
          btnSuccess: 'Perfect seismic fit! (+30 fragments)',
          errAngle: 'The orientation does not yet align with the surrounding stones. Rotate the block until all vertices seat cleanly.',
          errPolish: 'The orientation is correct, but joint contact remains rough. Polish using wet sand abrasion (Level 3/3) to secure full contact!'
        };

    this.container.innerHTML = `
      <div class="minigame-modal-overlay">
        <div class="minigame-modal-content">
          <div class="minigame-header">
            <div>
              <span class="badge">${copy.badge}</span>
              <h2>${copy.title}</h2>
            </div>
            <button class="btn-close" id="btn-close-stonework" aria-label="${copy.close}">&times;</button>
          </div>

          <div class="minigame-intro">
            <p>${copy.intro}</p>
          </div>

          <div class="stonework-workspace">
            <div class="stone-puzzle-board">
              <div class="wall-frame">
                <div class="wall-rock rock-top">${copy.topRock}</div>
                <div class="wall-rock rock-left">${copy.leftRock}</div>

                <div class="socket-zone">
                  <div class="twelve-angle-stone" id="target-stone" style="transform: rotate(${this.currentAngle}deg);">
                    <div class="stone-face">
                      <span class="stone-label">${copy.stoneLabel}</span>
                      <div class="stone-bevel"></div>
                    </div>
                  </div>
                </div>

                <div class="wall-rock rock-right">${copy.rightRock}</div>
                <div class="wall-rock rock-bottom">${copy.bottomRock}</div>
              </div>
            </div>

            <div class="stonework-tools-panel">
              <h4>${copy.toolsTitle}</h4>
              <div class="tool-section">
                <label>${copy.rotateLabel}</label>
                <div class="rotation-controls">
                  <button class="btn-tool" id="btn-rot-left">${copy.rotLeft}</button>
                  <button class="btn-tool" id="btn-rot-right">${copy.rotRight}</button>
                </div>
              </div>

              <div class="tool-section">
                <label>${copy.polishLabel}</label>
                <button class="btn-tool btn-abrade" id="btn-abrade-stone">
                  <span>${copy.polishBtn}</span>
                  <span class="abrade-progress" id="abrade-progress-label">${copy.polishLevel} ${this.smoothingStep} / 3 ${this.smoothingStep === 3 ? copy.polished : ''}</span>
                </button>
              </div>

              <div class="academic-note">
                <small>${copy.techNote}</small>
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="stonework-feedback"></div>
            <button class="btn-primary" id="btn-check-stonework">${copy.btnTest}</button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(copy);
  }

  private attachEvents(copy: any): void {
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
        if (label) label.textContent = `${copy.polishLevel} ${this.smoothingStep} / 3 ${this.smoothingStep === 3 ? copy.polished : ''}`;
        this.updateStoneVisual();
      }
    });

    const checkBtn = this.container.querySelector('#btn-check-stonework');
    checkBtn?.addEventListener('click', () => {
      this.verifySolution(copy);
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

  private verifySolution(copy: any): void {
    const isAngleCorrect = this.currentAngle === 0 || this.currentAngle === 360;
    const isPolished = this.smoothingStep >= 3;

    if (isAngleCorrect && isPolished) {
      AudioManager.getInstance().playMissionComplete();
      const state = GameState.getInstance();
      state.completeMissionStep('mission_main_andes', 'step_solve_stonework');
      state.unlockDiscovery('disc_cantaria');
      state.addKnowledgeFragments(30);

      this.setFeedback(copy.success, 'success');

      const checkBtn = this.container.querySelector('#btn-check-stonework') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = copy.btnSuccess;
        checkBtn.disabled = true;
      }

      setTimeout(() => {
        this.close();
        this.onCompleteCallback();
      }, 2500);
    } else if (!isAngleCorrect) {
      AudioManager.getInstance().playClick();
      this.setFeedback(copy.errAngle, 'error');
    } else {
      AudioManager.getInstance().playClick();
      this.setFeedback(copy.errPolish, 'error');
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
