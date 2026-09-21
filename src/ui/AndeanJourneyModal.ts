import { AudioManager } from '../engine/AudioManager';
import { GameState } from '../state/GameState';
import { getLanguage } from '../i18n';

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
      eyebrow: '01 · CAMINOS Y TERRITORIOS',
      title: 'Qhapaq Ñan: una red construida por muchos pueblos',
      text: 'El Qhapaq Ñan articuló comunidades, caminos anteriores al Tawantinsuyu y nuevas obras viales a través de territorios andinos diversos. Su historia no pertenece a una población homogénea, sino a múltiples ayllus y naciones.',
      question: '¿Qué interpretación respeta mejor esta red de caminos?',
      options: [
        'Conectó territorios, ecosistemas y saberes de distintos pueblos andinos',
        'Fue una carretera aislada construida para una sola ciudad',
        'Eliminó todas las identidades locales de los Andes'
      ],
      correct: 0
    },
    {
      eyebrow: '02 · AGRICULTURA DE ALTURA',
      title: 'Andenes, agua y pisos ecológicos',
      text: 'Los andenes ayudan a conservar suelo y agua y a cultivar en distintas alturas (control vertical de pisos ecológicos). Los muros de piedra absorben el calor solar diurno y lo liberan durante las gélidas noches de puna.',
      question: '¿Por qué no existe una única explicación para todos los andenes?',
      options: [
        'Porque responden a territorios, microclimas, comunidades y épocas diferentes',
        'Porque nunca tuvieron función agrícola',
        'Porque todos fueron construidos con el mismo molde sin adaptación local'
      ],
      correct: 0
    },
    {
      eyebrow: '03 · MEMORIA Y REGISTRO',
      title: 'Khipus: cuentas, relaciones y memoria',
      text: 'Los khipus registraron información contable, censal y narrativa mediante fibras de algodón o camélido, colores, torsiones y nudos en base decimal. Su lectura combinaba ejemplares conservados con la sabiduría de los khipukamayuq.',
      question: '¿Cuál es la forma más rigurosa de presentarlos?',
      options: [
        'Explicar lo comprobado arqueológicamente y señalar lo que sigue en investigación comunitaria',
        'Afirmar que todos significan exactamente lo mismo sin variación',
        'Tratarlos como meras cuerdas decorativas sin valor informativo'
      ],
      correct: 0
    },
    {
      eyebrow: '04 · TRABAJO COMUNITARIO',
      title: 'Q’eswachaka: conocimiento que se renueva',
      text: 'La renovación anual del puente colgante Q’eswachaka sobre el río Apurímac continúa gracias al trabajo colectivo (Minka) de cuatro ayllus quechuas (Huinchiri, Chaupibanda, Choccahua y Ccollana Quehue). Es una práctica viva reconocida por la UNESCO.',
      question: '¿Qué sostiene la continuidad del puente colgante?',
      options: [
        'La transmisión comunitaria de conocimientos, rituales y reciprocidad intergeneracional',
        'Una reconstrucción industrial metálica sin participación local',
        'Un procedimiento antiguo que dejó de practicarse hace siglos'
      ],
      correct: 0
    },
    {
      eyebrow: '05 · LENGUAS VIVAS',
      title: 'Runa Simi y diversidad lingüística andina',
      text: 'Las variedades de quechua o Runa Simi conviven con el aimara y otras lenguas originarias. Más de 8 millones de personas las hablan hoy, produciendo literatura, música, activismo comunitario y saberes científicos.',
      question: '¿Cómo debe mostrarse esta diversidad andina?',
      options: [
        'Reconociendo lenguas, variantes, hablantes y contextos contemporáneos',
        'Usando "quechua" como nombre de una única cultura congelada',
        'Presentándolas únicamente como lenguas de museos del pasado'
      ],
      correct: 0
    }
  ],
  'pt-BR': [
    {
      eyebrow: '01 · CAMINHOS E TERRITÓRIOS',
      title: 'Qhapaq Ñan: uma rede construída por muitos povos',
      text: 'O Qhapaq Ñan articulou comunidades, caminhos pré-incaicos e novas obras através de relevos andinos diversos. Sua história não pertence a uma população homogênea, mas a múltiplos ayllus e nações.',
      question: 'Qual interpretação respeita melhor esta rede de caminhos?',
      options: [
        'Conectou territórios, ecossistemas e saberes de distintos povos andinos',
        'Foi uma estrada isolada erguida para uma única cidade',
        'Eliminou todas as identidades locais dos Andes'
      ],
      correct: 0
    },
    {
      eyebrow: '02 · AGRICULTURA DE ALTITUDE',
      title: 'Andenes, água e pisos ecológicos',
      text: 'Os andenes ajudam a reter solo fértil e água, criando microclimas térmicos em diferentes altitudes (controle vertical de pisos ecológicos). Os muros de pedra absorvem o calor solar durante o dia e aquecem as raízes à noite.',
      question: 'Por que não existe uma única explicação para todos os andenes?',
      options: [
        'Porque respondem a territórios, microclimas, comunidades e épocas diferentes',
        'Porque nunca tiveram função agrícola real',
        'Porque todos foram construídos do mesmo jeito sem adaptação local'
      ],
      correct: 0
    },
    {
      eyebrow: '03 · MEMÓRIA E REGISTRO',
      title: 'Khipus: contabilidade, relações e memória',
      text: 'Os khipus registraram informações demográficas, agrícolas e genealógicas por meio de fibras de algodão e lã, cores e nós decimais. Sua leitura exigia a maestria dos khipukamayuq.',
      question: 'Qual a forma mais rigorosa de apresentá-los?',
      options: [
        'Explicar o comprovado pela pesquisa e indicar debates em aberto',
        'Afirmar que todos significam exatamente o mesmo sem variação',
        'Tratá-los como cordas decorativas sem dados reais'
      ],
      correct: 0
    },
    {
      eyebrow: '04 · TRABALHO COMUNITÁRIO',
      title: 'Q’eswachaka: conhecimento que se renova',
      text: 'A renovação anual da ponte pênsil Q’eswachaka sobre o rio Apurímac é mantida pela cooperação coletiva (Minka) de quatro ayllus quéchuas. É uma tradição viva inscrita como Patrimônio Imaterial pela UNESCO.',
      question: 'O que sustenta a continuidade da ponte?',
      options: [
        'A transmissão comunitária de saberes, rituais e cooperação entre gerações',
        'Uma estrutura metálica moderna sem envolvimento local',
        'Um método abandonado que não é mais praticado'
      ],
      correct: 0
    },
    {
      eyebrow: '05 · LÍNGUAS VIVAS',
      title: 'Runa Simi e diversidade linguística andina',
      text: 'As variedades de quéchua (Runa Simi) convivem com o aimará e outras línguas nativas. Mais de 8 milhões de pessoas as mantêm vivas hoje na comunicação diária, literatura e organização social.',
      question: 'Como essa diversidade deve ser representada?',
      options: [
        'Reconhecendo línguas, variantes, falantes e contextos contemporâneos',
        'Usando "quéchua" como rótulo de uma única cultura congelada',
        'Apresentando-as apenas como línguas do passado'
      ],
      correct: 0
    }
  ],
  en: [
    {
      eyebrow: '01 · ROADS AND TERRITORIES',
      title: 'Qhapaq Ñan: a network shaped by many peoples',
      text: 'The Qhapaq Ñan connected preexisting roads, diverse communities, and state infrastructure across varied Andean topographies. Its legacy belongs not to an isolated empire, but to multiple nations and ayllus.',
      question: 'Which interpretation best respects this road system?',
      options: [
        'It linked ecological zones, territories, and traditions of diverse Andean peoples',
        'It was an isolated highway built for only one city',
        'It eliminated all regional identities in the Andes'
      ],
      correct: 0
    },
    {
      eyebrow: '02 · HIGHLAND AGRICULTURE',
      title: 'Andenes, water management, and ecological tiers',
      text: 'Andenes conserve soil moisture and prevent erosion while allowing multi-altitude cultivation. Stone retaining walls absorb daytime solar warmth and release it during freezing highland nights.',
      question: 'Why is there no single explanation for all terraces?',
      options: [
        'Because they reflect different microclimates, communities, and historical periods',
        'Because they served no real agricultural purpose',
        'Because every terrace was built uniformly without local adaptation'
      ],
      correct: 0
    },
    {
      eyebrow: '03 · MEMORY AND RECORDS',
      title: 'Khipus: records, relationships, and numeracy',
      text: 'Khipus recorded census, tribute, and narrative information through cotton and camelid fibers, chromatic patterns, and positional decimal knotting, deciphered by trained khipukamayuq specialists.',
      question: 'What is the most scholarly way to present khipus?',
      options: [
        'Explaining verified evidence while noting ongoing areas of study',
        'Asserting that all khipus convey the exact same data without nuance',
        'Dismissing them as decorative strings without informational content'
      ],
      correct: 0
    },
    {
      eyebrow: '04 · COMMUNAL STEWARDSHIP',
      title: 'Q’eswachaka: knowledge that renews itself',
      text: 'The annual braided grass bridge renewal over the Apurímac River persists through the communal labor (Minka) of four Quechua ayllus. It is recognized as living cultural heritage by UNESCO.',
      question: 'What sustains the ongoing continuity of this bridge?',
      options: [
        'Intergenerational community transmission of engineering, ritual, and reciprocity',
        'An industrial steel replacement requiring no indigenous involvement',
        'An extinct technique that ceased to exist centuries ago'
      ],
      correct: 0
    },
    {
      eyebrow: '05 · LIVING LANGUAGES',
      title: 'Runa Simi and Andean linguistic diversity',
      text: 'Quechua (Runa Simi) varieties coexist with Aymara and other indigenous languages. Over 8 million living speakers actively preserve them in poetry, daily speech, governance, and music today.',
      question: 'How should this linguistic vitality be portrayed?',
      options: [
        'Acknowledging living speakers, contemporary literature, and regional varieties',
        'Treating Quechua as a single monolithic and frozen culture',
        'Presenting them strictly as extinct archaeological relics'
      ],
      correct: 0
    }
  ]
};

export class AndeanJourneyModal {
  private chapterIndex = 0;
  private optionOrders = new Map<number, number[]>();

  constructor(private container: HTMLElement, private onBack: () => void) {}

  public show(): void {
    this.optionOrders.clear();
    const saved = Number(localStorage.getItem('ancestria_andean_journey_v1') || 0);
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
      const order = chapters[this.chapterIndex].options.map((_, i) => i);
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
      badge: lang === 'es' ? 'RECORRIDO ANDINO' : lang === 'pt-BR' ? 'PERCURSO ANDINO' : 'ANDEAN JOURNEY',
      title: lang === 'es' ? 'Cinco saberes para explorar' : lang === 'pt-BR' ? 'Cinco saberes para explorar' : 'Five knowledge areas to explore',
      subtitle: lang === 'es' ? 'Elige un capítulo. Tu progreso queda guardado en este dispositivo.' : lang === 'pt-BR' ? 'Escolha um capítulo. Seu progresso fica salvo neste dispositivo.' : 'Select a chapter. Progress is saved on this device.',
      done: lang === 'es' ? '✓ Memoria recorrida' : lang === 'pt-BR' ? '✓ Memória percorrida' : '✓ Memory explored',
      continue: lang === 'es' ? 'Continuar aquí →' : lang === 'pt-BR' ? 'Continuar aqui →' : 'Continue here →',
      explore: lang === 'es' ? 'Explorar capítulo →' : lang === 'pt-BR' ? 'Explorar capítulo →' : 'Explore chapter →',
      footer: lang === 'es' ? 'Caminos · Andenes · Khipus · Trabajo comunitario · Lenguas vivas' : lang === 'pt-BR' ? 'Caminhos · Andenes · Khipus · Trabalho comunitário · Línguas vivas' : 'Roads · Terraces · Khipus · Communal labor · Living languages',
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
            <button class="btn-close" id="andean-close" aria-label="${labels.close}">&times;</button>
          </header>
          <div class="journey-overview-grid">
            ${chapters.map((c, i) => `
              <button class="journey-chapter-card ${i < saved ? 'completed' : ''}" data-andean-chapter="${i}">
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

    this.container.querySelector('#andean-close')?.addEventListener('click', () => {
      this.close();
      this.onBack();
    });

    this.container.querySelectorAll<HTMLButtonElement>('[data-andean-chapter]').forEach((button) => {
      button.addEventListener('click', () => {
        this.chapterIndex = Number(button.dataset.andeanChapter);
        AudioManager.getInstance().playClick();
        this.render();
      });
    });
  }

  private render(feedback = ''): void {
    const lang = getLanguage();
    const chapters = this.getChapters();
    const c = chapters[this.chapterIndex];
    const progress = ((this.chapterIndex + 1) / chapters.length) * 100;

    const labels = {
      badge: lang === 'es' ? 'RECORRIDO ANDINO' : lang === 'pt-BR' ? 'PERCURSO ANDINO' : 'ANDEAN JOURNEY',
      activity: lang === 'es' ? 'ACTIVIDAD DE MEMORIA' : lang === 'pt-BR' ? 'ATIVIDADE DE MEMÓRIA' : 'MEMORY ACTIVITY',
      principleTitle: lang === 'es' ? 'Cómo leemos las fuentes andinas' : lang === 'pt-BR' ? 'Como lemos as fontes andinas' : 'Reading Andean indigenous sources',
      principleBody: lang === 'es'
        ? 'Diferenciamos pueblos, épocas y territorios. Priorizamos instituciones y voces quechuas y aymaras, y señalamos cuándo una interpretación académica continúa en debate.'
        : lang === 'pt-BR'
        ? 'Diferenciamos povos, épocas e territórios. Priorizamos instituições e vozes quéchuas e aymaras, e indicamos quando um debate acadêmico permanece aberto.'
        : 'We differentiate between eras and territories, prioritizing Quechua and Aymara indigenous voices while contextualizing academic debates.',
      sourcesLabel: lang === 'es' ? 'Voces y fuentes del recorrido:' : lang === 'pt-BR' ? 'Vozes e fontes do percurso:' : 'Journey sources:',
      sourcesNote: lang === 'es'
        ? 'El recorrido evita presentar al Tawantinsuyu como sinónimo de todos los pueblos andinos y reconoce continuidades contemporáneas.'
        : lang === 'pt-BR'
        ? 'O percurso evita apresentar o Tawantinsuyu como sinônimo de todos os povos andinos e reconhece continuidades contemporâneas.'
        : 'The journey distinguishes the historical Tawantinsuyu from contemporary Andean diversity.',
      close: lang === 'es' ? 'Cerrar' : lang === 'pt-BR' ? 'Fechar' : 'Close'
    };

    this.container.innerHTML = `
      <div class="mexica-journey-overlay">
        <article class="mexica-journey-window">
          <header class="mexica-journey-header">
            <div>
              <span class="badge">${labels.badge}</span>
              <h2>${c.title}</h2>
            </div>
            <button class="btn-close" id="andean-close" aria-label="${labels.close}">&times;</button>
          </header>
          <div class="mexica-progress"><span style="width: ${progress}%"></span></div>
          <div class="mexica-journey-body">
            <section class="mexica-story">
              <span class="culture-status">${c.eyebrow}</span>
              <p>${c.text}</p>
              <aside class="source-principle">
                <strong>${labels.principleTitle}</strong><br />
                ${labels.principleBody}
              </aside>
            </section>
            <section class="mexica-activity">
              <span class="badge">${labels.activity}</span>
              <h3>${c.question}</h3>
              <div class="mexica-options">
                ${this.optionOrder().map((originalIndex) => `
                  <button data-andean-option="${originalIndex}">
                    ${c.options[originalIndex]}
                  </button>
                `).join('')}
              </div>
              <p class="mexica-feedback" aria-live="polite">${feedback}</p>
            </section>
          </div>
          <footer class="mexica-sources">
            <span>${labels.sourcesLabel}</span>
            <a href="https://qhapaqnan.cultura.pe/" target="_blank" rel="noopener noreferrer">Ministerio de Cultura del Perú · Qhapaq Ñan</a>
            <a href="https://ich.unesco.org/es/RL/conocimientos-tecnicas-y-rituales-vinculados-a-la-renovacion-anual-del-puente-qeswachaka-00594" target="_blank" rel="noopener noreferrer">UNESCO · renovación comunitaria del Q’eswachaka</a>
            <a href="https://bdpi.cultura.gob.pe/" target="_blank" rel="noopener noreferrer">Base de Datos Oficial de Pueblos Indígenas u Originarios del Perú</a>
            <small>${labels.sourcesNote}</small>
          </footer>
        </article>
      </div>
    `;

    this.container.querySelector('#andean-close')?.addEventListener('click', () => {
      this.close();
      this.onBack();
    });

    this.container.querySelectorAll<HTMLButtonElement>('[data-andean-option]').forEach((b) => {
      b.addEventListener('click', () => {
        AudioManager.getInstance().playClick();
        if (Number(b.dataset.andeanOption) !== c.correct) {
          const retryMsg = lang === 'es'
            ? 'Revisa el contexto y vuelve a intentarlo.'
            : lang === 'pt-BR'
            ? 'Revise o contexto e tente novamente.'
            : 'Review the context and try again.';
          return this.render(retryMsg);
        }

        if (this.chapterIndex < chapters.length - 1) {
          this.chapterIndex++;
          localStorage.setItem('ancestria_andean_journey_v1', String(this.chapterIndex));
          return this.render();
        }

        localStorage.setItem('ancestria_andean_journey_v1', String(chapters.length));
        if (!localStorage.getItem('ancestria_andean_journey_v1_rewarded')) {
          GameState.getInstance().addKnowledgeFragments(30);
          localStorage.setItem('ancestria_andean_journey_v1_rewarded', '1');
        }
        this.complete();
      });
    });
  }

  private complete(): void {
    const lang = getLanguage();
    const copy = {
      badge: lang === 'es' ? 'MEMORIA REGISTRADA' : lang === 'pt-BR' ? 'MEMÓRIA REGISTRADA' : 'MEMORY RECORDED',
      title: lang === 'es' ? 'Recorrido andino completado' : lang === 'pt-BR' ? 'Percurso andino concluído' : 'Andean journey completed',
      text: lang === 'es'
        ? 'Exploraste caminos, agricultura de altura y khipus respetando la diversidad de pueblos, territorios y fuentes.'
        : lang === 'pt-BR'
        ? 'Você explorou caminhos, agricultura de altitude e quipus respeitando a diversidade de povos, territórios e fontes.'
        : 'You explored roads, highland terraces, and khipus honoring the diversity of Andean peoples and sources.',
      button: lang === 'es' ? 'Volver a los recorridos' : lang === 'pt-BR' ? 'Voltar aos percursos' : 'Return to journeys'
    };

    this.container.innerHTML = `
      <div class="mexica-journey-overlay">
        <article class="mexica-journey-window mexica-complete">
          <span class="completion-symbol">✦</span>
          <span class="badge">${copy.badge}</span>
          <h2>${copy.title}</h2>
          <p>${copy.text}</p>
          <button class="btn-menu-primary" id="andean-finish">${copy.button}</button>
        </article>
      </div>
    `;

    this.container.querySelector('#andean-finish')?.addEventListener('click', () => {
      this.close();
      this.onBack();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
