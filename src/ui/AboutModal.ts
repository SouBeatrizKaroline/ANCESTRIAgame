import { AudioManager } from '../engine/AudioManager';
import { HISTORICAL_SOURCES } from '../data/references/historicalSources';

export class AboutModal {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public show(): void {
    AudioManager.getInstance().playClick();
    this.render();
  }

  private render(): void {
    const sources = Object.values(HISTORICAL_SOURCES);

    this.container.innerHTML = `
      <div class="about-modal-overlay">
        <div class="about-window">
          <div class="about-header">
            <div>
              <span class="badge">Compromisso Ético & Educacional</span>
              <h2>Sobre o Projeto & Responsabilidade Histórica</h2>
            </div>
            <button class="btn-close" id="btn-close-about" aria-label="Fechar">&times;</button>
          </div>

          <div class="about-body">
            <!-- Manifesto Pedagógico -->
            <section class="about-section">
              <h3>Propósito e Metodologia Pedagógica</h3>
              <p>O <strong>Atlas das Origens</strong> nasceu para transformar a maneira como compreendemos as civilizações e os povos originários das Américas. Longe de tratar esses povos sob estereótipos colonialistas, o jogo propõe uma imersão ativa no protagonismo técnico, científico e social de cada cultura.</p>
              <p>O jogador não apenas lê textos: ele manuseia terraços ecológicos, compreende a matemática posicional decimal dos quipus, analisa as juntas de cantaria sismorresistente e vivencia o valor humano do trabalho comunitário (Ayni e Minka).</p>
            </section>

            <!-- Cuidados com Representação Cultural -->
            <section class="about-section highlight-box">
              <h3>Cuidados Éticos com a Representação Cultural</h3>
              <ul>
                <li><strong>Diversidade Absoluta:</strong> Incas, Maias, Mexicas, povos amazônicos e indígenas do Brasil não formavam uma única cultura homogênea. Cada um possui história, cosmologia, tecnologias e línguas próprias.</li>
                <li><strong>Rejeição de Estereótipos:</strong> Evitamos caricaturas e representações que associem povos indígenas ao atraso tecnológico. A engenharia andina de estradas e os solos antrópicos da Amazônia rivalizavam e frequentemente superavam conhecimentos da Europa contemporânea.</li>
                <li><strong>Ceticismo Científico & Honestidade Histórica:</strong> Quando há debates arqueológicos em aberto (como o papel narrativo ou fonético dos quipus, ou a extensão populacional de Tenochtitlan), apresentamos as evidências sem dogmatismos.</li>
              </ul>
            </section>

            <!-- Catálogo de Fontes e Referências -->
            <section class="about-section">
              <h3>Fontes, Bibliografia e Registros Arqueológicos</h3>
              <p class="section-lead">Todo o conteúdo do jogo está fundamentado em pesquisas acadêmicas, museus e crônicas documentadas:</p>
              
              <div class="references-grid">
                ${sources
                  .map(
                    (s) => `
                  <div class="ref-card">
                    <div class="ref-top">
                      <span class="ref-type-tag">${s.type.replace('_', ' ').toUpperCase()}</span>
                      <span class="ref-year">${s.year || 's/d'}</span>
                    </div>
                    <h4 class="ref-title">${s.title}</h4>
                    <p class="ref-author"><strong>Autor(es):</strong> ${s.author}</p>
                    <p class="ref-pub"><strong>Publicação / Instituição:</strong> ${s.institutionOrPublisher || 'N/D'}</p>
                    ${s.notes ? `<p class="ref-notes">💡 <em>${s.notes}</em></p>` : ''}
                    ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="ref-link">Consultar Publicação &rarr;</a>` : ''}
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
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
