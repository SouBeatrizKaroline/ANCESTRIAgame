import { Mission } from '../types';

export const ANDES_MISSIONS: Mission[] = [
  {
    id: 'mission_main_andes',
    title: 'El llamado del Tawantinsuyu: la sabiduría de las alturas',
    type: 'principal',
    regionId: 'andes',
    cultureId: 'inca',
    summary: 'Conoce tres dimensiones de la vida andina — comunicación, agricultura vertical y registro — y documenta lo aprendido en ANCESTRIA.',
    rewardFragments: 100,
    historicalContext: 'El Tawantinsuyu articuló caminos, terrazas ecológicas y quipus a lo largo de miles de kilómetros de cordillera.',
    isActive: true,
    isCompleted: false,
    steps: [
      {
        id: 'step_talk_kuntur',
        description: 'Habla con Kuntur, el chasqui, al inicio de los caminos de piedra.',
        isCompleted: false,
        targetEntityId: 'npc_kuntur'
      },
      {
        id: 'step_solve_terraces',
        description: 'Aprende con Sumaq sobre los andenes y organiza los cultivos según la altitud.',
        isCompleted: false,
        targetEntityId: 'minigame_terraces'
      },
      {
        id: 'step_solve_quipu',
        description: 'Descifra con Tupaq el quipu de reservas en el almacén qullqa.',
        isCompleted: false,
        targetEntityId: 'minigame_quipu'
      },
      {
        id: 'step_solve_stonework',
        description: 'Ayuda a Wayra a ajustar la piedra poligonal en el muro sismorresistente.',
        isCompleted: false,
        targetEntityId: 'minigame_stonework'
      },
      {
        id: 'step_intihuatana',
        description: 'Visita el marcador solar Intihuatana para concluir el registro.',
        isCompleted: false,
        targetEntityId: 'obj_intihuatana'
      }
    ],
    unlocksJournalDiscoveryIds: ['disc_qhapaq_nan', 'disc_andenes', 'disc_quipu', 'disc_cantaria', 'disc_intihuatana']
  },
  {
    id: 'mission_sec_andenes',
    title: 'El secreto de los pisos ecológicos',
    type: 'secundaria',
    regionId: 'andes',
    cultureId: 'inca',
    summary: 'Comprende cómo el drenaje de los andenes reduce la erosión y conserva calor frente a las heladas.',
    rewardFragments: 50,
    historicalContext: 'Os andenes não eram simples degraus de terra: eram laboratórios térmicos que chegavam a criar microclimas com até 3°C a 5°C acima da temperatura externa noturna.',
    isActive: false,
    isCompleted: false,
    steps: [
      {
        id: 'step_sec_andenes_talk',
        description: 'Pregunta a Sumaq por el drenaje subterráneo de los andenes.',
        isCompleted: false,
        targetEntityId: 'npc_sumaq'
      },
      {
        id: 'step_sec_andenes_inspect',
        description: 'Examina los canales de piedra que distribuyen el agua entre las terrazas.',
        isCompleted: false,
        targetEntityId: 'obj_terraces_canal'
      }
    ],
    unlocksJournalDiscoveryIds: ['disc_ayllu', 'disc_chuno']
  },
  {
    id: 'mission_sec_quipu',
    title: 'La memoria de los hilos de colores',
    type: 'secundaria',
    regionId: 'andes',
    cultureId: 'inca',
    summary: 'Explore o depósito imperial (Qullqa) e compreenda como o sistema decimal era registrado em cordões de lã e algodão.',
    rewardFragments: 50,
    historicalContext: 'Pesquisadores como Gary Urton documentaram que os nós eram amarrados em orientações específicas (S ou Z), combinando cores distintas para representar tributos, censos e produtos agrícolas.',
    isActive: false,
    isCompleted: false,
    steps: [
      {
        id: 'step_sec_quipu_read',
        description: 'Analiza el quipu con Tupaq e identifica los colores del maíz y las papas.',
        isCompleted: false,
        targetEntityId: 'npc_tupaq'
      },
      {
        id: 'step_sec_quipu_qullqa',
        description: 'Inspecciona la ventilación de la qullqa que ayuda a conservar los alimentos.',
        isCompleted: false,
        targetEntityId: 'obj_qullqa_deposito'
      }
    ],
    unlocksJournalDiscoveryIds: ['disc_qullqa', 'disc_runa_simi']
  }
];
