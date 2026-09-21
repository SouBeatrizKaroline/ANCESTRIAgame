import { GameState } from '../../state/GameState';
import { AudioManager } from '../../engine/AudioManager';

export class TerracesMinigame {
  private container: HTMLElement;
  private onCompleteCallback: () => void;

  // 3 Pisos Ecológicos e seus cultivos corretos baseados em John Murra
  private tiers = [
    {
      id: 'high',
      name: 'Piso alto (Puna y Suni — 3.800 m a 4.200 m)',
      climate: 'Frío extremo, heladas frecuentes y vientos fuertes',
      correctCrop: 'papa',
      placedCrop: null as string | null
    },
    {
      id: 'mid',
      name: 'Piso medio (Quechua — 2.300 m a 3.500 m)',
      climate: 'Valles templados con buena insolación y lluvias estacionales',
      correctCrop: 'milho',
      placedCrop: null as string | null
    },
    {
      id: 'low',
      name: 'Piso bajo (Yungas fluviales — 1.500 m a 2.300 m)',
      climate: 'Laderas cálidas, humedad elevada y aire caliente',
      correctCrop: 'coca',
      placedCrop: null as string | null
    }
  ];

  private crops = [
    {
      id: 'papa',
      name: 'Papa nativa y quinua',
      desc: 'Cultivos adaptados a heladas nocturnas y suelos de gran altitud.',
      icon: '🥔'
    },
    {
      id: 'milho',
      name: 'Maíz (sara)',
      desc: 'Necesita temperaturas moderadas y suelos profundos.',
      icon: '🌽'
    },
    {
      id: 'coca',
      name: 'Hoja de coca y ají',
      desc: 'Plantas que necesitan calor, humedad y protección contra las heladas.',
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
              <span class="badge">Agricultura andina</span>
              <h2>Organización de los andenes por pisos ecológicos</h2>
            </div>
            <button class="btn-close" id="btn-close-minigame" aria-label="Cerrar">&times;</button>
          </div>

          <div class="minigame-intro">
            <p><strong>Desafío de Sumaq:</strong> Diversos pueblos andinos desarrollaron técnicas de cultivo adaptadas a diferentes alturas. Distribuye cada cultivo en el piso ecológico adecuado.</p>
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
                    <span class="drop-placeholder">Selecciona un cultivo para plantarlo aquí</span>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>

            <div class="terraces-crops-bank">
              <h4>Cultivos disponibles</h4>
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
          this.setFeedback('Primero selecciona un cultivo para colocarlo en esta terraza.', 'info');
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
        slotEl.innerHTML = `<span class="drop-placeholder">Selecciona para plantar el cultivo elegido</span>`;
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
        '¡Excelente! Organizaste los cultivos según las condiciones de cada piso ecológico.',
        'success'
      );

      const checkBtn = this.container.querySelector('#btn-check-terraces') as HTMLButtonElement;
      if (checkBtn) {
        checkBtn.textContent = '¡Completado! (+30 fragmentos)';
        checkBtn.disabled = true;
      }

      setTimeout(() => {
        this.close();
        this.onCompleteCallback();
      }, 2500);
    } else {
      AudioManager.getInstance().playClick();
      this.setFeedback(
        'Algunos cultivos no corresponden al clima elegido. Revisa la altura, la temperatura y la humedad de cada piso.',
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
