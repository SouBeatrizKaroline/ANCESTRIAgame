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
    clothingDescription: 'Túnica verde y lliclla bordada con flores de quinua, sosteniendo una selección de mazorcas.',
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
    clothingDescription: 'Manto ocre con cuello tejido y quipus de diversos colores en sus brazos.',
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
    clothingDescription: 'Delantal reforzado de cuero crudo, sosteniendo percutor lítico de hematita pulida.',
    dialogueRootId: 'dia_wayra_intro'
  }
];

export const ANDES_DIALOGUES: Record<string, DialogueNode> = {
  dia_kuntur_intro: {
    id: 'dia_kuntur_intro',
    npcId: 'npc_kuntur',
    speakerName: 'Kuntur (chasqui)',
    role: 'Mensajero del Qhapaq Ñan',
    text: '¡Allillanchu, viajero! Bienvenido a las rutas del Tawantinsuyu. Soy Kuntur, un chasqui. Recorro senderos de cordillera y valle llevando encargos y quipus oficiales entre comunidades.',
    choices: [
      {
        text: '¿Cómo recorrían con tanta rapidez montañas tan altas?',
        response: 'Nos preparábamos desde jóvenes para el aire de las punas. Corríamos por relevos entre puestos llamados chaskiwasi. Al acercarme, tocaba el pututu para avisar al siguiente corredor.'
      },
      {
        text: '¿Qué llevas en esa bolsa?',
        response: 'Llevo quipus con mensajes codificados en nudos y colores, además de provisiones urgentes entre gobernadores provinciales.',
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
    text: 'Bienvenido a los andenes. Generaciones de pueblos andinos desarrollaron formas de cultivar en distintas alturas y condiciones climáticas extremas.',
    choices: [
      {
        text: '¿Por qué cultivar en terrazas y no solamente en el fondo del valle?',
        response: 'Las terrazas amplían el área de cultivo, manejan el agua de deshielo y crean condiciones térmicas diferentes según la altura. Sus muros conservan el calor del día para la noche.',
        unlockDiscoveryId: 'disc_andenes',
        giveFragments: 25
      },
      {
        text: 'Quiero poner a prueba lo que aprendí sobre los cultivos.',
        response: 'Cada cultivo necesita condiciones específicas: coca en los pisos bajos cálidos, maíz en los valles templados, y papas y quinua en las punas frías.'
      }
    ],
    triggerMinigameId: 'terraces'
  },

  dia_tupaq_intro: {
    id: 'dia_tupaq_intro',
    npcId: 'npc_tupaq',
    speakerName: 'Tupaq',
    role: 'Quipucamayoc de los almacenes qullqa',
    text: 'Saludos. Las qullqas conservan alimentos obtenidos mediante trabajos comunitarios de la Minka. Los quipus permiten registrar cantidades y categorías mediante cuerdas, colores y nudos.',
    choices: [
      {
        text: '¿Cómo pueden las cuerdas y los nudos registrar cantidades?',
        response: 'En nuestros quipus, la posición de los nudos representa unidades, decenas y centenas en sistema decimal. Los colores y tipos de fibra distinguen los productos registrados.',
        unlockDiscoveryId: 'disc_quipu',
        giveFragments: 25
      },
      {
        text: '¿Puedes enseñarme a interpretar un quipu de suministros?',
        response: 'Observa los nudos y sus posiciones en el cordón amarillo del maíz y calcula la suma total almacenada.'
      }
    ],
    triggerMinigameId: 'quipu'
  },

  dia_wayra_intro: {
    id: 'dia_wayra_intro',
    npcId: 'npc_wayra',
    speakerName: 'Wayra',
    role: 'Maestro cantero y constructor',
    text: 'La piedra forma parte viva del territorio. La cantería andina creó muros de bloques cuidadosamente ajustados, capaces de responder y resistir movimientos sísmicos.',
    choices: [
      {
        text: '¿Cómo resisten estos muros los movimientos sísmicos sin cemento?',
        response: 'La forma de los bloques almohadillados, sus juntas poligonales y la inclinación de los muros distribuyen la energía. Cuando la tierra tiembla, las piedras vibran y se asientan en su lugar.',
        unlockDiscoveryId: 'disc_cantaria',
        giveFragments: 25
      },
      {
        text: '¿Puedo practicar el ajuste de una piedra poligonal?',
        response: 'Toma el percutor lítico de hematita y el abrasivo de arena húmeda. Ajusta la piedra central con las piezas de apoyo con precisión milimétrica.'
      }
    ],
    triggerMinigameId: 'stonework'
  }
};
