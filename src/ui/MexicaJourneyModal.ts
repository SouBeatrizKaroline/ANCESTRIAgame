import { AudioManager } from '../engine/AudioManager';
import { GameState } from '../state/GameState';

const PROGRESS_KEY = 'ancestria_mexica_journey_v1';

const chapters = [
  {
    eyebrow: '01 · TERRITORIO LACUSTRE',
    title: 'Mexico-Tenochtitlan: una ciudad entre aguas',
    text: 'Mexico-Tenochtitlan se desarrolló en un entorno lacustre conectado por calzadas, canales y puentes. La ciudad no puede comprenderse sin las relaciones políticas, comerciales y tributarias con otros pueblos de la Cuenca de México.',
    question: '¿Qué elemento conectaba la ciudad con el territorio y permitía el tránsito por agua?',
    options: ['Canales y calzadas', 'Una única carretera de piedra', 'Túneles subterráneos'],
    correct: 0
  },
  {
    eyebrow: '02 · AGUA Y CULTIVO',
    title: 'Chinampas: conocimiento de larga duración',
    text: 'Las chinampas son parcelas agrícolas construidas en zonas lacustres poco profundas mediante sedimentos, materia vegetal y manejo de canales. La práctica es anterior al poder mexica y continúa viva en Xochimilco; no debe atribuirse a un solo pueblo.',
    question: '¿Cuál afirmación respeta mejor la historia de las chinampas?',
    options: ['Fueron una práctica lacustre de larga duración compartida en la cuenca', 'Fueron inventadas exclusivamente por los mexicas', 'Eran islas naturales sin intervención humana'],
    correct: 0
  },
  {
    eyebrow: '03 · NOMBRE Y MEMORIA',
    title: 'Mexica, tenochca y “azteca”',
    text: 'En ANCESTRIA usamos Mexica como nombre principal y relacionamos “azteca” como el término más difundido. Las fuentes emplean también nombres como tenochca según el contexto. Nombrar con cuidado evita borrar identidades propias.',
    question: '¿Cómo presenta ANCESTRIA este pueblo?',
    options: ['Mexica como nombre principal, explicando otros términos', 'Azteca como único nombre válido', 'Como una cultura idéntica a todos los pueblos mesoamericanos'],
    correct: 0
  }
] as const;

export class MexicaJourneyModal {
  private chapterIndex = 0;

  constructor(private container: HTMLElement, private onBack: () => void) {}

  public show(): void {
    const saved = Number(localStorage.getItem(PROGRESS_KEY) || 0);
    this.chapterIndex = Math.min(Math.max(saved, 0), chapters.length - 1);
    this.renderOverview(saved);
  }

  private renderOverview(saved: number): void {
    this.container.innerHTML = `<div class="mexica-journey-overlay"><article class="mexica-journey-window journey-overview-window"><header class="mexica-journey-header"><div><span class="badge">RECORRIDO MEXICA</span><h2>Tres memorias para explorar</h2><p>Elige un capítulo. Tu progreso queda guardado en este dispositivo.</p></div><button class="btn-close" id="mexica-close" aria-label="Cerrar">&times;</button></header><div class="journey-overview-grid">${chapters.map((c, i) => `<button class="journey-chapter-card ${i < saved ? 'completed' : ''}" data-chapter="${i}"><span class="journey-number">0${i + 1}</span><span class="culture-status">${c.eyebrow.split('·')[1]}</span><strong>${c.title}</strong><small>${i < saved ? '✓ Memoria recorrida' : i === Math.min(saved, chapters.length - 1) ? 'Continuar aquí →' : 'Explorar capítulo →'}</small></button>`).join('')}</div><footer class="journey-overview-footer">Territorio lacustre · Chinampas · Nombre y memoria</footer></article></div>`;
    this.container.querySelector('#mexica-close')?.addEventListener('click', () => { this.close(); this.onBack(); });
    this.container.querySelectorAll<HTMLButtonElement>('[data-chapter]').forEach((button) => button.addEventListener('click', () => { this.chapterIndex = Number(button.dataset.chapter); AudioManager.getInstance().playClick(); this.render(); }));
  }

  private render(feedback = ''): void {
    const chapter = chapters[this.chapterIndex];
    const progress = ((this.chapterIndex + 1) / chapters.length) * 100;
    this.container.innerHTML = `
      <div class="mexica-journey-overlay">
        <article class="mexica-journey-window">
          <header class="mexica-journey-header">
            <div><span class="badge">RECORRIDO MEXICA</span><h2>${chapter.title}</h2></div>
            <button class="btn-close" id="mexica-close" aria-label="Cerrar">&times;</button>
          </header>
          <div class="mexica-progress"><span style="width:${progress}%"></span></div>
          <div class="mexica-journey-body">
            <section class="mexica-story">
              <span class="culture-status">${chapter.eyebrow}</span>
              <p>${chapter.text}</p>
              <aside class="source-principle"><strong>Cómo leemos las fuentes</strong><br>El recorrido parte de textos nahuas y voces indígenas contemporáneas; la arqueología apoya el contexto material. Los documentos coloniales se identifican y no se presentan como voz principal.</aside>
            </section>
            <section class="mexica-activity">
              <span class="badge">ACTIVIDAD DE MEMORIA</span>
              <h3>${chapter.question}</h3>
              <div class="mexica-options">${chapter.options.map((option, index) => `<button data-option="${index}">${option}</button>`).join('')}</div>
              <p class="mexica-feedback" aria-live="polite">${feedback}</p>
            </section>
          </div>
          <footer class="mexica-sources">
            <span>Voces y fuentes del recorrido:</span>
            <a href="https://historicas.unam.mx/publicaciones/catalogo/ficha?id=008c" target="_blank" rel="noopener noreferrer">Tezozómoc · Crónica Mexicáyotl en náhuatl</a>
            <a href="https://www.inali.gob.mx/detalle/2020-10-12-17-19-51" target="_blank" rel="noopener noreferrer">INALI · autores y hablantes nahuas contemporáneos</a>
            <a href="https://www.inah.gob.mx/boletines/el-sistema-chinampero-de-la-cuenca-de-mexico-en-la-nueva-edicion-de-arqueologia-mexicana" target="_blank" rel="noopener noreferrer">INAH · Sistema chinampero</a>
            <a href="https://whc.unesco.org/en/list/412" target="_blank" rel="noopener noreferrer">UNESCO · Xochimilco</a>
            <a href="https://www.templomayor.inah.gob.mx/salas-del-museo/sala-7-agricultura" target="_blank" rel="noopener noreferrer">Museo del Templo Mayor</a>
            <small>La fuente de Tezozómoc conserva una perspectiva histórica nahua-mexica mediada por su contexto colonial. Las voces contemporáneas se usan para reconocer continuidad cultural y lingüística, no para atribuirles afirmaciones sobre el siglo XV que no hayan expresado.</small>
          </footer>
        </article>
      </div>`;
    this.attachEvents();
  }

  private attachEvents(): void {
    this.container.querySelector('#mexica-close')?.addEventListener('click', () => { this.close(); this.onBack(); });
    this.container.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((button) => {
      button.addEventListener('click', () => {
        AudioManager.getInstance().playClick();
        if (Number(button.dataset.option) !== chapters[this.chapterIndex].correct) {
          this.render('Revisa el contexto y vuelve a intentarlo.');
          return;
        }
        if (this.chapterIndex < chapters.length - 1) {
          this.chapterIndex += 1;
          localStorage.setItem(PROGRESS_KEY, String(this.chapterIndex));
          this.render('');
          return;
        }
        localStorage.setItem(PROGRESS_KEY, String(chapters.length));
        GameState.getInstance().addKnowledgeFragments(30);
        this.renderCompletion();
      });
    });
  }

  private renderCompletion(): void {
    this.container.innerHTML = `<div class="mexica-journey-overlay"><article class="mexica-journey-window mexica-complete"><span class="completion-symbol">✦</span><span class="badge">MEMORIA REGISTRADA</span><h2>Recorrido Mexica completado</h2><p>Exploraste territorio, chinampas y nombres con atención al contexto y a la pluralidad de fuentes.</p><button class="btn-menu-primary" id="mexica-finish">Volver a los recorridos</button></article></div>`;
    this.container.querySelector('#mexica-finish')?.addEventListener('click', () => { this.close(); this.onBack(); });
  }

  public close(): void { this.container.innerHTML = ''; }
}
