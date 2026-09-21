import { AudioManager } from '../engine/AudioManager';
import { HISTORICAL_SOURCES } from '../data/references/historicalSources';
import { getLanguage } from '../i18n';

export class AboutModal {
  private container: HTMLElement;
  private onBack: () => void;

  constructor(container: HTMLElement, onBack: () => void = () => {}) {
    this.container = container;
    this.onBack = onBack;
  }

  public show(): void {
    AudioManager.getInstance().playClick();
    this.render();
  }

  private render(): void {
    const sources = Object.values(HISTORICAL_SOURCES);
    const lang = getLanguage();

    const copy = lang === 'es'
      ? {
          badge: 'Compromiso ético y educativo',
          title: 'Sobre ANCESTRIA y la responsabilidad histórica',
          close: 'Cerrar',
          purposeTitle: 'Propósito y metodología pedagógica',
          purpose1: '<strong>ANCESTRIA</strong> nació para conocer y celebrar las memorias, tecnologías, cosmologías y saberes de los pueblos originarios de las Américas, libres de estereotipos colonialistas y reconociendo su protagonismo científico, arquitectónico y social.',
          purpose2: 'El aprendizaje se construye a través de la exploración interactiva: comprender el manejo del agua en las chinampas, descifrar la matemática decimal de los khipus, admirar la cantería sismorresistente andina y vivenciar el valor humano de la reciprocidad comunitaria (Ayni y Minka).',
          ethicsTitle: 'Cuidado ético y representación cultural',
          pluralityLabel: 'Pluralidad de pueblos originarios:',
          pluralityText: 'Mexicas, pueblos andinos, quechuas, aymaras, mayas, pueblos amazónicos, zapotecos, rarámuri, bribri, wayuu, warao, yanomami, guaraníes, tupinambás y xukuru poseen historias, lenguas y cosmologías propias. No formaban ni forman una cultura homogénea.',
          sourcesLabel: 'Prioridad de fuentes indígenas:',
          sourcesText: 'Damos prioridad a testimonios, crónicas, literatura oral, artículos y organizaciones de los propios pueblos originarios. Los registros del periodo colonial se analizan con mirada crítica y contextualizada.',
          honestyLabel: 'Honestidad histórica y debate científico:',
          honestyText: 'Las evidencias arqueológicas, la memoria viva y los debates historiográficos se presentan con rigor y transparencia, sin dogmatismos.',
          catalogTitle: 'Relatos, artículos y fuentes de pueblos originarios',
          catalogLead: 'Todo el contenido del juego está fundamentado en crónicas originarias, investigaciones académicas situadas, testimonios indígenas y registros comunitarios vivos:',
          authorLabel: 'Autoría / Pueblo:',
          pubLabel: 'Institución / Publicación:',
          linkText: 'Consultar fuente →',
          noDate: 's/f'
        }
      : lang === 'pt-BR'
        ? {
            badge: 'Compromisso ético e educacional',
            title: 'Sobre o ANCESTRIA e a responsabilidade histórica',
            close: 'Fechar',
            purposeTitle: 'Propósito e metodologia pedagógica',
            purpose1: 'O <strong>ANCESTRIA</strong> nasceu para conhecer e valorizar as memórias, tecnologias, cosmologias e saberes dos povos originários das Américas, sem estereótipos colonialistas e reconhecendo seu protagonismo científico, arquitetônico e social.',
            purpose2: 'A aprendizagem se constrói através da exploração interativa: compreender o manejo da água nas chinampas, decifrar a matemática decimal dos quipus, admirar a cantaria sismorresistente andina e vivenciar o valor humano da reciprocidade comunitária (Ayni e Minka).',
            ethicsTitle: 'Cuidados éticos e representação cultural',
            pluralityLabel: 'Pluralidade dos povos originários:',
            pluralityText: 'Mexicas, povos andinos, quéchuas, aymaras, maias, povos amazônicos, zapotecos, rarámuri, bribri, wayuu, warao, yanomami, guaranis, tupinambás e xukuru possuem histórias, línguas e cosmologias próprias. Não formavam nem formam uma cultura homogênea.',
            sourcesLabel: 'Prioridade para fontes indígenas:',
            sourcesText: 'Priorizamos relatos, crônicas, literatura oral, artigos e organizações dos próprios povos originários. Documentos coloniais são analisados criticamente em seu contexto.',
            honestyLabel: 'Honestidade histórica e debate científico:',
            honestyText: 'As evidências arqueológicas, a memória viva e os debates historiográficos são apresentados com rigor e transparência, sem dogmatismos.',
            catalogTitle: 'Relatos, artigos e fontes de povos originários',
            catalogLead: 'Todo o conteúdo do jogo está fundamentado em crônicas originárias, pesquisas acadêmicas situadas, depoimentos indígenas e registros comunitários vivos:',
            authorLabel: 'Autoria / Povo:',
            pubLabel: 'Instituição / Publicação:',
            linkText: 'Consultar publicação →',
            noDate: 's/d'
          }
        : {
            badge: 'Ethical and educational commitment',
            title: 'About ANCESTRIA and historical responsibility',
            close: 'Close',
            purposeTitle: 'Educational purpose and methodology',
            purpose1: '<strong>ANCESTRIA</strong> was created to explore and celebrate the memories, technologies, cosmologies, and knowledge of Indigenous peoples of the Americas, rejecting colonial stereotypes and highlighting their scientific, architectural, and social agency.',
            purpose2: 'Learning unfolds through interactive exploration: understanding chinampa wetland hydrology, reading the decimal mathematics of khipus, studying seismic-resistant stone masonry, and experiencing the human value of community reciprocity (Ayni and Minka).',
            ethicsTitle: 'Ethical care and cultural representation',
            pluralityLabel: 'Plurality of Indigenous peoples:',
            pluralityText: 'Mexica, Andean peoples, Quechua, Aymara, Maya, Amazonian peoples, Zapotec, Rarámuri, Bribri, Wayuu, Warao, Yanomami, Guaraní, Tupinambá, and Xukuru carry their own distinct histories, languages, and cosmologies. They never formed a single homogeneous culture.',
            sourcesLabel: 'Priority for Indigenous sources:',
            sourcesText: 'We prioritize accounts, chronicles, oral literature, articles, and organizations created by Indigenous peoples themselves. Colonial records are contextualized with critical care.',
            honestyLabel: 'Historical honesty and open debate:',
            honestyText: 'Archaeological evidence, living community memory, and historiographical debates are shared transparently without dogmatism.',
            catalogTitle: 'Narratives, articles, and Indigenous sources',
            catalogLead: 'All game content is rooted in Indigenous chronicles, situated research, native testimonies, and living community records:',
            authorLabel: 'Authorship / People:',
            pubLabel: 'Institution / Publication:',
            linkText: 'Consult source →',
            noDate: 'n/d'
          };

    this.container.innerHTML = `
      <div class="about-modal-overlay">
        <div class="about-window">
          <div class="about-header">
            <div>
              <span class="badge">${copy.badge}</span>
              <h2>${copy.title}</h2>
            </div>
            <button class="btn-close" id="btn-close-about" aria-label="${copy.close}">&times;</button>
          </div>

          <div class="about-body">
            <!-- Manifesto Pedagógico -->
            <section class="about-section">
              <h3>${copy.purposeTitle}</h3>
              <p>${copy.purpose1}</p>
              <p>${copy.purpose2}</p>
            </section>

            <!-- Cuidados com Representação Cultural -->
            <section class="about-section highlight-box">
              <h3>${copy.ethicsTitle}</h3>
              <ul>
                <li><strong>${copy.pluralityLabel}</strong> ${copy.pluralityText}</li>
                <li><strong>${copy.sourcesLabel}</strong> ${copy.sourcesText}</li>
                <li><strong>${copy.honestyLabel}</strong> ${copy.honestyText}</li>
              </ul>
            </section>

            <!-- Catálogo de Fontes e Referências -->
            <section class="about-section">
              <h3>${copy.catalogTitle}</h3>
              <p class="section-lead">${copy.catalogLead}</p>
              
              <div class="references-grid">
                ${sources
                  .map(
                    (s) => `
                  <div class="ref-card">
                    <div class="ref-top">
                      <span class="ref-type-tag">${s.type.replace('_', ' ').toUpperCase()}</span>
                      <span class="ref-year">${s.year || copy.noDate}</span>
                    </div>
                    <h4 class="ref-title">${s.title}</h4>
                    <p class="ref-author"><strong>${copy.authorLabel}</strong> ${s.author}</p>
                    <p class="ref-pub"><strong>${copy.pubLabel}</strong> ${s.institutionOrPublisher || 'N/D'}</p>
                    ${s.notes ? `<p class="ref-notes">💡 <em>${s.notes}</em></p>` : ''}
                    ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="ref-link">${copy.linkText}</a>` : ''}
                  </div>
                `
                  )
                  .join('')}
              </div>
            </section>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    this.container.querySelector('#btn-close-about')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      this.close();
      this.onBack();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
