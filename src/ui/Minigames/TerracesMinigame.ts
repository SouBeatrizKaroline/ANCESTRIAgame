import { GameState } from '../../state/GameState';
import { AudioManager } from '../../engine/AudioManager';

export class TerracesMinigame {
  private container: HTMLElement;
  private onCompleteCallback: () => void;

  // 3 Pisos Ecológicos e seus cultivos corretos baseados em John Murra
  private tiers = [
    {
      id: 'high',
      name: 'Piso Alto (Puna & Suni - 3.800m a 4.200m)',
      climate: 'Frio extremo, geadas frequentes e ventos fortes',
      correctCrop: 'papa',
      placedCrop: null as string | null
    },
    {
      id: 'mid',
      name: 'Piso Médio (Quechua - 2.300m a 3.500m)',
      climate: 'Vales temperados com boa insolação e chuvas sazonais',
      correctCrop: 'milho',
      placedCrop: null as string | null
    },
    {
      id: 'low',
      name: 'Piso Baixo (Yungas Fluviais - 1.500m a 2.300m)',
      climate: 'Encostas amenas, alta umidade e ar quente',
      correctCrop: 'coca',
      placedCrop: null as string | null
    }
  ];

  private crops = [
    {
      id: 'papa',
      name: 'Batata Nativa & Quinoa',
      desc: 'Altamente resistente a geadas noturnas e solos rochosos de grande altitude.',
      icon: '🥔'
    },
    {
      id: 'milho',
      name: 'Milho Sagrado (Sara)',
      desc: 'Exige temperaturas amenas e solo profundo, essencial para cerimônias e chicha.',
      icon: '🌽'
    },
    {
      id: 'coca',
      name: 'Folha de Coca & Ají',
      desc: 'Plantas perenes que necessitam de calor úmido e proteção contra o gelo.',
      icon: '🍃'
    }
  ];

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
              <span class="badge">Agricultura Andina</span>
              <h2>Organização dos Andenes por Pisos Ecológicos</h2>
            </div>
            <button class="btn-close" id="btn-close-minigame" aria-label="Fechar">&times;</button>
          </div>

          <div class="minigame-intro">
            <p><strong>Desafio de Sumaq:</strong> Os povos andinos dominaram as montanhas cultivando em diferentes altitudes. Distribua cada cultivo no piso ecológico adequado para proteger as lavouras e maximizar a colheita!</p>
          </div>

          <div class="terraces-workspace">
            <div class="terraces-slots">
              ${this.tiers
                .map(
                  (tier) => `
                <div class="terrace-slot" data-tier-id="${tier.id}">
                  <div class="terrace-slot-header">
                    <h4>${tier.name}</h4>
                    <span class="climate-tag">${tier.climate}</span>
                  </div>
                  <div class="terrace-slot-drop" id="slot-${tier.id}">
                    <span class="drop-placeholder">Toque ou selecione um cultivo para plantar aqui</span>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>

            <div class="terraces-crops-bank">
              <h4>Cultivos Disponíveis</h4>
              <div class="crops-list">
                ${this.crops
                  .map(
                    (crop) => `
                  <button class="crop-card" data-crop-id="${crop.id}">
                    <span class="crop-icon">${crop.icon}</span>
                    <div class="crop-info">
                      <strong>${crop.name}</strong>
                      <small>${crop.desc}</small>
                    </div>
                  </button>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="terraces-feedback"></div>
            <button class="btn-primary" id="btn-check-terraces" disabled>Confirmar Organização dos Andenes</button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private selectedCropId: string | null = null;

  private attachEvents(): void {
    const closeBtn = this.container.querySelector('#btn-close-minigame');
    closeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
    });

    const cropCards = this.container.querySelectorAll('.crop-card');
    cropCards.forEach((card) => {
      card.addEventListener('click', () => {
        AudioManager.getInstance().playClick();
        cropCards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedCropId = card.getAttribute('data-crop-id');
      });
    });

    const slots = this.container.querySelectorAll('.terrace-slot-drop');
    slots.forEach((slot) => {
      slot.addEventListener('click', () => {
        if (!this.selectedCropId) {
          this.setFeedback('Selecione primeiro um cultivo abaixo para colocá-lo neste terraço.', 'info');
          return;
        }
        AudioManager.getInstance().playInteract();
        const tierId = slot.parentElement?.getAttribute('data-tier-id');
        const tier = this.tiers.find((t) => t.id === tierId);
        const crop = this.crops.find((c) => c.id === this.selectedCropId);

        if (tier && crop) {
          // Remove de outro piso se já estivesse alocado
          this.tiers.forEach((t) => {
            if (t.placedCrop === crop.id) t.placedCrop = null;
          });

          tier.placedCrop = crop.id;
          this.updateSlotsDisplay();
        }
      });
    });

    const checkBtn = this.container.querySelector('#btn-check-terraces') as HTMLButtonElement;
    checkBtn?.addEventListener('click', () => {
      this.verifySolution();
    });
  }

  private updateSlotsDisplay(): void {
    this.tiers.forEach((tier) => {
      const slotEl = this.container.querySelector(`#slot-${tier.id}`);
      if (!slotEl) return;

      if (tier.placedCrop) {
        const crop = this.crops.find((c) => c.id === tier.placedCrop);
        slotEl.innerHTML = `
          <div class="placed-crop">
            <span class="crop-icon">${crop?.icon}</span>
            <span><strong>${crop?.name}</strong></span>
          </div>
        `;
        slotEl.classList.add('has-item');
      } else {
        slotEl.innerHTML = `<span class="drop-placeholder">Toque para plantar o cultivo selecionado</span>`;
        slotEl.classList.remove('has-item');
      }
    });

    const allPlaced = this.tiers.every((t) => t.placedCrop !== null);
    const checkBtn = this.container.querySelector('#btn-check-terraces') as HTMLButtonElement;
    if (checkBtn) {
      checkBtn.disabled = !allPlaced;
    }
  }

  private verifySolution(): void {
    const isAllCorrect = this.tiers.every((tier) => tier.placedCrop === tier.correctCrop);

    if (isAllCorrect) {
      AudioManager.getInstance().playMissionComplete();
      const state = GameState.getInstance();
      state.completeMissionStep('mission_main_andes', 'step_solve_terraces');
      state.unlockDiscovery('disc_andenes');
      state.addKnowledgeFragments(30);

      this.setFeedback(
        'Excelente! Você organizou os terraços perfeitamente. As batatas e a quinoa suportam as geadas da puna, o milho floresce nos vales e a folha de coca aproveita o calor das encostas inferiores!',
        'success'
      );

      const checkBtn = this.container.querySelector('#btn-check-terraces') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = 'Concluído com Sucesso! (+30 Fragmentos)';
        checkBtn.disabled = true;
      }

      setTimeout(() => {
        this.close();
        this.onCompleteCallback();
      }, 2500);
    } else {
      AudioManager.getInstance().playClick();
      this.setFeedback(
        'Alguns cultivos estão em pisos que não suportariam o clima. Lembre-se: batatas suportam frio intenso no alto, milho precisa de vales temperados e a folha de coca prefere o calor das encostas baixas!',
        'error'
      );
    }
  }

  private setFeedback(text: string, type: 'info' | 'success' | 'error'): void {
    const el = this.container.querySelector('#terraces-feedback');
    if (el) {
      el.textContent = text;
      el.className = `feedback-msg ${type}`;
    }
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
