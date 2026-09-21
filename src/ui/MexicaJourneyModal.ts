import { AudioManager } from '../engine/AudioManager';
import { GameState } from '../state/GameState';
import { getLanguage } from '../i18n';

const PROGRESS_KEY = 'ancestria_mexica_journey_v1';

interface Chapter {
  eyebrow: string;
  title: string;
  text: string;
  question: string;
  options: string[];
  correct: number;
}

const chaptersTrilingual: Record<'es' | 'pt-BR' | 'en', Chapter[]> = {
  es: [
    {
      eyebrow: '01 · TERRITORIO LACUSTRE',
      title: 'Una ciudad conectada por agua, calzadas y diques',
      text: 'Mexico-Tenochtitlan fue fundada en una isla del lago de Texcoco. Para hacer habitable el entorno, sus habitantes construyeron calzadas elevadas con puentes levadizos, acueductos desde Chapultepec y el gran albarradón de Nezahualcóyotl, que separaba las aguas dulces de las saladas.',
      question: '¿Qué solución técnica permitió controlar inundaciones y salinidad en el lago?',
      options: ['Un sistema de diques y calzadas que separaba aguas dulces y saladas', 'La desecación total del lago antes de fundar la ciudad', 'Canales excavados únicamente para la pesca deportiva'],
      correct: 0
    },
    {
      eyebrow: '02 · AGRICULTURA DE CHINAMPAS',
      title: 'Suelo fértil construido sobre las aguas',
      text: 'Las chinampas son parcelas rectangulares construidas con lodo lacustre, carrizos y materia orgánica, fijadas por raíces de ahuejotes. Proporcionaban hasta cuatro cosechas al año sin agotar la tierra, gracias a la fertilidad del lecho lacustre.',
      question: '¿Por qué las chinampas no deben definirse como "islas flotantes"?',
      options: ['Porque están firmemente ancladas al lecho lacustre por sedimentos y raíces de ahuejote', 'Porque eran barcas de madera que navegaban con remos', 'Porque no tenían relación con el agua'],
      correct: 0
    },
    {
      eyebrow: '03 · NOMBRES Y MEMORIA',
      title: 'Mexica, tenochca y el uso del término azteca',
      text: 'Los habitantes de Tenochtitlan se llamaban a sí mismos mexicas o tenochcas. "Azteca" hace referencia a Aztlán, su lugar mítico de origen, pero fue generalizado por historiadores europeos en los siglos XVIII y XIX para agrupar bajo una sola etiqueta a pueblos diversos.',
      question: '¿Cómo presenta ANCESTRIA este pueblo?',
      options: ['Mexica como nombre propio, explicando el uso histórico del término azteca', 'Azteca como único nombre válido sin contexto histórico', 'Como un pueblo sin nombre propio'],
      correct: 0
    },
    {
      eyebrow: '04 · MERCADO Y REDES',
      title: 'Tlatelolco: intercambio en una cuenca diversa',
      text: 'El gran mercado de Tlatelolco reunía productos de tierras calientes, costas y montañas: cacao, jade, plumas preciosas, maíz, frijol y sal. Los comerciantes pochtecas articulaban alianzas comerciales y acuerdos políticos regionales.',
      question: '¿Qué mirada evita presentar el mercado como una escena aislada?',
      options: ['Relacionarlo con redes comerciales, alianzas, tributos y pueblos diversos', 'Afirmar que todos los productos provenían de una sola parcela', 'Describir a Mesoamérica como un solo pueblo sin diferencias'],
      correct: 0
    },
    {
      eyebrow: '05 · LENGUA VIVA Y CONTINUIDAD',
      title: 'El náhuatl: memoria ancestral y creación contemporánea',
      text: 'El náhuatl no pertenece solamente al pasado arqueológico. Hoy es hablado por más de 1.5 millones de personas con literatura, educación bilingüe y poesía contemporánea impulsada por autores como Natalio Hernández y publicaciones del INALI.',
      question: '¿Cómo debe presentarse el náhuatl en ANCESTRIA?',
      options: ['Como una lengua viva y diversa, con hablantes y creación contemporánea', 'Como una lengua desaparecida en el siglo XVI', 'Como una lengua idéntica en todas las regiones sin variantes'],
      correct: 0
    }
  ],
  'pt-BR': [
    {
      eyebrow: '01 · TERRITÓRIO LACUSTRE',
      title: 'Uma cidade conectada por água, calçadas e diques',
      text: 'Mexico-Tenochtitlan foi fundada em uma ilha do lago de Texcoco. Para tornar o ambiente habitável, seus habitantes ergueram calçadas elevadas com pontes móveis, aquedutos desde Chapultepec e o dique de Nezahualcóyotl, separando água doce de água salobra.',
      question: 'Qual solução técnica permitiu controlar inundações e salinidade no lago?',
      options: ['Um sistema de diques e calçadas que separava águas doces e salgadas', 'A drenagem completa do lago antes de fundar a cidade', 'Canais cavados apenas para recreação'],
      correct: 0
    },
    {
      eyebrow: '02 · AGRICULTURA DE CHINAMPAS',
      title: 'Solo fértil construído sobre as águas',
      text: 'As chinampas são parcelas retangulares construídas com lodo lacustre, juncos e matéria orgânica, ancoradas pelas raízes dos salgueiros ahuejotes. Garantiam até quatro colheitas ao ano sem esgotar a terra.',
      question: 'Por que as chinampas não devem ser descritas como "ilhas flutuantes"?',
      options: ['Porque estão firmemente ancoradas ao leito lacustre por sedimentos e raízes de ahuejote', 'Porque eram jangadas que navegavam livremente', 'Porque não tinham qualquer relação com a água'],
      correct: 0
    },
    {
      eyebrow: '03 · NOMES E MEMÓRIA',
      title: 'Mexica, tenochca e o termo asteca',
      text: 'Os habitantes de Tenochtitlan chamavam a si mesmos mexicas ou tenochcas. "Asteca" remete a Aztlán, sua origem mítica, mas foi popularizado por cronistas e historiadores europeus nos séculos XVIII e XIX.',
      question: 'Como o ANCESTRIA apresenta esse povo?',
      options: ['Mexica como nome próprio, explicando o uso histórico do termo asteca', 'Asteca como único nome válido sem contexto histórico', 'Como um povo sem identidade própria'],
      correct: 0
    },
    {
      eyebrow: '04 · MERCADO E REDES',
      title: 'Tlatelolco: intercâmbio em uma bacia diversa',
      text: 'O grande mercado de Tlatelolco reunia produtos de diversas regiões ecológicas: cacau, jade, penas de quetzal, milho e sal. Comerciantes pochtecas articulavam rotas inter-regionais e relações políticas complexas.',
      question: 'Qual perspectiva evita ver o mercado de forma isolada?',
      options: ['Relacioná-lo com redes comerciais, alianças, tributos e povos diversos', 'Afirmar que todos os produtos vinham de uma única horta', 'Descrever a Mesoamérica como um único povo homogêneo'],
      correct: 0
    },
    {
      eyebrow: '05 · LÍNGUA VIVA E CONTINUIDADE',
      title: 'O náuatle: memória ancestral e criação contemporânea',
      text: 'O náuatle não pertence apenas a manuscritos do passado. Hoje é falado por mais de 1,5 milhão de pessoas, com literatura, rádio e poesia contemporânea documentada por instituições como o INALI.',
      question: 'Como o náuatle deve ser apresentado no ANCESTRIA?',
      options: ['Como uma língua viva e diversa, com falantes e criação contemporânea', 'Como uma língua extinta no século XVI', 'Como um idioma idêntico em todas as regiões sem variantes'],
      correct: 0
    }
  ],
  en: [
    {
      eyebrow: '01 · LAKE TERRITORY',
      title: 'A city interconnected by water, causeways, and dikes',
      text: 'Mexico-Tenochtitlan was established on an island in Lake Texcoco. To engineer habitable ground, its people built elevated causeways with drawbridges, aqueducts from Chapultepec, and the Nezahualcóyotl dike that segregated fresh and brackish water.',
      question: 'Which engineering solution managed seasonal floods and water salinity?',
      options: ['A network of dikes and causeways separating freshwater and brackish zones', 'Draining the entire lake system prior to founding the settlement', 'Digging recreational canals only for boating'],
      correct: 0
    },
    {
      eyebrow: '02 · CHINAMPA AGRICULTURE',
      title: 'Fertile agricultural plots built across wetlands',
      text: 'Chinampas are rectangular agricultural terraces constructed from lake sediment, reeds, and organic matter, anchored by root systems of ahuejote willows. They produced up to four harvests a year sustainably.',
      question: 'Why should chinampas not be described as "floating islands"?',
      options: ['Because they are firmly rooted to the lakebed by sediment and willow root networks', 'Because they were wooden rafts drifting freely across the water', 'Because they had no connection to wetland environments'],
      correct: 0
    },
    {
      eyebrow: '03 · NAMES AND IDENTITY',
      title: 'Mexica, Tenochca, and the term Aztec',
      text: 'The people of Tenochtitlan referred to themselves as Mexica or Tenochca. "Aztec" refers to ancestral Aztlan, but became widely used by European scholars in the 18th and 19th centuries as an umbrella label.',
      question: 'How does ANCESTRIA present this people?',
      options: ['Mexica as their self-designation, contextualizing the historical term Aztec', 'Aztec as the only valid designation without historical context', 'As a culture without its own language or name'],
      correct: 0
    },
    {
      eyebrow: '04 · MARKET AND NETWORKS',
      title: 'Tlatelolco: regional exchange in a diverse basin',
      text: 'The great market of Tlatelolco gathered commodities from distinct ecological zones: cacao, jade, quetzal plumes, maize, and salt. Merchant guilds (pochtecas) maintained far-reaching commercial alliances.',
      question: 'Which view avoids depicting the market in isolation?',
      options: ['Connecting it to regional trade networks, political alliances, and distinct peoples', 'Claiming all goods came from a single neighborhood plot', 'Assuming all Mesoamerican societies shared one identical culture'],
      correct: 0
    },
    {
      eyebrow: '05 · LIVING LANGUAGE',
      title: 'Nahuatl: living memory and contemporary literature',
      text: 'Nahuatl is not an artifact of archaeological archives. It is spoken today by more than 1.5 million people, with contemporary literature, educational initiatives, and living cultural vitality.',
      question: 'How should Nahuatl be represented in ANCESTRIA?',
      options: ['As a living, diverse language with contemporary speakers and authors', 'As an extinct tongue that disappeared in the 16th century', 'As a uniform language without regional varieties'],
      correct: 0
    }
  ]
};

export class MexicaJourneyModal {
  private chapterIndex = 0;
  private optionOrders = new Map<number, number[]>();

  constructor(private container: HTMLElement, private onBack: () => void) {}

  public show(): void {
    this.optionOrders.clear();
    const saved = Number(localStorage.getItem(PROGRESS_KEY) || 0);
    const chapters = this.getChapters();
    this.chapterIndex = Math.min(Math.max(saved, 0), chapters.length - 1);
    this.renderOverview(saved);
  }

  private getChapters(): Chapter[] {
    const lang = getLanguage();
    return chaptersTrilingual[lang] || chaptersTrilingual.es;
  }

  private optionOrder(): number[] {
    if (!this.optionOrders.has(this.chapterIndex)) {
      const chapters = this.getChapters();
      const order = chapters[this.chapterIndex].options.map((_, index) => index);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      this.optionOrders.set(this.chapterIndex, order);
    }
    return this.optionOrders.get(this.chapterIndex)!;
  }

  private renderOverview(saved: number): void {
    const lang = getLanguage();
    const chapters = this.getChapters();
    const labels = {
      badge: lang === 'es' ? 'RECORRIDO MEXICA' : lang === 'pt-BR' ? 'PERCURSO MEXICA' : 'MEXICA JOURNEY',
      title: lang === 'es' ? 'Cinco memorias para explorar' : lang === 'pt-BR' ? 'Cinco memórias para explorar' : 'Five memories to explore',
      subtitle: lang === 'es' ? 'Elige un capítulo. Tu progreso queda guardado en este dispositivo.' : lang === 'pt-BR' ? 'Escolha um capítulo. Seu progresso fica salvo neste dispositivo.' : 'Select a chapter. Progress is saved on this device.',
      done: lang === 'es' ? '✓ Memoria recorrida' : lang === 'pt-BR' ? '✓ Memória percorrida' : '✓ Memory explored',
      continue: lang === 'es' ? 'Continuar aquí →' : lang === 'pt-BR' ? 'Continuar aqui →' : 'Continue here →',
      explore: lang === 'es' ? 'Explorar capítulo →' : lang === 'pt-BR' ? 'Explorar capítulo →' : 'Explore chapter →',
      footer: lang === 'es' ? 'Territorio lacustre · Chinampas · Nombres · Redes · Lengua viva' : lang === 'pt-BR' ? 'Território lacustre · Chinampas · Nomes · Redes · Língua viva' : 'Wetland territory · Chinampas · Names · Networks · Living language',
      close: lang === 'es' ? 'Cerrar' : lang === 'pt-BR' ? 'Fechar' : 'Close'
    };

    this.container.innerHTML = `
      <div class="mexica-journey-overlay">
        <article class="mexica-journey-window journey-overview-window">
          <header class="mexica-journey-header">
            <div>
              <span class="badge">${labels.badge}</span>
              <h2>${labels.title}</h2>
              <p>${labels.subtitle}</p>
            </div>
            <button class="btn-close" id="mexica-close" aria-label="${labels.close}">&times;</button>
          </header>
          <div class="journey-overview-grid">
            ${chapters.map((c, i) => `
              <button class="journey-chapter-card ${i < saved ? 'completed' : ''}" data-chapter="${i}">
                <span class="journey-number">0${i + 1}</span>
                <span class="culture-status">${c.eyebrow.split('·')[1]}</span>
                <strong>${c.title}</strong>
                <small>${i < saved ? labels.done : i === Math.min(saved, chapters.length - 1) ? labels.continue : labels.explore}</small>
              </button>
            `).join('')}
          </div>
          <footer class="journey-overview-footer">${labels.footer}</footer>
        </article>
      </div>
    `;

    this.container.querySelector('#mexica-close')?.addEventListener('click', () => {
      this.close();
      this.onBack();
    });

    this.container.querySelectorAll<HTMLButtonElement>('[data-chapter]').forEach((button) => {
      button.addEventListener('click', () => {
        this.chapterIndex = Number(button.dataset.chapter);
        AudioManager.getInstance().playClick();
        this.render();
      });
    });
  }

  private render(feedback = ''): void {
    const lang = getLanguage();
    const chapters = this.getChapters();
    const chapter = chapters[this.chapterIndex];
    const progress = ((this.chapterIndex + 1) / chapters.length) * 100;

    const labels = {
      badge: lang === 'es' ? 'RECORRIDO MEXICA' : lang === 'pt-BR' ? 'PERCURSO MEXICA' : 'MEXICA JOURNEY',
      activity: lang === 'es' ? 'ACTIVIDAD DE MEMORIA' : lang === 'pt-BR' ? 'ATIVIDADE DE MEMÓRIA' : 'MEMORY ACTIVITY',
      principleTitle: lang === 'es' ? 'Fuentes y perspectivas nahuas' : lang === 'pt-BR' ? 'Fontes e perspectivas nahuas' : 'Nahua sources and perspectives',
      principleBody: lang === 'es'
        ? 'Diferenciamos fuentes históricas originarias (como la Crónica Mexicáyotl) de registros coloniales y valoramos las voces vivas de hablantes nahuas actuales.'
        : lang === 'pt-BR'
        ? 'Diferenciamos fontes históricas originárias (como a Crónica Mexicáyotl) de registros coloniais e valorizamos as vozes vivas de falantes náuatles atuais.'
        : 'We distinguish indigenous chronicles (such as the Crónica Mexicáyotl) from colonial accounts and honor the contemporary voices of living Nahuatl speakers.',
      sourcesLabel: lang === 'es' ? 'Fuentes del recorrido:' : lang === 'pt-BR' ? 'Fontes do percurso:' : 'Journey sources:',
      sourcesNote: lang === 'es'
        ? 'Las fuentes orales y escritas indígenas son la base formativa de esta experiencia interactiva.'
        : lang === 'pt-BR'
        ? 'As fontes orais e escritas indígenas são a base formativa desta experiência interativa.'
        : 'Indigenous oral and written sources form the foundation of this interactive experience.',
      close: lang === 'es' ? 'Cerrar' : lang === 'pt-BR' ? 'Fechar' : 'Close'
    };

    this.container.innerHTML = `
      <div class="mexica-journey-overlay">
        <article class="mexica-journey-window">
          <header class="mexica-journey-header">
            <div>
              <span class="badge">${labels.badge}</span>
              <h2>${chapter.title}</h2>
            </div>
            <button class="btn-close" id="mexica-close" aria-label="${labels.close}">&times;</button>
          </header>
          <div class="mexica-progress"><span style="width: ${progress}%"></span></div>
          <div class="mexica-journey-body">
            <section class="mexica-story">
              <span class="culture-status">${chapter.eyebrow}</span>
              <p>${chapter.text}</p>
              <aside class="source-principle">
                <strong>${labels.principleTitle}</strong><br />
                ${labels.principleBody}
              </aside>
            </section>
            <section class="mexica-activity">
              <span class="badge">${labels.activity}</span>
              <h3>${chapter.question}</h3>
              <div class="mexica-options">
                ${this.optionOrder().map((originalIndex) => `
                  <button data-option="${originalIndex}">
                    ${chapter.options[originalIndex]}
                  </button>
                `).join('')}
              </div>
              <p class="mexica-feedback" aria-live="polite">${feedback}</p>
            </section>
          </div>
          <footer class="mexica-sources">
            <span>${labels.sourcesLabel}</span>
            <a href="https://historicas.unam.mx/publicaciones/catalogo/ficha?id=008c" target="_blank" rel="noopener noreferrer">UNAM · Crónica Mexicáyotl</a>
            <a href="https://www.inali.gob.mx/detalle/2020-10-12-17-19-51" target="_blank" rel="noopener noreferrer">INALI · voces nahuas vivas</a>
            <a href="https://www.inah.gob.mx/boletines/el-sistema-chinampero-de-la-cuenca-de-mexico-en-la-nueva-edicion-de-arqueologia-mexicana" target="_blank" rel="noopener noreferrer">INAH · sistema chinampero</a>
            <small>${labels.sourcesNote}</small>
          </footer>
        </article>
      </div>
    `;

    this.container.querySelector('#mexica-close')?.addEventListener('click', () => {
      this.close();
      this.onBack();
    });

    this.container.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((button) => {
      button.addEventListener('click', () => {
        const choice = Number(button.dataset.option);
        AudioManager.getInstance().playClick();

        if (choice !== chapter.correct) {
          const retryMsg = lang === 'es'
            ? 'Revisa el contexto histórico y vuelve a intentarlo.'
            : lang === 'pt-BR'
            ? 'Revise o contexto histórico e tente novamente.'
            : 'Review the historical context and try again.';
          this.render(retryMsg);
          return;
        }

        if (this.chapterIndex < chapters.length - 1) {
          this.chapterIndex++;
          const currentSaved = Number(localStorage.getItem(PROGRESS_KEY) || 0);
          localStorage.setItem(PROGRESS_KEY, String(Math.max(currentSaved, this.chapterIndex)));
          this.render();
          return;
        }

        localStorage.setItem(PROGRESS_KEY, String(chapters.length));
        if (!localStorage.getItem(`${PROGRESS_KEY}_rewarded`)) {
          GameState.getInstance().addKnowledgeFragments(30);
          localStorage.setItem(`${PROGRESS_KEY}_rewarded`, '1');
        }
        this.renderCompletion();
      });
    });
  }

  private renderCompletion(): void {
    const lang = getLanguage();
    const copy = {
      badge: lang === 'es' ? 'MEMORIA REGISTRADA' : lang === 'pt-BR' ? 'MEMÓRIA REGISTRADA' : 'MEMORY RECORDED',
      title: lang === 'es' ? 'Recorrido Mexica completado' : lang === 'pt-BR' ? 'Percurso Mexica concluído' : 'Mexica journey completed',
      text: lang === 'es'
        ? 'Has explorado las tecnologías lacustres, chinampas y la presencia contemporánea de la lengua náhuatl con fuentes situadas.'
        : lang === 'pt-BR'
        ? 'Você explorou as tecnologias lacustres, chinampas e a presença contemporânea da língua náuatle com fontes situadas.'
        : 'You explored wetland technologies, chinampas, and living Nahuatl language through indigenous sources.',
      button: lang === 'es' ? 'Volver a los recorridos' : lang === 'pt-BR' ? 'Voltar aos percursos' : 'Return to journeys'
    };

    this.container.innerHTML = `
      <div class="mexica-journey-overlay">
        <article class="mexica-journey-window mexica-complete">
          <span class="completion-symbol">✦</span>
          <span class="badge">${copy.badge}</span>
          <h2>${copy.title}</h2>
          <p>${copy.text}</p>
          <button class="btn-menu-primary" id="mexica-finish">${copy.button}</button>
        </article>
      </div>
    `;

    this.container.querySelector('#mexica-finish')?.addEventListener('click', () => {
      this.close();
      this.onBack();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
