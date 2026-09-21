import { DialogueNode, NPC } from '../types';

export const ANDES_NPCS: NPC[] = [
  {
    id: 'npc_kuntur',
    name: 'Kuntur',
    role: 'Chasqui de los caminos reales (Qhapaq Ñan)',
    regionId: 'andes',
    cultureId: 'inca',
    position: { x: 2, y: 0.6, z: 8 },
    rotationY: 0,
    visualColor: '#e07a5f',
    clothingDescription: 'Poncho rojo con diseños tokapu geométricos, sandalias y un pututu en la cintura.',
    dialogueRootId: 'dia_kuntur_intro'
  },
  {
    id: 'npc_sumaq',
    name: 'Sumaq',
    role: 'Maestra de andenes y semillas',
    regionId: 'andes',
    cultureId: 'inca',
    position: { x: -8, y: 1.4, z: 2 },
    rotationY: Math.PI / 4,
    visualColor: '#81b29a',
    clothingDescription: 'Túnica verde e lliclla bordada com flores de quinoa, segurando um feixe de espigas coloridas.',
    dialogueRootId: 'dia_sumaq_intro'
  },
  {
    id: 'npc_tupaq',
    name: 'Tupaq',
    role: 'Quipucamayoc de los almacenes qullqa',
    regionId: 'andes',
    cultureId: 'inca',
    position: { x: 8, y: 1.8, z: -4 },
    rotationY: -Math.PI / 3,
    visualColor: '#f2cc8f',
    clothingDescription: 'Manto ocre com gola tecida e quipus de várias cores atados nos braços.',
    dialogueRootId: 'dia_tupaq_intro'
  },
  {
    id: 'npc_wayra',
    name: 'Wayra',
    role: 'Maestro cantero y escultor de piedra',
    regionId: 'andes',
    cultureId: 'inca',
    position: { x: -4, y: 2.2, z: -8 },
    rotationY: Math.PI / 2,
    visualColor: '#3d405b',
    clothingDescription: 'Avental reforçado de couro cru, segurando martelo de hematita polida.',
    dialogueRootId: 'dia_wayra_intro'
  }
];

export const ANDES_DIALOGUES: Record<string, DialogueNode> = {
  dia_kuntur_intro: {
    id: 'dia_kuntur_intro',
    npcId: 'npc_kuntur',
    speakerName: 'Kuntur (chasqui)',
    role: 'Mensajero del Qhapaq Ñan',
    text: '¡Allillanchu, viajante! Bienvenido a los caminos del Tawantinsuyu. Soy Kuntur, un chasqui. Recorro valles y montañas llevando mensajes entre distintos territorios andinos.',
    choices: [
      {
        text: '¿Cómo recorrían con tanta rapidez montañas tan altas?',
        response: 'Nos preparábamos desde jóvenes para el aire de las punas. Corríamos por relevos entre puestos llamados chaskiwasi. Al acercarme, tocaba el pututu para avisar al siguiente corredor.'
      },
      {
        text: '¿Qué llevas en esa bolsa?',
        response: 'Llevo quipus y avisos entre autoridades de diferentes territorios. Los nudos, colores y formas de las cuerdas registran información.',
        unlockDiscoveryId: 'disc_qhapaq_nan',
        giveFragments: 25
      },
      {
        text: '¿Dónde puedo conocer otros saberes de este territorio?',
        response: 'Visita los andenes para hablar con Sumaq, busca a Tupaq junto a las qullqas y conoce a Wayra en el espacio de cantería.'
      }
    ]
  },

  dia_sumaq_intro: {
    id: 'dia_sumaq_intro',
    npcId: 'npc_sumaq',
    speakerName: 'Sumaq',
    role: 'Maestra de andenes y cultivos',
    text: 'Bienvenido a los andenes. Generaciones de pueblos andinos desarrollaron formas de cultivar en distintas alturas y condiciones climáticas.',
    choices: [
      {
        text: '¿Por qué cultivar en terrazas y no solamente en el fondo del valle?',
        response: 'Las terrazas amplían el área de cultivo, ayudan a manejar el agua y crean condiciones diferentes según la altura. Sus muros también pueden conservar parte del calor del día.',
        unlockDiscoveryId: 'disc_andenes',
        giveFragments: 25
      },
      {
        text: 'Quiero poner a prueba lo que aprendí sobre los cultivos.',
        response: 'Cada cultivo necesita condiciones específicas. Observa la altura y el clima antes de organizar las plantas.'
      }
    ],
    triggerMinigameId: 'terraces'
  },

  dia_tupaq_intro: {
    id: 'dia_tupaq_intro',
    npcId: 'npc_tupaq',
    speakerName: 'Tupaq',
    role: 'Quipucamayoc de los almacenes qullqa',
    text: 'Saludos. Las qullqas conservan alimentos obtenidos mediante trabajos comunitarios. Los quipus permiten registrar cantidades y categorías mediante cuerdas, colores y nudos.',
    choices: [
      {
        text: '¿Cómo pueden las cuerdas y los nudos registrar cantidades?',
        response: 'En muchos quipus, la posición de los nudos representa unidades, decenas y centenas. Los colores y la estructura ayudan a distinguir categorías.',
        unlockDiscoveryId: 'disc_quipu',
        giveFragments: 25
      },
      {
        text: '¿Puedes enseñarme a interpretar un quipu de suministros?',
        response: 'Observa los nudos y sus posiciones. Después calcula el valor registrado en el cordón.'
      }
    ],
    triggerMinigameId: 'quipu'
  },

  dia_wayra_intro: {
    id: 'dia_wayra_intro',
    npcId: 'npc_wayra',
    speakerName: 'Wayra',
    role: 'Maestro cantero y constructor',
    text: 'La piedra forma parte del territorio y exige atención. La cantería andina creó muros de bloques cuidadosamente ajustados, capaces de responder a movimientos sísmicos.',
    choices: [
      {
        text: '¿Cómo resisten estos muros los movimientos sísmicos?',
        response: 'La forma de los bloques, sus uniones y la inclinación de ciertos elementos distribuyen el movimiento. Las técnicas varían según el lugar y la construcción.',
        unlockDiscoveryId: 'disc_cantaria',
        giveFragments: 25
      },
      {
        text: '¿Puedo practicar el ajuste de una piedra poligonal?',
        response: 'Observa los ángulos y usa el pulido abrasivo para aproximar la pieza al espacio del muro.'
      }
    ],
    triggerMinigameId: 'stonework'
  }
};
