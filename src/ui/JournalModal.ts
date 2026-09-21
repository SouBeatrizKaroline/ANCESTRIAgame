import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ANDES_DISCOVERIES } from '../data/discoveries/andesDiscoveries';
import { HISTORICAL_SOURCES } from '../data/references/historicalSources';
import { DiscoveryCategory } from '../data/types';
import { getLanguage, t } from '../i18n';

export class JournalModal {
  private container: HTMLElement;
  private onDismiss: () => void;
  private currentCategory: DiscoveryCategory | 'Todas' = 'Todas';
  private searchQuery: string = '';

  private categories: (DiscoveryCategory | 'Todas')[] = [
    'Todas',
    'Tecnologías',
    'Agricultura',
    'Arquitectura',
    'Sociedad',
    'Astronomía',
    'Idiomas'
  ];

  constructor(container: HTMLElement, onDismiss: () => void = () => {}) {
    this.container = container;
    this.onDismiss = onDismiss;
  }

  private categoryLabel(category: DiscoveryCategory | 'Todas'): string {
    const keys: Record<string, Parameters<typeof t>[0]> = {
      Todas: 'journal.all',
      Tecnologías: 'journal.tech',
      Agricultura: 'journal.agriculture',
      Arquitectura: 'journal.architecture',
      Sociedad: 'journal.society',
      Astronomía: 'journal.astronomy',
      Idiomas: 'journal.languages'
    };
    return t(keys[category] || 'journal.all');
  }

  public show(): void {
    AudioManager.getInstance().playClick();
    this.render();
  }

  private render(): void {
    const state = GameState.getInstance();
    const unlockedIds = state.unlockedDiscoveryIds;
    const totalCount = ANDES_DISCOVERIES.length;
    const unlockedCount = ANDES_DISCOVERIES.filter((d) => unlockedIds.includes(d.id)).length;

    let filtered = ANDES_DISCOVERIES.filter((d) => {
      const matchCat = this.currentCategory === 'Todas' || d.category === this.currentCategory;
      const matchSearch =
        this.searchQuery.trim() === '' ||
        d.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        d.shortDescription.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    this.container.innerHTML = `
      <div class="journal-modal-overlay">
        <div class="journal-window">
          <div class="journal-header">
            <div>
              <span class="badge">${t('journal.badge')}</span>
              <h2>${t('journal.title')}</h2>
              <p class="journal-stats">${t('journal.count')}: <strong>${unlockedCount} / ${totalCount}</strong></p>
            </div>
            <button class="btn-close" id="btn-close-journal" aria-label="${t('settings.close')}">&times;</button>
          </div>

          <!-- Barra de Filtros e Busca -->
          <div class="journal-controls">
            <div class="journal-search-box">
              <input
                type="text"
                id="journal-search"
                placeholder="${t('journal.search')}"
                value="${this.searchQuery}"
              />
            </div>
            <div class="journal-category-chips">
              ${this.categories
                .map(
                  (cat) => `
                <button class="chip ${this.currentCategory === cat ? 'active' : ''}" data-cat="${cat}">
                  ${this.categoryLabel(cat)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Grade de Cartões do Diário -->
          <div class="journal-grid">
            ${
              filtered.length === 0
                ? `<div class="journal-empty">${t('journal.empty')}</div>`
                : filtered
                    .map((item) => {
                      const isUnlocked = unlockedIds.includes(item.id);
                      return `
                        <article class="journal-card ${isUnlocked ? 'unlocked' : 'locked'}" data-id="${item.id}">
                          <div class="journal-card-header">
                            <span class="card-cat-badge">${item.category}</span>
                            <span class="card-status-icon">${isUnlocked ? '✦' : '🔒'}</span>
                          </div>
                          <div class="journal-card-body">
                            <div class="journal-svg-icon">${item.iconSvg}</div>
                            <h3>${isUnlocked ? item.name : t('journal.locked')}</h3>
                            <p class="journal-card-desc">
                              ${isUnlocked ? item.shortDescription : `<em>${t('journal.hint')}: ${item.locationHint}</em>`}
                            </p>
                          </div>
                          ${
                            isUnlocked
                              ? `<button class="btn-read-more" data-read-id="${item.id}">${t('journal.read')} &rarr;</button>`
                              : ''
                          }
                        </article>
                      `;
                    })
                    .join('')
            }
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const closeBtn = this.container.querySelector('#btn-close-journal');
    closeBtn?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
      this.onDismiss();
    });

    const searchInput = this.container.querySelector('#journal-search') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value;
      this.render();
    });

    const chips = this.container.querySelectorAll('.journal-category-chips .chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', (e) => {
        const cat = (e.target as HTMLElement).getAttribute('data-cat') as any;
        this.currentCategory = cat;
        AudioManager.getInstance().playClick();
        this.render();
      });
    });

    const readMoreBtns = this.container.querySelectorAll('.btn-read-more');
    readMoreBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.target as HTMLElement).getAttribute('data-read-id');
        if (id) this.openDetailView(id);
      });
    });
  }

  private openDetailView(discoveryId: string): void {
    const item = ANDES_DISCOVERIES.find((d) => d.id === discoveryId);
    if (!item) return;

    const sources = item.sourceIds.map((id) => HISTORICAL_SOURCES[id]).filter(Boolean);

    const detailModal = document.createElement('div');
    detailModal.className = 'journal-detail-overlay';
    detailModal.innerHTML = `
      <div class="journal-detail-window">
        <div class="journal-detail-header">
          <div class="detail-cat-badge">${item.category}</div>
          <h2>${item.name}</h2>
          <button class="btn-close" id="btn-close-detail">&times;</button>
        </div>
        <div class="journal-detail-content">
          <div class="detail-full-text">
            ${item.fullContent
              .split('\n')
              .filter((l) => l.trim() !== '')
              .map((p) => `<p>${p}</p>`)
              .join('')}
          </div>

          ${
            item.curiosityFact
              ? `
            <div class="curiosity-box">
              <span class="curiosity-icon">💡</span>
              <div class="curiosity-text">
                <strong>${t('journal.didYouKnow')}</strong>
                <p>${item.curiosityFact}</p>
              </div>
            </div>
          `
              : ''
          }

          <div class="detail-sources-section">
            <h4>${t('journal.sources')}</h4>
            <div class="detail-sources-list">
              ${sources
                .map(
                  (s) => `
                <div class="source-item">
                  <strong>${s.title}</strong> (${s.year || 's/d'})<br/>
                  <small><em>${s.author}</em> — ${s.institutionOrPublisher || ''}</small>
                  ${s.url ? `<br/><a href="${s.url}" target="_blank" rel="noopener noreferrer">${t('journal.sourceLink')} &rarr;</a>` : ''}
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(detailModal);

    detailModal.querySelector('#btn-close-detail')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      detailModal.remove();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
