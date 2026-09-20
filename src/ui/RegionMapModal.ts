import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ALL_REGIONS } from '../data/regions';
import { RegionId } from '../data/types';

export class RegionMapModal {
  private container: HTMLElement;
  private onSelectRegion: (regionId: RegionId) => void;

  constructor(container: HTMLElement, onSelectRegion: (regionId: RegionId) => void) {
    this.container = container;
    this.onSelectRegion = onSelectRegion;
  }

  public show(): void {
    AudioManager.getInstance().playClick();
    this.render();
  }

  private render(): void {
    const state = GameState.getInstance();
    const fragments = state.knowledgeFragments;
    const regions = Object.values(ALL_REGIONS);

    this.container.innerHTML = `
      <div class="atlas-modal-overlay">
        <div class="atlas-window">
          <div class="atlas-header">
            <div>
              <span class="badge">Territorios y memorias de las Américas</span>
              <h2>ANCESTRIA</h2>
              <p class="atlas-subtitle">Elige un territorio para conocer saberes desde contextos y perspectivas propias</p>
            </div>
            <button class="btn-close" id="btn-close-atlas" aria-label="Cerrar mapa">&times;</button>
          </div>

          <div class="atlas-map-visual">
            <div class="atlas-map-banner">
              <span class="fragments-pill">✨ Tus fragmentos de conocimiento: <strong>${fragments}</strong></span>
            </div>

            <div class="region-cards-grid">
              ${regions
                .map((r) => {
                  const isUnlocked = state.unlockedRegionIds.includes(r.id);
                  const isAvailable = r.status === 'disponivel';
                  const canUnlock = fragments >= r.unlockRequirementFragments;

                  return `
                  <div class="region-card ${r.status} ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="region-card-top">
                      <span class="region-status-badge ${r.status}">
                        ${isAvailable ? 'Jugable (MVP)' : 'En expansión'}
                      </span>
                      <span class="region-period">${r.timePeriod}</span>
                    </div>

                    <h3 class="region-title">${r.name}</h3>
                    <p class="region-subtitle"><em>${r.titleSubtitle}</em></p>
                    <p class="region-desc">${r.description}</p>

                    <div class="region-meta">
                      <span>👤 ${r.npcCount} personajes</span>
                      <span>📜 ${r.discoveriesCount} descubrimientos</span>
                    </div>

                    <div class="region-action">
                      ${
                        isAvailable
                          ? `
                        <button class="btn-primary btn-enter-region" data-region-id="${r.id}">
                          Explorar ahora &rarr;
                        </button>
                      `
                          : `
                        <button class="btn-secondary btn-locked-region" disabled>
                          ${canUnlock ? 'Disponible próximamente' : `Requiere ${r.unlockRequirementFragments} fragmentos`}
                        </button>
                      `
                      }
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const closeBtn = this.container.querySelector('#btn-close-atlas');
    closeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
    });

    const enterBtns = this.container.querySelectorAll('.btn-enter-region');
    enterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        AudioManager.getInstance().playClick();
        const regionId = btn.getAttribute('data-region-id') as RegionId;
        this.close();
        this.onSelectRegion(regionId);
      });
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
