import { AudioManager } from '../engine/AudioManager';
import { HISTORICAL_SOURCES } from '../data/references/historicalSources';
import { getLanguage } from '../i18n';

export class AboutModal {
  private container: HTMLElement;
  private onDismiss: () => void;

  constructor(container: HTMLElement, onDismiss: () => void = () => {}) {
    this.container = container;
    this.onDismiss = onDismiss;
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
          title: 'Sobre ANCESTRIA y fuentes de pueblos originarios',
          close: 'Cerrar',
          purposeTitle: 'Propósito y metodología pedagógica',
          purposeP1: '<strong>ANCESTRIA</strong> es un espacio educativo interactivo diseñado para conocer saberes, tecnologías y memorias de pueblos originarios de las Américas sin tratarlos como una cultura homogénea ni reducirlos a estereotipos coloniales.',
          purposeP2: 'La experiencia se basa en relatos, investigaciones, tradiciones orales y fuentes documentadas por los propios pueblos y comunidades indígenas, complementadas con investigación arqueológica e histórica rigurosa.',
          careTitle: 'Cuidado ético y representación cultural',
          care1: '<strong>Pluralidad cultural:</strong> Pueblos mexicas, mayas, quechuas, aymaras, zapotecos, rarámuri, bribri, wayuu, warao, yanomami, guaraníes, tupinambá y xukuru poseen territorios, historias y cosmologías vivas propias.',
          care2: '<strong>Prioridad de fuentes indígenas:</strong> Se priorizan testimonios orales, escritos y producciones culturales de autores y organizaciones de pueblos originarios, evitando proyectar nociones externas.',
          care3: '<strong>Continuidad viva:</strong> Los pueblos originarios no pertenecen únicamente a museos arqueológicos; son sujetos contemporáneos que defienden sus lenguas, memorias y territorios.',
          sourcesTitle: 'Fuentes, bibliografía y registros patrimoniales',
          sourcesIntro: 'El contenido del juego se apoya en fuentes académicas, relatos comunitarios y patrimonios reconocidos:',
          authorLabel: 'Autoría / Comunidad:',
          pubLabel: 'Publicación / Institución:',
          linkText: 'Consultar fuente'
        }
      : lang === 'pt-BR'
      ? {
          badge: 'Compromisso ético e educacional',
          title: 'Sobre o ANCESTRIA e fontes de povos originários',
          close: 'Fechar',
          purposeTitle: 'Propósito e metodologia pedagógica',
          purposeP1: 'O <strong>ANCESTRIA</strong> é um espaço educativo interativo projetado para conhecer saberes, tecnologias e memórias de povos originários das Américas sem tratá-los como cultura homogênea nem reduzi-los a estereótipos coloniais.',
          purposeP2: 'A experiência apoia-se em relatos, pesquisas, tradições orais e fontes documentadas pelos próprios povos e comunidades indígenas, complementadas com arqueologia e história rigorosas.',
          careTitle: 'Cuidado ético e representação cultural',
          care1: '<strong>Pluralidade cultural:</strong> Povos mexicas, maias, quéchuas, aymaras, zapotecas, rarámuri, bribri, wayuu, warao, yanomami, guarani, tupinambá e xukuru possuem territórios, histórias e cosmologias vivas próprias.',
          care2: '<strong>Prioridade de fontes indígenas:</strong> Priorizam-se depoimentos orais, escritos e produções de autores e organizações dos povos originários, evitando projeções externas.',
          care3: '<strong>Continuidade viva:</strong> Os povos originários não pertencem unicamente a vitrines do passado; são sujeitos contemporâneos que afirmam suas línguas, memórias e territórios.',
          sourcesTitle: 'Fontes, bibliografia e registros patrimoniais',
          sourcesIntro: 'O conteúdo do jogo apoia-se em fontes acadêmicas, relatos comunitários e patrimônios reconhecidos:',
          authorLabel: 'Autoria / Comunidade:',
          pubLabel: 'Publicação / Instituição:',
          linkText: 'Consultar publicação'
        }
      : {
          badge: 'Ethical and educational commitment',
          title: 'About ANCESTRIA and Indigenous sources',
          close: 'Close',
          purposeTitle: 'Purpose and educational methodology',
          purposeP1: '<strong>ANCESTRIA</strong> is an interactive educational experience exploring indigenous knowledge, technologies, and memories across the Americas without homogenization or colonial tropes.',
          purposeP2: 'Gameplay is rooted in testimonies, oral histories, and documentation from Indigenous communities and authors themselves, alongside rigorous archaeological and historical research.',
          careTitle: 'Ethical care and cultural representation',
          care1: '<strong>Cultural diversity:</strong> Mexica, Maya, Quechua, Aymara, Zapotec, Rarámuri, Bribri, Wayuu, Warao, Yanomami, Guaraní, Tupinambá, and Xukuru peoples have distinct living histories and territories.',
          care2: '<strong>Prioritizing Indigenous voices:</strong> Indigenous testimonies, oral knowledge, and literature take priority, treating historical accounts with critical context.',
          care3: '<strong>Living continuity:</strong> Indigenous peoples are not confined to archaeological relics; they are contemporary peoples actively defending their languages, heritage, and territories.',
          sourcesTitle: 'Sources, bibliography, and cultural records',
          sourcesIntro: 'Educational content is grounded in scholarly research, community accounts, and documented heritage:',
          authorLabel: 'Author / Community:',
          pubLabel: 'Publication / Institution:',
          linkText: 'Explore source'
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
            <section class="about-section">
              <h3>${copy.purposeTitle}</h3>
              <p>${copy.purposeP1}</p>
              <p>${copy.purposeP2}</p>
            </section>

            <section class="about-section highlight-box">
              <h3>${copy.careTitle}</h3>
              <ul>
                <li>${copy.care1}</li>
                <li>${copy.care2}</li>
                <li>${copy.care3}</li>
              </ul>
            </section>

            <section class="about-section">
              <h3>${copy.sourcesTitle}</h3>
              <p class="section-lead">${copy.sourcesIntro}</p>
              
              <div class="references-grid">
                ${sources.map((s) => `
                  <div class="ref-card">
                    <div class="ref-top">
                      <span class="ref-type-tag">${s.type.replace('_', ' ').toUpperCase()}</span>
                      <span class="ref-year">${s.year || 's/d'}</span>
                    </div>
                    <h4 class="ref-title">${s.title}</h4>
                    <p class="ref-author"><strong>${copy.authorLabel}</strong> ${s.author}</p>
                    <p class="ref-pub"><strong>${copy.pubLabel}</strong> ${s.institutionOrPublisher || 'N/D'}</p>
                    ${s.notes ? `<p class="ref-notes">💡 <em>${s.notes}</em></p>` : ''}
                    ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="ref-link">${copy.linkText} &rarr;</a>` : ''}
                  </div>
                `).join('')}
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
      this.onDismiss();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
