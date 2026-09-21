import { AudioManager } from '../engine/AudioManager';
import { HISTORICAL_SOURCES } from '../data/references/historicalSources';

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

    this.container.innerHTML = `
      <div class="about-modal-overlay">
        <div class="about-window">
          <div class="about-header">
            <div>
              <span class="badge">Compromiso ético y educativo</span>
              <h2>Sobre ANCESTRIA y la responsabilidad histórica</h2>
            </div>
            <button class="btn-close" id="btn-close-about" aria-label="Cerrar">&times;</button>
          </div>

          <div class="about-body">
            <!-- Manifesto Pedagógico -->
            <section class="about-section">
              <h3>Propósito y metodología pedagógica</h3>
              <p><strong>ANCESTRIA</strong> propone conocer pueblos originarios de las Américas sin convertirlos en una cultura homogénea ni repetir estereotipos coloniales. Cada recorrido debe apoyarse en relatos, tradiciones, fuentes y perspectivas propias, priorizando voces indígenas.</p>
              <p>El juego invita a explorar tecnologías, memorias y formas de organización dentro de su contexto histórico y cultural.</p>
            </section>

            <!-- Cuidados com Representação Cultural -->
            <section class="about-section highlight-box">
              <h3>Cuidado ético de la representación cultural</h3>
              <ul>
                <li><strong>Pluralidad:</strong> pueblos mexicas, mayas, andinos, amazónicos y otros pueblos indígenas poseen historias, lenguas y perspectivas propias.</li>
                <li><strong>Fuentes situadas:</strong> damos prioridad a fuentes, autorías y perspectivas indígenas; los registros coloniales se presentan con contexto crítico.</li>
                <li><strong>Honestidad histórica:</strong> los debates y límites de las evidencias se señalan sin presentar interpretaciones como verdades absolutas.</li>
              </ul>
            </section>

            <!-- Catálogo de Fontes e Referências -->
            <section class="about-section">
              <h3>Fuentes, bibliografía y registros</h3>
              <p class="section-lead">El contenido debe combinar fuentes indígenas, investigación académica, archivos comunitarios y registros patrimoniales:</p>
              
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
                    <p class="ref-author"><strong>Autoría:</strong> ${s.author}</p>
                    <p class="ref-pub"><strong>Publicación / institución:</strong> ${s.institutionOrPublisher || 'N/D'}</p>
                    ${s.notes ? `<p class="ref-notes">💡 <em>${s.notes}</em></p>` : ''}
                    ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="ref-link">Consultar fuente &rarr;</a>` : ''}
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
      this.onDismiss();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
