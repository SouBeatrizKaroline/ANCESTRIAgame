import { GameState } from '../../state/GameState';
import { AudioManager } from '../../engine/AudioManager';
import { getLanguage } from '../../i18n';

export class TerracesMinigame {
  private container: HTMLElement;
  private onCompleteCallback: () => void;
  private selectedCropId: string | null = null;

  private tiers = [
    { id: 'high', correctCrop: 'papa', placedCrop: null as string | null },
    { id: 'mid', correctCrop: 'milho', placedCrop: null as string | null },
    { id: 'low', correctCrop: 'coca', placedCrop: null as string | null }
  ];

  constructor(container: HTMLElement, onComplete: () => void) {
    this.container = container;
    this.onCompleteCallback = onComplete;
  }

  public render(): void {
    const lang = getLanguage();

    const copy = lang === 'es'
      ? {
          badge: 'Agricultura andina',
          title: 'Organización de andenes por pisos ecológicos',
          close: 'Cerrar',
          intro: '<strong>Desafío de Sumaq:</strong> Los pueblos andinos dominaron las laderas cultivando en distintas altitudes. Asigna cada cultivo al piso ecológico adecuado según su resistencia térmica.',
          tiers: {
            high: { name: 'Piso alto (Puna y Suni · 3.800m a 4.200m)', climate: 'Frío extremo, heladas frecuentes y vientos secos' },
            mid: { name: 'Piso medio (Quechua · 2.300m a 3.500m)', climate: 'Valles templados con buena radiación y lluvias estacionales' },
            low: { name: 'Piso bajo (Yungas fluviales · 1.500m a 2.300m)', climate: 'Laderas húmedas y cálidas con aire templado' }
          },
          crops: [
            { id: 'papa', name: 'Papa nativa y quinua', desc: 'Resistentes a heladas nocturnas y suelos pedregosos de gran altitud.', icon: '🥔' },
            { id: 'milho', name: 'Maíz sagrado (Sara)', desc: 'Requiere temperaturas templadas y suelo fértil; esencial para la chicha ceremonial.', icon: '🌽' },
            { id: 'coca', name: 'Hoja de coca y ají', desc: 'Plantas que necesitan calor húmedo y protección absoluta contra el frío.', icon: '🍃' }
          ],
          available: 'Cultivos disponibles',
          placeholder: 'Toca un cultivo abajo para asignarlo aquí',
          btnConfirm: 'Confirmar organización de andenes',
          selectFirst: 'Selecciona primero un cultivo abajo para colocarlo en este andén.',
          success: '¡Excelente! Organizaste los andenes según el control vertical de pisos ecológicos (John Murra). Las papas y la quinua resisten la puna, el maíz florece en los valles y la coca prospera en las laderas cálidas.',
          btnSuccess: '¡Completado con éxito! (+30 fragmentos)',
          error: 'Algunos cultivos están en pisos que no corresponden a su tolerancia climática. Revisa las características de cada piso y vuelve a organizarlos.'
        }
      : lang === 'pt-BR'
      ? {
          badge: 'Agricultura andina',
          title: 'Organização dos andenes por pisos ecológicos',
          close: 'Fechar',
          intro: '<strong>Desafio de Sumaq:</strong> Os povos andinos dominaram as montanhas cultivando em diferentes altitudes. Distribua cada cultivo no piso ecológico adequado para proteger as lavouras!',
          tiers: {
            high: { name: 'Piso alto (Puna e Suni · 3.800m a 4.200m)', climate: 'Frio extremo, geadas frequentes e ventos fortes' },
            mid: { name: 'Piso médio (Quechua · 2.300m a 3.500m)', climate: 'Vales temperados com boa insolação e chuvas sazonais' },
            low: { name: 'Piso baixo (Yungas fluviais · 1.500m a 2.300m)', climate: 'Encostas amenas, alta umidade e ar quente' }
          },
          crops: [
            { id: 'papa', name: 'Batata nativa e quinoa', desc: 'Altamente resistente a geadas noturnas e solos rochosos de grande altitude.', icon: '🥔' },
            { id: 'milho', name: 'Milho sagrado (Sara)', desc: 'Exige temperaturas amenas e solo profundo, essencial para cerimônias e chicha.', icon: '🌽' },
            { id: 'coca', name: 'Folha de coca e ají', desc: 'Plantas perenes que necessitam de calor úmido e proteção contra o gelo.', icon: '🍃' }
          ],
          available: 'Cultivos disponíveis',
          placeholder: 'Toque em um cultivo abaixo para plantar aqui',
          btnConfirm: 'Confirmar organização dos andenes',
          selectFirst: 'Selecione primeiro um cultivo abaixo para colocá-lo neste terraço.',
          success: 'Excelente! Você organizou os terraços perfeitamente conforme o controle vertical de pisos ecológicos (John Murra).',
          btnSuccess: 'Concluído com sucesso! (+30 fragmentos)',
          error: 'Alguns cultivos estão em pisos que não suportam seu clima. Revise as altitudes e tente novamente!'
        }
      : {
          badge: 'Andean agriculture',
          title: 'Terrace organization by ecological tiers',
          close: 'Close',
          intro: '<strong>Sumaq’s Challenge:</strong> Andean peoples mastered mountain farming across varied altitudes. Assign each crop to its matching ecological tier based on climate resilience.',
          tiers: {
            high: { name: 'High Tier (Puna & Suni · 3,800m to 4,200m)', climate: 'Severe cold, frequent frost, and dry winds' },
            mid: { name: 'Mid Tier (Quechua · 2,300m to 3,500m)', climate: 'Temperate valleys with seasonal rainfall' },
            low: { name: 'Low Tier (Riverine Yungas · 1,500m to 2,300m)', climate: 'Humid, warm slopes sheltered from mountain frost' }
          },
          crops: [
            { id: 'papa', name: 'Native potato and quinoa', desc: 'Highly resilient against nighttime highland frost and stony soils.', icon: '🥔' },
            { id: 'milho', name: 'Sacred maize (Sara)', desc: 'Requires temperate warmth and deep soil; essential for ceremonial chicha.', icon: '🌽' },
            { id: 'coca', name: 'Coca leaf and chili pepper', desc: 'Perennial crops requiring moist warmth and frost protection.', icon: '🍃' }
          ],
          available: 'Available crops',
          placeholder: 'Select a crop below to plant here',
          btnConfirm: 'Confirm terrace organization',
          selectFirst: 'Select a crop below first to place it on this terrace.',
          success: 'Excellent! You organized the terraces according to vertical ecological control (John Murra).',
          btnSuccess: 'Successfully completed! (+30 fragments)',
          error: 'Some crops are in tiers incompatible with their climate needs. Review altitude requirements and retry!'
        };

    this.container.innerHTML = `
      <div class="minigame-modal-overlay">
        <div class="minigame-modal-content">
          <div class="minigame-header">
            <div>
              <span class="badge">${copy.badge}</span>
              <h2>${copy.title}</h2>
            </div>
            <button class="btn-close" id="btn-close-minigame" aria-label="${copy.close}">&times;</button>
          </div>

          <div class="minigame-intro">
            <p>${copy.intro}</p>
          </div>

          <div class="terraces-workspace">
            <div class="terraces-slots">
              ${this.tiers.map((tier) => {
                const info = copy.tiers[tier.id as 'high' | 'mid' | 'low'];
                return `
                  <div class="terrace-slot" data-tier-id="${tier.id}">
                    <div class="terrace-slot-header">
                      <h4>${info.name}</h4>
                      <span class="climate-tag">${info.climate}</span>
                    </div>
                    <div class="terrace-slot-drop" id="slot-${tier.id}">
                      <span class="drop-placeholder">${copy.placeholder}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="terraces-crops-bank">
              <h4>${copy.available}</h4>
              <div class="crops-list">
                ${copy.crops.map((crop) => `
                  <button class="crop-card" data-crop-id="${crop.id}">
                    <span class="crop-icon">${crop.icon}</span>
                    <div class="crop-info">
                      <strong>${crop.name}</strong>
                      <small>${crop.desc}</small>
                    </div>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="minigame-footer">
            <div class="feedback-msg" id="terraces-feedback"></div>
            <button class="btn-primary" id="btn-check-terraces" disabled>${copy.btnConfirm}</button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(copy);
  }

  private attachEvents(copy: any): void {
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
          this.setFeedback(copy.selectFirst, 'info');
          return;
        }
        AudioManager.getInstance().playInteract();
        const tierId = slot.parentElement?.getAttribute('data-tier-id');
        const tier = this.tiers.find((t) => t.id === tierId);
        const crop = copy.crops.find((c: any) => c.id === this.selectedCropId);

        if (tier && crop) {
          this.tiers.forEach((t) => {
            if (t.placedCrop === crop.id) t.placedCrop = null;
          });
          tier.placedCrop = crop.id;
          this.updateSlotsDisplay(copy);
        }
      });
    });

    const checkBtn = this.container.querySelector('#btn-check-terraces') as HTMLButtonElement;
    checkBtn?.addEventListener('click', () => {
      this.verifySolution(copy);
    });
  }

  private updateSlotsDisplay(copy: any): void {
    this.tiers.forEach((tier) => {
      const slotEl = this.container.querySelector(`#slot-${tier.id}`);
      if (!slotEl) return;

      if (tier.placedCrop) {
        const crop = copy.crops.find((c: any) => c.id === tier.placedCrop);
        slotEl.innerHTML = `
          <div class="placed-crop">
            <span class="crop-icon">${crop?.icon}</span>
            <span><strong>${crop?.name}</strong></span>
          </div>
        `;
        slotEl.classList.add('has-item');
      } else {
        slotEl.innerHTML = `<span class="drop-placeholder">${copy.placeholder}</span>`;
        slotEl.classList.remove('has-item');
      }
    });

    const allPlaced = this.tiers.every((t) => t.placedCrop !== null);
    const checkBtn = this.container.querySelector('#btn-check-terraces') as HTMLButtonElement;
    if (checkBtn) {
      checkBtn.disabled = !allPlaced;
    }
  }

  private verifySolution(copy: any): void {
    const isAllCorrect = this.tiers.every((tier) => tier.placedCrop === tier.correctCrop);

    if (isAllCorrect) {
      AudioManager.getInstance().playMissionComplete();
      const state = GameState.getInstance();
      state.completeMissionStep('mission_main_andes', 'step_solve_terraces');
      state.unlockDiscovery('disc_andenes');
      state.addKnowledgeFragments(30);

      this.setFeedback(copy.success, 'success');

      const checkBtn = this.container.querySelector('#btn-check-terraces') as HTMLButtonElement;
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
      this.setFeedback(copy.error, 'error');
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
