import { Mission } from '../types';

export const ANDES_MISSIONS: Mission[] = [
  {
    id: 'mission_main_andes',
    title: 'O Chamado do Tawantinsuyu: A Sabedoria das Alturas',
    type: 'principal',
    regionId: 'andes',
    cultureId: 'inca',
    summary: 'Aprenda os três pilares da civilização andina (comunicação, agricultura vertical e registro) e registre o conhecimento no Atlas das Origens.',
    rewardFragments: 100,
    historicalContext: 'O Tawantinsuyu manteve a coesão de milhões de habitantes ao longo de 4.000 km de cordilheira sem uso de rodas ou escrita alfabética, articulando estradas, terraços ecológicos e quipus.',
    isActive: true,
    isCompleted: false,
    steps: [
      {
        id: 'step_talk_kuntur',
        description: 'Converse com Kuntur, o Chasqui, no início dos caminhos de pedra.',
        isCompleted: false,
        targetEntityId: 'npc_kuntur'
      },
      {
        id: 'step_solve_terraces',
        description: 'Aprenda o manejo dos andenes com Sumaq e organize os cultivos por altitude.',
        isCompleted: false,
        targetEntityId: 'minigame_terraces'
      },
      {
        id: 'step_solve_quipu',
        description: 'Decifre o quipu de estoques com o sábio Tupaq no armazém Qullqa.',
        isCompleted: false,
        targetEntityId: 'minigame_quipu'
      },
      {
        id: 'step_solve_stonework',
        description: 'Ajude o mestre Wayra a ajustar a pedra poligonal na muralha sismorresistente.',
        isCompleted: false,
        targetEntityId: 'minigame_stonework'
      },
      {
        id: 'step_intihuatana',
        description: 'Visite o marco solar Intihuatana no topo da aldeia para concluir o registro.',
        isCompleted: false,
        targetEntityId: 'obj_intihuatana'
      }
    ],
    unlocksJournalDiscoveryIds: ['disc_qhapaq_nan', 'disc_andenes', 'disc_quipu', 'disc_cantaria', 'disc_intihuatana']
  },
  {
    id: 'mission_sec_andenes',
    title: 'O Segredo dos Pisos Ecológicos',
    type: 'secundaria',
    regionId: 'andes',
    cultureId: 'inca',
    summary: 'Compreenda como a drenagem por camadas de cascalho e pedras nos terraços previne a erosão e armazena calor contra geadas.',
    rewardFragments: 50,
    historicalContext: 'Os andenes não eram simples degraus de terra: eram laboratórios térmicos que chegavam a criar microclimas com até 3°C a 5°C acima da temperatura externa noturna.',
    isActive: false,
    isCompleted: false,
    steps: [
      {
        id: 'step_sec_andenes_talk',
        description: 'Pergunte a Sumaq sobre a técnica de drenagem subterrânea dos andenes.',
        isCompleted: false,
        targetEntityId: 'npc_sumaq'
      },
      {
        id: 'step_sec_andenes_inspect',
        description: 'Examine os canais de pedra que distribuem a água do degrau superior ao inferior.',
        isCompleted: false,
        targetEntityId: 'obj_terraces_canal'
      }
    ],
    unlocksJournalDiscoveryIds: ['disc_ayllu', 'disc_chuno']
  },
  {
    id: 'mission_sec_quipu',
    title: 'A Memória dos Fios Coloridos',
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
        description: 'Analise o quipu principal com Tupaq e identifique a cor do milho e das batatas.',
        isCompleted: false,
        targetEntityId: 'npc_tupaq'
      },
      {
        id: 'step_sec_quipu_qullqa',
        description: 'Inspecione a ventilação do Qullqa que mantém os alimentos preservados.',
        isCompleted: false,
        targetEntityId: 'obj_qullqa_deposito'
      }
    ],
    unlocksJournalDiscoveryIds: ['disc_qullqa', 'disc_runa_simi']
  }
];
