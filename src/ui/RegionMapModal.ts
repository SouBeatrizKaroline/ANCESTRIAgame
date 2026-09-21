import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ALL_REGIONS } from '../data/regions';
import { CultureId, RegionId } from '../data/types';
import { getLanguage, t } from '../i18n';
import { ATLAS_SOURCE_URL, PEOPLE_CATALOG } from '../data/peopleCatalog';
import { JOURNEY_ORDER } from '../data/journeyProgress';

const REGION_COPY: Record<string, Record<RegionId, { name: string; subtitle: string; period: string; description: string }>> = {
  es: {
    mesoamerica: { name: 'Mesoamérica', subtitle: 'Cuenca lacustre y selvas', period: 'c. 1325 – 1521 d.C.', description: 'Tecnologías lacustres, chinampas, calzadas y observación astronómica entre lagos y volcanes.' },
    andes: { name: 'Andes Centrales', subtitle: 'Valle Sagrado y punas', period: 'c. 1438 – 1533 d.C.', description: 'Caminos del Qhapaq Ñan, andenes escalonados, khipus y arquitectura sismorresistente.' },
    amazonia: { name: 'Amazonía Ancestral', subtitle: 'Cuenca del Amazonas y ríos', period: 'c. 500 – 1500 d.C.', description: 'Manejo agroforestal milenario, suelos de Terra Preta, cerámicas y aldeas fluviales.' },
    territorios_brasil: { name: 'Territorios de Pindorama', subtitle: 'Costa atlántica y bosques', period: 'Milenios de presencia viva', description: 'Saberes botánicos, fitoterapia, arquitectura de malocas y cosmovisiones de reciprocidad con la naturaleza.' }
  },
  'pt-BR': {
    mesoamerica: { name: 'Mesoamérica', subtitle: 'Bacia lacustre e florestas', period: 'c. 1325 – 1521 d.C.', description: 'Tecnologias lacustres, chinampas, calçadas e observação astronômica entre lagos e vulcões.' },
    andes: { name: 'Andes Centrais', subtitle: 'Vale Sagrado e punas', period: 'c. 1438 – 1533 d.C.', description: 'Caminhos do Qhapaq Ñan, andenes em socalcos, quipus e arquitetura sismorresistente.' },
    amazonia: { name: 'Amazônia Ancestral', subtitle: 'Bacia amazônica e hidrovias', period: 'c. 500 – 1500 d.C.', description: 'Manejo agroflorestal milenar, solos de Terra Preta de Índio, cerâmicas e aldeias circulares.' },
    territorios_brasil: { name: 'Territórios de Pindorama', subtitle: 'Costa atlântica e matas', period: 'Milênios de presença viva', description: 'Saberes botânicos, fitoterapia, arquitetura comunitária e cosmologias de reciprocidade com a terra.' }
  },
  en: {
    mesoamerica: { name: 'Mesoamerica', subtitle: 'Lake basins and rainforests', period: 'c. 1325 – 1521 CE', description: 'Wetland engineering, chinampas, causeways, and astronomical observation across lakes and volcanic valleys.' },
    andes: { name: 'Central Andes', subtitle: 'Sacred Valley and highlands', period: 'c. 1438 – 1533 CE', description: 'Qhapaq Ñan roadways, stone terrace systems, khipu records, and seismic-resistant masonry.' },
    amazonia: { name: 'Ancestral Amazonia', subtitle: 'Amazon Basin waterways', period: 'c. 500 – 1500 CE', description: 'Centuries of forest stewardship, anthropic Terra Preta soils, ceramic arts, and riverine settlements.' },
    territorios_brasil: { name: 'Territories of Pindorama', subtitle: 'Atlantic coasts and woodlands', period: 'Millennia of living presence', description: 'Botanical science, traditional pharmacology, communal architectures, and living relationships with the land.' }
  }
};

export class RegionMapModal {
  private container: HTMLElement;
  private onSelectRegion: (regionId: RegionId) => void;
  private onSelectCulture: (cultureId: CultureId) => void;
  private onExploreCulture: (cultureId: CultureId) => void;
  private onDismiss: () => void;
  private activeView: 'territories' | 'peoples' = 'territories';
  private selectedProfile: CultureId | null = null;

  constructor(
    container: HTMLElement,
    onSelectRegion: (regionId: RegionId) => void,
    onSelectCulture: (cultureId: CultureId) => void,
    onExploreCulture: (cultureId: CultureId) => void,
    onDismiss: () => void = () => {}
  ) {
    this.container = container;
    this.onSelectRegion = onSelectRegion;
    this.onSelectCulture = onSelectCulture;
    this.onExploreCulture = onExploreCulture;
    this.onDismiss = onDismiss;
  }

  public show(): void {
    AudioManager.getInstance().playClick();
    this.render();
  }

  private render(): void {
    const state = GameState.getInstance();
    const fragments = state.knowledgeFragments;
    const regions = Object.values(ALL_REGIONS);
    const lang = getLanguage();
    const labels = lang === 'es'
      ? { territories: 'Mapa de territorios', peoples: 'Biblioteca de pueblos', living: 'Pueblo contemporáneo', historical: 'Formación histórica', language: 'Lenguas', source: 'Fuente panorámica', caution: 'Consulta libre: estas fichas no dependen del progreso del juego. Cada una diferencia territorio, lenguas, contexto y continuidad.', consult: 'Consultar ficha', back: 'Volver a la biblioteca', context: 'Contexto y cuidado editorial', principle: 'Esta ficha es un punto de partida. Un recorrido cultural más específico debe priorizar voces, autorías y organizaciones indígenas del pueblo correspondiente.', play: 'Explorar prototipo 3D', learn: 'Abrir recorrido educativo', requires: 'Completa primero' }
      : lang === 'pt-BR'
      ? { territories: 'Mapa de territórios', peoples: 'Biblioteca de povos', living: 'Povo contemporâneo', historical: 'Formação histórica', language: 'Línguas', source: 'Fonte panorâmica', caution: 'Consulta livre: estas fichas não dependem do progresso do jogo. Cada uma diferencia território, línguas, contexto e continuidade.', consult: 'Consultar ficha', back: 'Voltar à biblioteca', context: 'Contexto e cuidado editorial', principle: 'Esta ficha é um ponto de partida. Um percurso cultural mais específico deve priorizar vozes, autorias e organizações indígenas do povo correspondente.', play: 'Explorar protótipo 3D', learn: 'Abrir percurso educativo', requires: 'Conclua primeiro' }
      : { territories: 'Territory map', peoples: 'Peoples library', living: 'Contemporary people', historical: 'Historical formation', language: 'Languages', source: 'Overview source', caution: 'Open reference: these profiles do not depend on game progress. Each distinguishes territory, languages, context, and continuity.', consult: 'View profile', back: 'Back to library', context: 'Context and editorial care', principle: 'This profile is a starting point. A more specific cultural journey must prioritize Indigenous voices, authors, and organizations from the corresponding people.', play: 'Explore 3D prototype', learn: 'Open learning journey', requires: 'Complete first' };

    const selected = this.selectedProfile ? PEOPLE_CATALOG.find((item) => item.id === this.selectedProfile) : null;

    this.container.innerHTML = `
      <div class="atlas-modal-overlay">
        <div class="atlas-window">
          <div class="atlas-header">
            <div>
              <span class="badge">${t('atlas.badge')}</span>
              <h2>ANCESTRIA</h2>
              <p class="atlas-subtitle">${t('atlas.subtitle')}</p>
            </div>
            <button class="btn-close" id="btn-close-atlas" aria-label="${t('settings.close')}">&times;</button>
          </div>

          <div class="atlas-map-visual">
            <div class="atlas-map-banner">
              <nav class="atlas-view-tabs" aria-label="Modo de visualización">
                <button class="${this.activeView === 'territories' ? 'active' : ''}" data-atlas-view="territories">${labels.territories}</button>
                <button class="${this.activeView === 'peoples' ? 'active' : ''}" data-atlas-view="peoples">${labels.peoples}</button>
              </nav>
              <span class="fragments-pill">✨ ${t('atlas.fragments')}: <strong>${fragments}</strong></span>
            </div>
            ${this.activeView === 'territories' ? `
              <div class="region-cards-grid">
                ${regions.map((r) => {
                  const copy = REGION_COPY[lang]?.[r.id] || REGION_COPY.es[r.id];
                  const isAvailable = r.id === 'mesoamerica' || r.id === 'andes';
                  return `
                    <div class="region-card ${r.status} ${isAvailable ? 'unlocked' : 'locked'}">
                      <div class="region-card-top">
                        <span class="region-status-badge ${r.status}">
                          ${isAvailable ? (lang === 'es' ? 'Jugable' : lang === 'pt-BR' ? 'Jogável' : 'Playable') : (lang === 'es' ? 'En expansión' : lang === 'pt-BR' ? 'Em expansão' : 'In development')}
                        </span>
                        <span class="region-period">${copy.period}</span>
                      </div>
                      <h3>${copy.name}</h3>
                      <p class="region-subtitle">${copy.subtitle}</p>
                      <p class="region-desc">${copy.description}</p>
                      <div class="region-action">
                        ${isAvailable ? `
                          <button class="btn-primary btn-enter-region" data-region-id="${r.id}">
                            ${t('atlas.explore')} &rarr;
                          </button>
                        ` : `
                          <button class="btn-secondary btn-locked-region" disabled>
                            ${t('atlas.soon')}
                          </button>
                        `}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : selected ? `
              <article class="atlas-profile-reader">
                <button class="atlas-reader-back" id="atlas-profile-back">&larr; ${labels.back}</button>
                <div class="atlas-reader-hero">
                  <span class="region-status-badge">${selected.kind === 'living' ? labels.living : labels.historical}</span>
                  <h3>${selected.name[lang]}</h3>
                  <p>📍 ${selected.territory[lang]}</p>
                </div>
                <div class="atlas-reader-columns">
                  <section>
                    <span class="badge">${labels.context}</span>
                    <p>${selected.summary[lang]}</p>
                  </section>
                  <section>
                    <strong>${labels.language}</strong>
                    <p>${selected.languages[lang]}</p>
                    <aside>${labels.principle}</aside>
                  </section>
                </div>
                <div class="prototype-complete-actions" style="margin-top: 18px;">
                  <button class="btn-menu-primary btn-enter-culture" data-culture-id="${selected.id}">${labels.play} &rarr;</button>
                  <button class="btn-menu-option btn-learn-culture" data-culture-id="${selected.id}">${labels.learn} &rarr;</button>
                </div>
                <a class="atlas-source-link" href="${ATLAS_SOURCE_URL}" target="_blank" rel="noopener noreferrer">${labels.source}: Atlas sociolingüístico UNICEF / FUNPROEIB Andes ↗</a>
              </article>
            ` : `
              <p class="people-catalog-caution">${labels.caution}</p>
              <div class="people-library-grid">
                ${JOURNEY_ORDER.map((cultureId) => {
                  const person = PEOPLE_CATALOG.find((item) => item.id === cultureId)!;
                  return `
                    <article class="people-library-card">
                      <div class="people-card-top">
                        <span class="region-status-badge">${person.kind === 'living' ? labels.living : labels.historical}</span>
                        <span aria-hidden="true">${person.kind === 'living' ? '●' : '◆'}</span>
                      </div>
                      <h3>${person.name[lang]}</h3>
                      <p class="people-territory">📍 ${person.territory[lang]}</p>
                      <button class="atlas-consult-button" data-profile-id="${person.id}">${labels.consult} &rarr;</button>
                    </article>
                  `;
                }).join('')}
              </div>
              <a class="atlas-source-link" href="${ATLAS_SOURCE_URL}" target="_blank" rel="noopener noreferrer">${labels.source}: Atlas sociolingüístico UNICEF / FUNPROEIB Andes ↗</a>
            `}
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
      this.onDismiss();
    });

    const enterBtns = this.container.querySelectorAll('.btn-enter-region');
    enterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const regionId = target.getAttribute('data-region-id') as RegionId;
        AudioManager.getInstance().playClick();
        this.close();
        this.onSelectRegion(regionId);
      });
    });

    this.container.querySelectorAll<HTMLButtonElement>('[data-atlas-view]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeView = button.dataset.atlasView as 'territories' | 'peoples';
        this.selectedProfile = null;
        AudioManager.getInstance().playClick();
        this.render();
      });
    });

    this.container.querySelectorAll<HTMLButtonElement>('[data-profile-id]').forEach((button) => {
      button.addEventListener('click', () => {
        this.selectedProfile = button.dataset.profileId as CultureId;
        AudioManager.getInstance().playClick();
        this.render();
      });
    });

    this.container.querySelector('#atlas-profile-back')?.addEventListener('click', () => {
      this.selectedProfile = null;
      AudioManager.getInstance().playClick();
      this.render();
    });

    this.container.querySelectorAll<HTMLButtonElement>('.btn-enter-culture').forEach((button) => {
      button.addEventListener('click', () => {
        const cultureId = button.dataset.cultureId as CultureId;
        AudioManager.getInstance().playClick();
        this.close();
        this.onSelectCulture(cultureId);
      });
    });

    this.container.querySelectorAll<HTMLButtonElement>('.btn-learn-culture').forEach((button) => {
      button.addEventListener('click', () => {
        const cultureId = button.dataset.cultureId as CultureId;
        AudioManager.getInstance().playClick();
        this.close();
        this.onExploreCulture(cultureId);
      });
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
