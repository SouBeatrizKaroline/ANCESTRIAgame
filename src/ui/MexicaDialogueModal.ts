import { AudioManager } from '../engine/AudioManager';
import { GameState } from '../state/GameState';

const dialogues = {
  npc_mexica_chinampa: {
    role: 'Cuidadora de chinampa · personaje educativo', letter: 'C',
    intro: 'Este personaje sintetiza conocimientos documentados sobre las chinampas; no representa a una persona histórica específica. Observa cómo suelo, canales, vegetación y trabajo continuo forman un sistema relacionado.',
    question: '¿Qué afirmación describe mejor una chinampa?',
    options: [
      { text: 'Es una parcela construida y mantenida en un entorno lacustre', correct: true, response: 'Correcto. Se construye con materiales del entorno y depende del manejo de canales, suelo, humedad y vegetación.' },
      { text: 'Es una isla natural que no necesita mantenimiento', correct: false, response: 'No exactamente. Es un espacio construido y requiere trabajo y mantenimiento continuos.' },
      { text: 'Fue una invención exclusiva de una sola ciudad', correct: false, response: 'La práctica tiene una historia larga en la cuenca y no debe atribuirse de manera exclusiva a un solo pueblo.' }
    ], source: 'INAH · sistema chinampero'
  },
  npc_mexica_market: {
    role: 'Comerciante de Tlatelolco · personaje educativo', letter: 'T',
    intro: 'Esta figura educativa presenta el mercado como una red de intercambio entre territorios diversos. También recuerda que comercio, alianzas, tributos y relaciones de poder no significaban lo mismo.',
    question: '¿Qué mirada representa mejor al mercado de Tlatelolco?',
    options: [
      { text: 'Una red conectada con múltiples pueblos, productos y relaciones políticas', correct: true, response: 'Correcto. Los productos y comerciantes procedían de diferentes territorios, dentro de relaciones económicas y políticas complejas.' },
      { text: 'Un mercado abastecido únicamente por Mexico-Tenochtitlan', correct: false, response: 'Esa explicación oculta las redes regionales y la participación de numerosos pueblos.' },
      { text: 'Una prueba de que toda Mesoamérica era una única cultura', correct: false, response: 'No. El intercambio conectaba sociedades distintas; no eliminaba sus identidades ni diferencias.' }
    ], source: 'Museo del Templo Mayor · contexto de Mexico-Tenochtitlan'
  },
  npc_mexica_language: {
    role: 'Mediadora de memoria y lengua · personaje educativo', letter: 'N',
    intro: 'Esta figura conecta fuentes históricas nahuas con la presencia contemporánea del náhuatl. Las voces actuales hablan desde su propio presente y no son usadas para inventar testimonios del siglo XV.',
    question: '¿Cómo debe presentarse el náhuatl?',
    options: [
      { text: 'Como una lengua viva, diversa y contemporánea', correct: true, response: 'Correcto. Existen variantes, comunidades de hablantes, literatura y acciones actuales de fortalecimiento lingüístico.' },
      { text: 'Como una lengua que desapareció durante la colonización', correct: false, response: 'No. El náhuatl continúa vivo en distintas comunidades y formas de creación contemporánea.' },
      { text: 'Como una lengua idéntica en todas las regiones', correct: false, response: 'No. Es importante reconocer sus variantes y los contextos propios de cada comunidad.' }
    ], source: 'INALI · autores y hablantes nahuas contemporáneos'
  }
} as const;

export class MexicaDialogueModal {
  constructor(private container: HTMLElement, private onProgress: () => void = () => {}) {}
  public show(npcId: keyof typeof dialogues): void {
    const node = dialogues[npcId];
    const options = [...node.options].sort(() => Math.random() - .5);
    this.container.innerHTML = `<div class="dialogue-modal-overlay"><div class="dialogue-box mexica-dialogue-box"><div class="dialogue-speaker-banner"><div class="speaker-avatar"><span class="avatar-letter">${node.letter}</span></div><div class="speaker-meta"><h3 class="speaker-name">${node.role.split(' · ')[0]}</h3><span class="speaker-role">${node.role}</span></div><button class="btn-close-dialogue" id="btn-close-mexica-dialogue" aria-label="Cerrar diálogo">&times;</button></div><div class="dialogue-body"><p class="dialogue-text">${node.intro}</p><aside class="dialogue-source-note">Síntesis educativa · ${node.source}</aside><h4>${node.question}</h4></div><div class="dialogue-choices" id="mexica-dialogue-choices">${options.map((o, i) => `<button class="btn-dialogue-choice" data-mexica-answer="${i}"><span class="choice-arrow">➤</span><span>${o.text}</span></button>`).join('')}</div></div></div>`;
    this.container.querySelector('#btn-close-mexica-dialogue')?.addEventListener('click', () => this.close());
    this.container.querySelectorAll<HTMLButtonElement>('[data-mexica-answer]').forEach((button) => button.addEventListener('click', () => {
      const option = options[Number(button.dataset.mexicaAnswer)]; AudioManager.getInstance().playInteract();
      const body = this.container.querySelector('.dialogue-body');
      if (body) body.innerHTML = `<p class="dialogue-text">${option.response}</p><aside class="dialogue-source-note">${option.correct ? '✓ Respuesta contextualizada' : 'Revisa el contexto y vuelve a conversar si quieres intentarlo de nuevo.'}</aside>`;
      if (option.correct) { const key = `ancestria_dialogue_${npcId}`; if (!localStorage.getItem(key)) { localStorage.setItem(key, '1'); GameState.getInstance().addKnowledgeFragments(10); } }
      const choices = this.container.querySelector('#mexica-dialogue-choices'); if (choices) choices.innerHTML = `<button class="btn-dialogue-choice" id="finish-mexica-dialogue"><span class="choice-arrow">✓</span><span>Continuar la exploración</span></button>`;
      this.container.querySelector('#finish-mexica-dialogue')?.addEventListener('click', () => { this.close(); if(option.correct)this.onProgress(); });
    }));
  }
  public close(): void { this.container.innerHTML = ''; }
}
