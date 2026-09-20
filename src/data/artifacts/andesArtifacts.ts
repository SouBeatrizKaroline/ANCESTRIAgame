import { Artifact } from '../types';

export const ANDES_ARTIFACTS: Artifact[] = [
  {
    id: 'art_quipu_imperial',
    name: 'Quipu Imperial de Algodão e Lã de Vicunha',
    nativeName: 'Khipu',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'Século XV d.C.',
    material: 'Fibras de algodão tingidas com corantes vegetais e lã fina de vicunha',
    purpose: 'Censo demográfico e controle de reservas de alimentos nos armazéns públicos',
    description: 'Composto por um cordão mestre de 60 cm e 48 cordões pendentes com nós em algarismos decimais, com cores em ocre, carmesim e índigo.',
    estimatedDate: 'c. 1475 d.C.',
    museumReference: 'Inspirado nos exemplares do Museu Larco (Lima) e Museu Etnológico de Berlim',
    sourceIds: ['urton_quipu']
  },
  {
    id: 'art_chaquitaclla',
    name: 'Chaquitaclla (Arado de Pé Tradicional)',
    nativeName: 'Chakitaklla',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'Milênios de tradição andina até a atualidade',
    material: 'Madeira densa de chachacomo, ponta reforçada de bronze andino e tiras de couro de lhama',
    purpose: 'Revirar e preparar o solo rochoso dos andenes íngremes',
    description: 'Instrumento ergonômico acionado pela força do pé do agricultor, ideal para declives onde arados de tração animal não conseguiam operar.',
    estimatedDate: 'c. 1450 d.C.',
    sourceIds: ['morris_huanuco_pampa']
  },
  {
    id: 'art_kero_cerimonial',
    name: 'Kero Polícromo de Madeira Sagrada',
    nativeName: 'Qiru',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'Séculos XV e XVI d.C.',
    material: 'Madeira de chonta talhada e preenchida com resina de mopa-mopa colorida',
    purpose: 'Cálice ritual usado para brindar com chicha de milho em celebrações de aliança e reciprocidade',
    description: 'Vaso cerimonial com pinturas representando guerreiros, flores sagradas de cantuta e símbolos tokapu de nobreza.',
    estimatedDate: 'c. 1500 d.C.',
    museumReference: 'Museu Inka da Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)',
    sourceIds: ['rostworowski_incas']
  },
  {
    id: 'art_pedra_doze_angulos',
    name: 'Pedra dos Doze Ângulos (Hatun Rumiyoc)',
    nativeName: 'Hatun Rumiyoc ("Rocha Grande")',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'c. 1450 d.C.',
    material: 'Diorita verde andesítica de altíssima dureza',
    purpose: 'Elemento de sustentação angular do palácio de Inca Roca em Cusco',
    description: 'Bloco de cantaria poligonal almofadada com doze vértices esculpidos que se ajustam com precisão milimétrica a todas as pedras circundantes sem qualquer argamassa.',
    estimatedDate: 'c. 1450 d.C.',
    sourceIds: ['protzen_ollantaytambo']
  }
];
