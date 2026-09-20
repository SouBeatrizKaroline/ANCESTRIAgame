import { DialogueNode, NPC } from '../types';

export const ANDES_NPCS: NPC[] = [
  {
    id: 'npc_kuntur',
    name: 'Kuntur',
    role: 'Chasqui dos Caminhos Reais (Qhapaq Ñan)',
    regionId: 'andes',
    cultureId: 'inca',
    position: { x: 2, y: 0.6, z: 8 },
    rotationY: 0,
    visualColor: '#e07a5f',
    clothingDescription: 'Poncho vermelho com grafismos tokapu geométricos, sandálias de couro de lhama e pututu à cintura.',
    dialogueRootId: 'dia_kuntur_intro'
  },
  {
    id: 'npc_sumaq',
    name: 'Sumaq',
    role: 'Mestra dos Andenes e Sementes',
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
    role: 'Quipucamayoc dos Armazéns Qullqa',
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
    role: 'Mestre Cantero e Escultor de Rocha',
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
    speakerName: 'Kuntur (o Chasqui)',
    role: 'Mensageiro Imperial do Qhapaq Ñan',
    text: 'Allillanchu, viajante! Bem-vindo aos caminhos do Tawantinsuyu. Sou Kuntur, um chasqui. Meus pés cruzam vales e montanhas levando ordens do Sapa Inca e peixe fresco da costa até o coração dos Andes!',
    choices: [
      {
        text: 'Como vocês conseguiam correr tão rápido por montanhas tão altas?',
        response: 'Treinamos desde jovens para respirar o ar rarefeito das punas. Corremos em postos de revezamento (chaskiwasi) a cada poucos quilômetros. Quando me aproximo, toco o meu pututu e o próximo corredor já salta pronto na estrada!'
      },
      {
        text: 'O que você carrega nessa bolsa?',
        response: 'Levo quipus com mensagens confidenciais cifradas em nós e cores, além de avisos urgentes entre os governadores provinciais.',
        unlockDiscoveryId: 'disc_qhapaq_nan',
        giveFragments: 25
      },
      {
        text: 'Qual o melhor lugar para aprender sobre as tecnologias daqui?',
        response: 'Suba até os terraços agrícolas para falar com Sumaq, visite o sábio Tupaq nos silos Qullqa e conheça o mestre Wayra na oficina de cantaria!'
      }
    ]
  },

  dia_sumaq_intro: {
    id: 'dia_sumaq_intro',
    npcId: 'npc_sumaq',
    speakerName: 'Sumaq',
    role: 'Mestra dos Andenes e Cultivos',
    text: 'Seja bem-vindo aos nossos terraços, explorador! Enquanto muitos viam as montanhas íngremes como uma barreira impossível, nossos ancestrais viram nelas degraus para o céu e para a vida.',
    choices: [
      {
        text: 'Por que cultivar em terraços em vez de apenas no fundo do vale?',
        response: 'No fundo do vale o espaço é escasso e as geadas noturnas se acumulam. Nas encostas, nossas pedras absorvem o calor do sol diurno e aquecem as raízes à noite. Cada altitude é um piso ecológico com clima diferente!',
        unlockDiscoveryId: 'disc_andenes',
        giveFragments: 25
      },
      {
        text: 'Gostaria de testar meu conhecimento organizando os cultivos!',
        response: 'Perfeito! Cada planta exige seu clima: a folha sagrada da coca nos pisos quentes inferiores, o milho nos vales amenos, e as batatas nativas e quinoa nos degraus altos e gélidos. Vamos ao trabalho!'
      }
    ],
    triggerMinigameId: 'terraces'
  },

  dia_tupaq_intro: {
    id: 'dia_tupaq_intro',
    npcId: 'npc_tupaq',
    speakerName: 'Tupaq',
    role: 'Quipucamayoc dos Armazéns Qullqa',
    text: 'Saudações, buscador do saber! Nossas Qullqas estão repletas de mantimentos colhidos no mutirão da Minka. Como guardião dos quipus, sei exatamente quantos grãos de milho e fardos de lã temos guardados.',
    choices: [
      {
        text: 'Como cordas e nós podem registrar números e contas tão complexas?',
        response: 'É pura precisão decimal! Cada cordão tem posições: na ponta inferior estão as unidades; no centro, as dezenas; mais acima, as centenas. E as cores identificam o que está sendo contado!',
        unlockDiscoveryId: 'disc_quipu',
        giveFragments: 25
      },
      {
        text: 'Pode me ensinar a interpretar um quipu de suprimentos?',
        response: 'Com honra! Analise os nós, some os valores das ordens decimais e me diga o total de suprimentos estocados para que nosso povo nunca passe necessidade.'
      }
    ],
    triggerMinigameId: 'quipu'
  },

  dia_wayra_intro: {
    id: 'dia_wayra_intro',
    npcId: 'npc_wayra',
    speakerName: 'Wayra',
    role: 'Mestre Cantero e Construtor',
    text: 'A rocha não é matéria morta; ela tem espírito e vontade. Para erguer templos que resistem a terremotos violentos, não usamos cimento nem argamassa. Cada bloco beija o vizinho com perfeição de milímetros.',
    choices: [
      {
        text: 'Sem cimento, como as paredes não caem durante os terremotos?',
        response: 'Pelo peso monumental, juntas poligonais e portas inclinadas! Quando o chão treme, os blocos vibram ligeiramente juntos e se assentam novamente no mesmo lugar, sem rachar!',
        unlockDiscoveryId: 'disc_cantaria',
        giveFragments: 25
      },
      {
        text: 'Posso ajudá-lo a talhar e encaixar a famosa pedra de doze ângulos?',
        response: 'Pegue o martelo de hematita e o abrasivo de areia úmida. Encaixe a pedra central com as pedras de apoio com precisão absoluta!'
      }
    ],
    triggerMinigameId: 'stonework'
  }
};
