import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ANDES_DIALOGUES } from '../data/dialogues/andesDialogues';

export class DialogueModal {
  private container: HTMLElement;
  private onTriggerMinigame: (minigameId: 'terraces' | 'quipu' | 'stonework') => void;

  constructor(
    container: HTMLElement,
    onTriggerMinigame: (minigameId: 'terraces' | 'quipu' | 'stonework') => void
  ) {
    this.container = container;
    this.onTriggerMinigame = onTriggerMinigame;
  }

  public show(dialogueId: string): void {
    const node = ANDES_DIALOGUES[dialogueId];
    if (!node) return;

    // Conclui passos de missão se associados
    const state = GameState.getInstance();
    if (dialogueId === 'dia_kuntur_intro') {
      state.completeMissionStep('mission_main_andes', 'step_talk_kuntur');
      state.unlockDiscovery('disc_qhapaq_nan');
    }

    this.container.innerHTML = `
      <div class="dialogue-modal-overlay">
        <div class="dialogue-box">
          <div class="dialogue-speaker-banner">
            <div class="speaker-avatar">
              <span class="avatar-letter">${node.speakerName.charAt(0)}</span>
            </div>
            <div class="speaker-meta">
              <h3 class="speaker-name">${node.speakerName}</h3>
              <span class="speaker-role">${node.role}</span>
            </div>
            <button class="btn-close-dialogue" id="btn-close-dialogue" aria-label="Cerrar diálogo">&times;</button>
          </div>

          <div class="dialogue-body">
            <p class="dialogue-text">${node.text}</p>
          </div>

          <div class="dialogue-choices" id="dialogue-choices-list">
            ${
              node.choices
                ? node.choices
                    .map(
                      (choice, index) => `
                <button class="btn-dialogue-choice" data-choice-index="${index}">
                  <span class="choice-arrow">➤</span>
                  <span>${choice.text}</span>
                </button>
              `
                    )
                    .join('')
                : ''
            }
            ${
              node.triggerMinigameId
                ? `
                <button class="btn-dialogue-choice btn-challenge" id="btn-start-minigame">
                  <span class="choice-arrow">★</span>
                  <span>Aceptar desafío educativo</span>
                </button>
              `
                : ''
            }
          </div>
        </div>
      </div>
    `;

    this.attachEvents(dialogueId);
  }

  private attachEvents(dialogueId: string): void {
    const closeBtn = this.container.querySelector('#btn-close-dialogue');
    closeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
    });

    const node = ANDES_DIALOGUES[dialogueId];
    if (!node) return;

    const choiceBtns = this.container.querySelectorAll('.btn-dialogue-choice[data-choice-index]');
    choiceBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        AudioManager.getInstance().playInteract();
        const idx = Number(btn.getAttribute('data-choice-index'));
        const choice = node.choices?.[idx];
        if (choice) {
          if (choice.giveFragments) {
            GameState.getInstance().addKnowledgeFragments(choice.giveFragments);
          }
          if (choice.unlockDiscoveryId) {
            GameState.getInstance().unlockDiscovery(choice.unlockDiscoveryId);
          }

          // Atualiza o texto do diálogo com a resposta do NPC
          const bodyEl = this.container.querySelector('.dialogue-body');
          if (bodyEl) {
            bodyEl.innerHTML = `<p class="dialogue-text">${choice.response}</p>`;
          }

          const choicesEl = this.container.querySelector('#dialogue-choices-list');
          if (choicesEl) {
            choicesEl.innerHTML = `
              ${
                node.triggerMinigameId
                  ? `
                  <button class="btn-dialogue-choice btn-challenge" id="btn-start-minigame">
                    <span class="choice-arrow">★</span>
                    <span>Aceptar desafío educativo</span>
                  </button>
                `
                  : ''
              }
              <button class="btn-dialogue-choice" id="btn-finish-dialogue">
                <span class="choice-arrow">✓</span>
                <span>Continuar la exploración</span>
              </button>
            `;

            this.container.querySelector('#btn-finish-dialogue')?.addEventListener('click', () => {
              AudioManager.getInstance().playClick();
              this.close();
            });

            this.container.querySelector('#btn-start-minigame')?.addEventListener('click', () => {
              AudioManager.getInstance().playClick();
              this.close();
              if (node.triggerMinigameId) {
                this.onTriggerMinigame(node.triggerMinigameId);
              }
            });
          }
        }
      });
    });

    const startMinigameBtn = this.container.querySelector('#btn-start-minigame');
    startMinigameBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
      if (node.triggerMinigameId) {
        this.onTriggerMinigame(node.triggerMinigameId);
      }
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
