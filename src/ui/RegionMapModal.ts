import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';
import { ALL_REGIONS } from '../data/regions';
import { CultureId, RegionId } from '../data/types';
import { getLanguage, t } from '../i18n';
import { ATLAS_SOURCE_URL, PEOPLE_CATALOG } from '../data/peopleCatalog';
import { getJourneyProgress, JOURNEY_ORDER, journeyName } from '../data/journeyProgress';

const REGION_COPY: Record<string, Record<RegionId, { name: string; subtitle: string; period: string; description: string }>> = {
  es: {
    andes: { name: 'Andes: Valle Sagrado y Tawantinsuyu', subtitle: 'Ingeniería de altura, Qhapaq Ñan y diversidad de pisos ecológicos', period: 'c. 1470 d. C. · apogeo del Tawantinsuyu', description: 'Un valle de terrazas agrícolas, canales, depósitos qullqa y caminos que conectaron comunidades andinas diversas.' },
    mesoamerica: { name: 'Mesoamérica: ciudades del bosque y del lago', subtitle: 'Recorridos separados para pueblos mayas y Mexica', period: 'Periodos Clásico y Posclásico', description: 'Territorios diversos que no se presentan como una cultura única: ciudades mayas y el paisaje lacustre de Mexico-Tenochtitlan tendrán voces y fuentes propias.' },
    amazonia: { name: 'Amazonía: bosques cultivados y pueblos de las aguas', subtitle: 'Suelos antrópicos, redes fluviales y memorias vivas', period: 'Historias milenarias y continuidad contemporánea', description: 'Un futuro recorrido construido con pueblos y fuentes indígenas específicas, sin reducir la Amazonía a una sola identidad.' },
    territorios_brasil: { name: 'Territorios indígenas del actual Brasil', subtitle: 'Pueblos, lenguas y biomas diversos', period: 'Ancestralidad y presencia contemporánea', description: 'Cada incorporación identificará al pueblo, territorio, fuentes y voces correspondientes, evitando categorías homogeneizadoras.' }
  },
  'pt-BR': {
    andes: { name: 'Andes: Vale Sagrado e Tawantinsuyu', subtitle: 'Engenharia de altitude, Qhapaq Ñan e diversidade de pisos ecológicos', period: 'c. 1470 d.C. · auge do Tawantinsuyu', description: 'Um vale de terraços agrícolas, canais, depósitos qullqa e caminhos que conectaram diferentes comunidades andinas.' },
    mesoamerica: { name: 'Mesoamérica: cidades da floresta e do lago', subtitle: 'Percursos separados para povos maias e Mexica', period: 'Períodos Clássico e Pós-Clássico', description: 'Territórios diversos que não são apresentados como cultura única: cidades maias e a paisagem lacustre de Mexico-Tenochtitlan terão vozes e fontes próprias.' },
    amazonia: { name: 'Amazônia: florestas cultivadas e povos das águas', subtitle: 'Solos antrópicos, redes fluviais e memórias vivas', period: 'Histórias milenares e continuidade contemporânea', description: 'Um futuro percurso construído com povos e fontes indígenas específicas, sem reduzir a Amazônia a uma única identidade.' },
    territorios_brasil: { name: 'Territórios indígenas do atual Brasil', subtitle: 'Povos, línguas e biomas diversos', period: 'Ancestralidade e presença contemporânea', description: 'Cada inclusão identificará o povo, o território, as fontes e as vozes correspondentes, evitando categorias homogeneizadoras.' }
  },
  en: {
    andes: { name: 'Andes: Sacred Valley and Tawantinsuyu', subtitle: 'High-altitude engineering, Qhapaq Ñan, and ecological diversity', period: 'c. 1470 CE · height of Tawantinsuyu', description: 'A valley of agricultural terraces, canals, qullqa storehouses, and roads connecting diverse Andean communities.' },
    mesoamerica: { name: 'Mesoamerica: forest and lake cities', subtitle: 'Separate journeys for Maya peoples and the Mexica', period: 'Classic and Postclassic periods', description: 'Distinct territories are not presented as one culture: Maya cities and Mexico-Tenochtitlan’s lake landscape will have their own voices and sources.' },
    amazonia: { name: 'Amazonia: cultivated forests and river peoples', subtitle: 'Anthropic soils, river networks, and living memories', period: 'Millennia of history and living continuity', description: 'A future journey built with specific Indigenous peoples and sources, without reducing Amazonia to a single identity.' },
    territorios_brasil: { name: 'Indigenous territories in present-day Brazil', subtitle: 'Distinct peoples, languages, and biomes', period: 'Ancestral histories and living presence', description: 'Each addition will identify its people, territory, sources, and voices, avoiding homogenizing categories.' }
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

  constructor(container: HTMLElement, onSelectRegion: (regionId: RegionId) => void, onSelectCulture: (cultureId: CultureId) => void, onExploreCulture: (cultureId: CultureId) => void, onDismiss: () => void = () => {}) {
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
      ? { territories:'Mapa de territorios', peoples:'Biblioteca de pueblos', living:'Pueblo contemporáneo', historical:'Formación histórica', language:'Lenguas', source:'Fuente panorámica', caution:'Consulta libre: estas fichas no dependen del progreso del juego. Cada una diferencia territorio, lenguas, contexto y continuidad.', consult:'Consultar ficha', back:'Volver a la biblioteca', context:'Contexto y cuidado editorial', principle:'Esta ficha es un punto de partida. Un recorrido cultural más específico debe priorizar voces, autorías y organizaciones indígenas del pueblo correspondiente.', requires:'Completa primero' }
      : lang === 'pt-BR'
        ? { territories:'Mapa de territórios', peoples:'Biblioteca de povos', living:'Povo contemporâneo', historical:'Formação histórica', language:'Línguas', source:'Fonte panorâmica', caution:'Consulta livre: estas fichas não dependem do progresso do jogo. Cada uma diferencia território, línguas, contexto e continuidade.', consult:'Consultar ficha', back:'Voltar à biblioteca', context:'Contexto e cuidado editorial', principle:'Esta ficha é um ponto de partida. Um percurso cultural mais específico deve priorizar vozes, autorias e organizações indígenas do povo correspondente.', requires:'Conclua primeiro' }
        : { territories:'Territory map', peoples:'Peoples library', living:'Contemporary people', historical:'Historical formation', language:'Languages', source:'Overview source', caution:'Open reference: these profiles do not depend on game progress. Each distinguishes territory, languages, context, and continuity.', consult:'View profile', back:'Back to library', context:'Context and editorial care', principle:'This profile is a starting point. A more specific cultural journey must prioritize Indigenous voices, authors, and organizations from the corresponding people.', requires:'Complete first' };

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
              <nav class="atlas-view-tabs"><button class="${this.activeView === 'territories' ? 'active' : ''}" data-atlas-view="territories">${labels.territories}</button><button class="${this.activeView === 'peoples' ? 'active' : ''}" data-atlas-view="peoples">${labels.peoples}</button></nav>
              <span class="fragments-pill">✨ ${t('atlas.fragments')}: <strong>${fragments}</strong></span>
            </div>
            ${this.activeView === 'territories' ? `<div class="region-cards-grid">
              ${regions
                .map((r) => {
                  const copy = REGION_COPY[getLanguage()][r.id];
                  const isUnlocked = state.unlockedRegionIds.includes(r.id);
                  const journey = r.id === 'andes' ? getJourneyProgress('inca', state.unlockedDiscoveryIds, state.selectedCultureId) : null;
                  const isAvailable = r.status === 'disponivel' && (!journey || journey.unlocked);
                  const canUnlock = fragments >= r.unlockRequirementFragments;

                  return `
                  <div class="region-card ${r.status} ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="region-card-top">
                      <span class="region-status-badge ${r.status}">
                        ${isAvailable ? t('atlas.playable') : t('atlas.expansion')}
                      </span>
                      <span class="region-period">${copy.period}</span>
                    </div>

                    <h3 class="region-title">${copy.name}</h3>
                    <p class="region-subtitle"><em>${copy.subtitle}</em></p>
                    <p class="region-desc">${copy.description}</p>

                    <div class="region-meta">
                      <span>👤 ${r.npcCount} ${t('atlas.characters')}</span>
                      <span>📜 ${r.discoveriesCount} ${t('atlas.discoveries')}</span>
                    </div>

                    <div class="region-action">
                      ${
                        isAvailable
                          ? `
                        <button class="btn-primary btn-enter-region" data-region-id="${r.id}">
                          ${t('atlas.explore')} &rarr;
                        </button>
                      `
                          : r.status === 'disponivel' && journey ? `<button class="btn-secondary btn-locked-region" disabled>🔒 ${labels.requires}: ${journeyName('mexica', lang)}</button>` : `
                        <button class="btn-secondary btn-locked-region" disabled>
                          ${canUnlock ? t('atlas.soon') : `${t('atlas.requires')} ${r.unlockRequirementFragments} ${t('hud.fragments').toLowerCase()}`}
                        </button>
                      `
                      }
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>` : selected ? `<article class="atlas-profile-reader"><button class="atlas-reader-back" id="atlas-profile-back">← ${labels.back}</button><div class="atlas-reader-hero"><span class="region-status-badge">${selected.kind === 'living' ? labels.living : labels.historical}</span><h3>${selected.name[lang]}</h3><p>📍 ${selected.territory[lang]}</p></div><div class="atlas-reader-columns"><section><span class="badge">${labels.context}</span><p>${selected.summary[lang]}</p></section><section><strong>${labels.language}</strong><p>${selected.languages[lang]}</p><aside>${labels.principle}</aside></section></div><a class="atlas-source-link" href="${ATLAS_SOURCE_URL}" target="_blank" rel="noopener noreferrer">${labels.source}: Atlas sociolingüístico UNICEF / FUNPROEIB Andes ↗</a></article>` : `<p class="people-catalog-caution">${labels.caution}</p><div class="people-library-grid">${JOURNEY_ORDER.map((cultureId) => {
              const person=PEOPLE_CATALOG.find((item)=>item.id===cultureId)!;
              return `<article class="people-library-card"><div class="people-card-top"><span class="region-status-badge">${person.kind === 'living' ? labels.living : labels.historical}</span><span aria-hidden="true">${person.kind === 'living' ? '●' : '◆'}</span></div><h3>${person.name[lang]}</h3><p class="people-territory">📍 ${person.territory[lang]}</p><button class="atlas-consult-button" data-profile-id="${person.id}">${labels.consult} →</button></article>`;
            }).join('')}</div><a class="atlas-source-link" href="${ATLAS_SOURCE_URL}" target="_blank" rel="noopener noreferrer">${labels.source}: Atlas sociolingüístico UNICEF / FUNPROEIB Andes ↗</a>`}
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
      btn.addEventListener('click', () => {
        AudioManager.getInstance().playClick();
        const regionId = btn.getAttribute('data-region-id') as RegionId;
        this.close();
        this.onSelectRegion(regionId);
      });
    });
    this.container.querySelectorAll<HTMLButtonElement>('[data-atlas-view]').forEach((button) => button.addEventListener('click', () => { this.activeView = button.dataset.atlasView as 'territories' | 'peoples'; this.selectedProfile = null; AudioManager.getInstance().playClick(); this.render(); }));
    this.container.querySelectorAll<HTMLButtonElement>('[data-profile-id]').forEach((button) => button.addEventListener('click', () => { this.selectedProfile = button.dataset.profileId as CultureId; AudioManager.getInstance().playClick(); this.render(); }));
    this.container.querySelector('#atlas-profile-back')?.addEventListener('click', () => { this.selectedProfile = null; AudioManager.getInstance().playClick(); this.render(); });
    this.container.querySelectorAll<HTMLButtonElement>('.btn-enter-culture').forEach((button) => button.addEventListener('click', () => {
      const cultureId = button.dataset.cultureId as CultureId; AudioManager.getInstance().playClick(); this.close(); this.onSelectCulture(cultureId);
    }));
    this.container.querySelectorAll<HTMLButtonElement>('.btn-learn-culture').forEach((button) => button.addEventListener('click', () => {
      const cultureId = button.dataset.cultureId as CultureId; AudioManager.getInstance().playClick(); this.close(); this.onExploreCulture(cultureId);
    }));
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
