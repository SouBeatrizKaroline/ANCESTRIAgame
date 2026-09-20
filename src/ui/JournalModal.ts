import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ANDES_DISCOVERIES } from '../data/discoveries/andesDiscoveries';
import { HISTORICAL_SOURCES } from '../data/references/historicalSources';
import { DiscoveryCategory } from '../data/types';

export class JournalModal {
  private container: HTMLElement;
  private currentCategory: DiscoveryCategory | 'Todas' = 'Todas';
  private searchQuery: string = '';

  private categories: Array<DiscoveryCategory | 'Todas'> = [
    'Todas',
    'Tecnologias',
    'Agricultura',
    'Arquitetura',
    'Sociedade',
    'Astronomia',
    'Idiomas'
  ];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public show(): void {
    AudioManager.getInstance().playClick();
    this.render();
  }

  private render(): void {
    const state = GameState.getInstance();
    const unlockedCount = state.unlockedDiscoveryIds.length;
    const totalCount = ANDES_DISCOVERIES.length;

    this.container.innerHTML = `
      <div class="journal-modal-overlay">
        <div class="journal-window">
          <div class="journal-header">
            <div>
              <span class="badge">Registro Cultural</span>
              <h2>Diario de memorias</h2>
              <p class="journal-counter">Descubrimientos registrados: <strong>${unlockedCount} / ${totalCount}</strong></p>
            </div>
            <button class="btn-close" id="btn-close-journal" aria-label="Cerrar diario">&times;</button>
          </div>

          <div class="journal-toolbar">
            <div class="search-box">
              <input type="text" id="journal-search" placeholder="Pesquisar saberes, tecnologias, costumes..." value="${this.searchQuery}" />
            </div>
            <div class="category-tabs">
              ${this.categories
                .map(
                  (cat) => `
                <button class="btn-cat-tab ${this.currentCategory === cat ? 'active' : ''}" data-cat="${cat}">
                  ${cat}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="journal-content-grid" id="journal-items-grid">
            ${this.renderDiscoveryCards()}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private renderDiscoveryCards(): string {
    const state = GameState.getInstance();
    const filtered = ANDES_DISCOVERIES.filter((item) => {
      const matchCat = this.currentCategory === 'Todas' || item.category === this.currentCategory;
      const matchSearch =
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      return `<div class="journal-empty">Nenhum registro encontrado para estes critérios.</div>`;
    }

    return filtered
      .map((item) => {
        const isUnlocked = state.isDiscoveryUnlocked(item.id);

        if (!isUnlocked) {
          return `
            <div class="journal-card locked">
              <div class="journal-card-icon">
                <svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 2 C9.24 2 7 4.24 7 7 L7 10 L6 10 C4.9 10 4 10.9 4 12 L4 20 C4 21.1 4.9 22 6 22 L18 22 C19.1 22 20 21.1 20 20 L20 12 C20 10.9 19.1 10 18 10 L17 10 L17 7 C17 4.24 14.76 2 12 2 Z M9 7 C9 5.34 10.34 4 12 4 C13.66 4 15 5.34 15 7 L15 10 L9 10 Z" fill="currentColor"/></svg>
              </div>
              <div class="journal-card-info">
                <span class="card-category">${item.category}</span>
                <h3 class="card-title">Descubrimiento por revelar</h3>
                <p class="card-hint"><em>Pista: ${item.locationHint}</em></p>
              </div>
            </div>
          `;
        }

        return `
          <div class="journal-card unlocked" data-discovery-id="${item.id}">
            <div class="journal-card-icon">
              <svg viewBox="0 0 24 24" class="svg-icon">${item.iconSvg}</svg>
            </div>
            <div class="journal-card-info">
              <div class="card-meta">
                <span class="card-category">${item.category}</span>
                <span class="badge-tag">Andes / Inca</span>
              </div>
              <h3 class="card-title">${item.name}</h3>
              <p class="card-desc">${item.shortDescription}</p>
              <button class="btn-read-more" data-discovery-id="${item.id}">Ler Detalhes e Fontes &rarr;</button>
            </div>
          </div>
        `;
      })
      .join('');
  }

  private attachEvents(): void {
    const closeBtn = this.container.querySelector('#btn-close-journal');
    closeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
    });

    const searchInput = this.container.querySelector('#journal-search') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value;
      const grid = this.container.querySelector('#journal-items-grid');
      if (grid) grid.innerHTML = this.renderDiscoveryCards();
      this.attachCardClickEvents();
    });

    const catBtns = this.container.querySelectorAll('.btn-cat-tab');
    catBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        AudioManager.getInstance().playClick();
        catBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.getAttribute('data-cat') as any;
        const grid = this.container.querySelector('#journal-items-grid');
        if (grid) grid.innerHTML = this.renderDiscoveryCards();
        this.attachCardClickEvents();
      });
    });

    this.attachCardClickEvents();
  }

  private attachCardClickEvents(): void {
    const cardBtns = this.container.querySelectorAll('.btn-read-more');
    cardBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        AudioManager.getInstance().playClick();
        const id = btn.getAttribute('data-discovery-id');
        if (id) this.openDetailModal(id);
      });
    });
  }

  private openDetailModal(discoveryId: string): void {
    const item = ANDES_DISCOVERIES.find((d) => d.id === discoveryId);
    if (!item) return;

    const sources = item.sourceIds
      .map((sid) => HISTORICAL_SOURCES[sid])
      .filter((s) => s !== undefined);

    const detailOverlay = document.createElement('div');
    detailOverlay.className = 'journal-detail-modal-overlay';
    detailOverlay.innerHTML = `
      <div class="journal-detail-window">
        <div class="journal-detail-header">
          <div>
            <span class="badge">${item.category} • Andes</span>
            <h2>${item.name}</h2>
          </div>
          <button class="btn-close" id="btn-close-detail">&times;</button>
        </div>

        <div class="journal-detail-body">
          <div class="full-content-text">
            ${item.fullContent
              .split('\n\n')
              .map((p) => `<p>${p}</p>`)
              .join('')}
          </div>

          ${
            item.curiosityFact
              ? `
            <div class="curiosity-box">
              <strong>Sabia que?</strong>
              <p>${item.curiosityFact}</p>
            </div>
          `
              : ''
          }

          <div class="sources-section">
            <h4>Fontes e Referências Histórico-Arqueológicas</h4>
            <div class="sources-list">
              ${sources
                .map(
                  (s) => `
                <div class="source-item">
                  <strong>${s.author}</strong> (${s.year || 's/d'}). 
                  <em>${s.title}</em>. ${s.institutionOrPublisher || ''}.
                  ${s.notes ? `<p class="source-notes">${s.notes}</p>` : ''}
                  ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-link">Acessar registro &rarr;</a>` : ''}
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(detailOverlay);

    detailOverlay.querySelector('#btn-close-detail')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      detailOverlay.remove();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
