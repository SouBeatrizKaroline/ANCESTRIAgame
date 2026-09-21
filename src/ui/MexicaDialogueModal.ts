import { AudioManager } from '../engine/AudioManager';
import { GameState } from '../state/GameState';
import { getLanguage } from '../i18n';

interface DialogueOption {
  text: string;
  correct: boolean;
  response: string;
}

interface DialogueEntry {
  role: string;
  letter: string;
  intro: string;
  question: string;
  options: DialogueOption[];
  source: string;
}

const dialoguesTrilingual: Record<string, Record<'es' | 'pt-BR' | 'en', DialogueEntry>> = {
  npc_mexica_chinampa: {
    es: {
      role: 'Cuidadora de chinampa · personaje educativo',
      letter: 'C',
      intro: 'Este personaje sintetiza conocimientos documentados sobre las chinampas; no representa a una persona histórica específica. Observa cómo suelo, canales, ahuejotes y trabajo continuo forman un agroecosistema equilibrado.',
      question: '¿Qué afirmación describe con mayor rigor una chinampa?',
      options: [
        { text: 'Es una parcela construida y mantenida con lodo y vegetación en un entorno lacustre', correct: true, response: 'Correcto. Se construye con capas de lodo, carrizo y materia orgánica, fijada por las raíces de los ahuejotes.' },
        { text: 'Es una isla flotante natural que navega sin mantenimiento humano', correct: false, response: 'No. Las chinampas están ancladas al lecho lacustre y requieren manejo constante de humedad y tierra.' },
        { text: 'Fue una técnica exclusiva desarrollada únicamente en el siglo XV', correct: false, response: 'La agricultura de chinampas tiene siglos de antigüedad en la cuencalacustre mesoamericana.' }
      ],
      source: 'INAH · sistema chinampero y Museo del Templo Mayor'
    },
    'pt-BR': {
      role: 'Cuidadora de chinampa · personagem educativo',
      letter: 'C',
      intro: 'Esta figura sintetiza saberes documentados sobre as chinampas; não representa uma pessoa histórica específica. Observe como solo, canais, ahuejotes e trabalho contínuo formam um agroecossistema equilibrado.',
      question: 'Qual afirmação descreve com mais rigor uma chinampa?',
      options: [
        { text: 'É uma parcela construída e mantida com lodo e vegetação em ambiente lacustre', correct: true, response: 'Correto. Constrói-se com camadas de lodo e matéria vegetal, fixada pelas raízes dos salgueiros ahuejotes.' },
        { text: 'É uma ilha flutuante natural que navega sem manutenção humana', correct: false, response: 'Não. As chinampas são ancoradas no leito e exigem manejo contínuo de umidade e solo.' },
        { text: 'Foi uma técnica exclusiva desenvolvida apenas no século XV', correct: false, response: 'A agricultura chinampeira tem séculos de história na bacia lacustre mesoamericana.' }
      ],
      source: 'INAH · sistema chinampero e Museu do Templo Maior'
    },
    en: {
      role: 'Chinampa keeper · educational guide',
      letter: 'C',
      intro: 'This figure synthesizes documented knowledge about chinampas; it does not represent an invented historical individual. Notice how soil, canals, willow trees, and continuous care form a balanced wetland ecosystem.',
      question: 'Which statement most accurately describes a chinampa?',
      options: [
        { text: 'A built and maintained wetland agricultural plot made with lake mud and vegetation', correct: true, response: 'Correct. Built with layers of lake mud and organic sediment, anchored by ahuejote willow roots.' },
        { text: 'A naturally floating island that drifts freely without human care', correct: false, response: 'No. Chinampas are anchored to the lakebed and require continuous stewardship of water and soil.' },
        { text: 'An exclusive technique created only in the late 15th century', correct: false, response: 'Chinampa agriculture spans centuries of indigenous ecological engineering in the Basin of Mexico.' }
      ],
      source: 'INAH · chinampa system and Museo del Templo Mayor'
    }
  },
  npc_mexica_market: {
    es: {
      role: 'Comerciante de Tlatelolco · personaje educativo',
      letter: 'T',
      intro: 'Esta figura educativa presenta el gran mercado de Tlatelolco como una red viva de intercambio entre pueblos y regiones diversas de Mesoamérica.',
      question: '¿Qué mirada representa mejor al mercado de Tlatelolco?',
      options: [
        { text: 'Una red regional que conectaba diversos territorios, productos y acuerdos políticos', correct: true, response: 'Correcto. Los comerciantes (pochtecas) articulaban rutas complejas entre tierras altas, costas y selvas.' },
        { text: 'Un mercado abastecido únicamente por una sola ciudad sin contacto externo', correct: false, response: 'Esa visión ignora las complejas redes interregionales de intercambio en Mesoamérica.' },
        { text: 'Una prueba de que toda Mesoamérica formaba una sola cultura idéntica', correct: false, response: 'No. El comercio conectaba sociedades diversas sin borrar sus lenguas, historias e identidades.' }
      ],
      source: 'Museo del Templo Mayor · Bernal Díaz / Sahagún contexto'
    },
    'pt-BR': {
      role: 'Comerciante de Tlatelolco · personagem educativo',
      letter: 'T',
      intro: 'Esta figura educativa apresenta o grande mercado de Tlatelolco como uma rede viva de intercâmbio entre povos e regiões diversas da Mesoamérica.',
      question: 'Qual perspectiva representa melhor o mercado de Tlatelolco?',
      options: [
        { text: 'Uma rede regional que conectava diversos territórios, produtos e acordos políticos', correct: true, response: 'Correto. Comerciantes articulavam rotas entre terras altas, costas e florestas.' },
        { text: 'Um mercado abastecido somente por uma única cidade sem contato externo', correct: false, response: 'Essa visão ignora as complexas redes inter-regionais de troca na Mesoamérica.' },
        { text: 'Uma prova de que toda a Mesoamérica formava uma única cultura idêntica', correct: false, response: 'Não. O comércio conectava sociedades diversas sem apagar suas línguas e identidades.' }
      ],
      source: 'Museu do Templo Maior · contexto histórico e material'
    },
    en: {
      role: 'Tlatelolco trader · educational guide',
      letter: 'T',
      intro: 'This educational guide presents the great market of Tlatelolco as a vibrant regional network connecting diverse peoples and ecologies across Mesoamerica.',
      question: 'Which perspective best reflects the Tlatelolco market?',
      options: [
        { text: 'A regional network connecting diverse territories, goods, and political relationships', correct: true, response: 'Correct. Traders (pochtecas) linked highlands, coasts, and rainforests in complex exchange networks.' },
        { text: 'A market supplied solely by one city without any external connections', correct: false, response: 'That overlooks the vast regional trade routes across Mesoamerican territories.' },
        { text: 'Proof that all of Mesoamerica formed a single identical culture', correct: false, response: 'No. Commercial exchange connected distinct societies without erasing their languages or identities.' }
      ],
      source: 'Museo del Templo Mayor · historical and archaeological context'
    }
  },
  npc_mexica_language: {
    es: {
      role: 'Mediadora de memoria nahua · personaje educativo',
      letter: 'N',
      intro: 'Esta figura conecta fuentes históricas como la Crónica Mexicáyotl con la presencia viva del náhuatl y sus variantes contemporáneas.',
      question: '¿Cómo debe presentarse el náhuatl en un contexto educativo respetuoso?',
      options: [
        { text: 'Como una lengua viva y diversa, con literatura, creación y hablantes contemporáneos', correct: true, response: 'Correcto. Más de 1.5 millones de personas hablan variantes del náhuatl en comunidades vivas hoy.' },
        { text: 'Como una lengua muerta que desapareció totalmente tras la colonización', correct: false, response: 'No. El náhuatl continúa vivo en múltiples regiones de México y en la producción poética contemporánea.' },
        { text: 'Como un dialecto simple sin gramática ni tradición literaria', correct: false, response: 'El náhuatl posee una literatura poética y filosófica ancestral riquísima y gramática estructurada.' }
      ],
      source: 'INALI · escritores y hablantes nahuas contemporáneos / UNAM'
    },
    'pt-BR': {
      role: 'Mediadora de memória náuatle · personagem educativo',
      letter: 'N',
      intro: 'Esta figura conecta fontes históricas como a Crónica Mexicáyotl à presença viva da língua náuatle e suas variantes contemporâneas.',
      question: 'Como a língua náuatle deve ser apresentada em contexto educativo respeitoso?',
      options: [
        { text: 'Como uma língua viva e diversa, com literatura, criação e falantes contemporâneos', correct: true, response: 'Correto. Mais de 1,5 milhão de pessoas falam variantes do náuatle em comunidades vivas hoje.' },
        { text: 'Como uma língua morta que desapareceu totalmente após a colonização', correct: false, response: 'Não. O náuatle segue vivo em múltiplas regiões do México e na produção poética contemporânea.' },
        { text: 'Como um dialeto simples sem gramática nem tradição literária', correct: false, response: 'O náuatle possui riquíssima literatura poética e filosófica ancestral e gramática estruturada.' }
      ],
      source: 'INALI · autores e falantes nahuas contemporâneos / UNAM'
    },
    en: {
      role: 'Nahua memory mediator · educational guide',
      letter: 'N',
      intro: 'This figure connects historical chronicles such as the Crónica Mexicáyotl with the contemporary reality of living Nahuatl speakers and authors.',
      question: 'How should Nahuatl be presented in a respectful educational context?',
      options: [
        { text: 'As a living, diverse language with contemporary speakers, literature, and culture', correct: true, response: 'Correct. Over 1.5 million people speak Nahuatl varieties in vibrant communities today.' },
        { text: 'As an extinct tongue that vanished completely following colonization', correct: false, response: 'No. Nahuatl continues to thrive across multiple regions and in modern literature.' },
        { text: 'As a primitive dialect without formal grammar or literary tradition', correct: false, response: 'Nahuatl has a profound philosophical, poetic, and historical literary heritage.' }
      ],
      source: 'INALI · contemporary Nahua authors and speakers / UNAM'
    }
  }
};

export class MexicaDialogueModal {
  constructor(private container: HTMLElement, private onProgress: () => void = () => {}) {}

  public show(npcId: keyof typeof dialoguesTrilingual): void {
    const lang = getLanguage();
    const node = dialoguesTrilingual[npcId]?.[lang] || dialoguesTrilingual[npcId]?.es;
    if (!node) return;

    const options = [...node.options].sort(() => Math.random() - 0.5);
    const closeLabel = lang === 'es' ? 'Cerrar diálogo' : lang === 'pt-BR' ? 'Fechar diálogo' : 'Close dialogue';
    const sourceLabel = lang === 'es' ? 'Síntesis educativa' : lang === 'pt-BR' ? 'Síntese educativa' : 'Educational synthesis';
    const continueLabel = lang === 'es' ? 'Continuar la exploración' : lang === 'pt-BR' ? 'Continuar a exploração' : 'Continue exploration';
    const correctNote = lang === 'es' ? '✓ Respuesta contextualizada' : lang === 'pt-BR' ? '✓ Resposta contextualizada' : '✓ Contextualized answer';
    const retryNote = lang === 'es' ? 'Revisa el contexto y vuelve a conversar si quieres intentarlo de nuevo.' : lang === 'pt-BR' ? 'Revise o contexto e volte a conversar se quiser tentar de novo.' : 'Review the context and talk again to retry.';

    this.container.innerHTML = `
      <div class="dialogue-modal-overlay">
        <div class="dialogue-box mexica-dialogue-box">
          <div class="dialogue-speaker-banner">
            <div class="speaker-avatar">
              <span class="avatar-letter">${node.letter}</span>
            </div>
            <div class="speaker-meta">
              <h3 class="speaker-name">${node.role.split(' · ')[0]}</h3>
              <span class="speaker-role">${node.role}</span>
            </div>
            <button class="btn-close-dialogue" id="btn-close-mexica-dialogue" aria-label="${closeLabel}">&times;</button>
          </div>
          <div class="dialogue-body">
            <p class="dialogue-text">${node.intro}</p>
            <aside class="dialogue-source-note">${sourceLabel} · ${node.source}</aside>
            <h4>${node.question}</h4>
          </div>
          <div class="dialogue-choices" id="mexica-dialogue-choices">
            ${options.map((o, i) => `
              <button class="btn-dialogue-choice" data-mexica-answer="${i}">
                <span class="choice-arrow">➤</span>
                <span>${o.text}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.container.querySelector('#btn-close-mexica-dialogue')?.addEventListener('click', () => this.close());

    this.container.querySelectorAll<HTMLButtonElement>('[data-mexica-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        const option = options[Number(button.dataset.mexicaAnswer)];
        AudioManager.getInstance().playInteract();
        const body = this.container.querySelector('.dialogue-body');
        if (body) {
          body.innerHTML = `
            <p class="dialogue-text">${option.response}</p>
            <aside class="dialogue-source-note">${option.correct ? correctNote : retryNote}</aside>
          `;
        }

        if (option.correct) {
          const key = `ancestria_dialogue_${npcId}`;
          if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            GameState.getInstance().addKnowledgeFragments(10);
          }
        }

        const choices = this.container.querySelector('#mexica-dialogue-choices');
        if (choices) {
          choices.innerHTML = `
            <button class="btn-dialogue-choice" id="finish-mexica-dialogue">
              <span class="choice-arrow">✓</span>
              <span>${continueLabel}</span>
            </button>
          `;
        }

        this.container.querySelector('#finish-mexica-dialogue')?.addEventListener('click', () => {
          this.close();
          if (option.correct) this.onProgress();
        });
      });
    });
  }

  public close(): void {
    this.container.innerHTML = '';
  }
}
