import { Region } from '../types';

export const ANDES_REGION: Region = {
  id: 'andes',
  name: 'Andes: Vale Sagrado & Tawantinsuyu',
  titleSubtitle: 'Engenharia de altitude, a rede Qhapaq Ñan e o controle vertical da terra',
  status: 'disponivel',
  unlockRequirementFragments: 0,
  timePeriod: 'c. 1470 d.C. (Apoqueu do Tawantinsuyu)',
  associatedCultureIds: ['inca'],
  description: 'Um vale fértil cercado por montanhas escarpadas, com terraços agrícolas em socalcos esculpidos nas encostas, canais de irrigação de pedra polida, depósitos de mantimentos (qullqas) e a imponente ponte suspensa de fibra vegetal sobre o desfiladeiro.',
  environmentDescription: 'Montanhas com picos nevados ao fundo, encostas verdes com terraços de cultivo, alvenaria de granito com juntas perfeitas, lhamas pastando nas campinas e céu azul límpido das altas altitudes.',
  startingCoordinates: { x: 0, y: 0.7, z: 12 },
  npcCount: 4,
  discoveriesCount: 8,
  soundscapeTrack: 'andes_pentatonic_wind',
  sourceIds: [
    'murra_verticalidad',
    'rostworowski_incas',
    'urton_quipu',
    'daltroy_incas',
    'protzen_ollantaytambo',
    'qeswachaka_unesco'
  ]
};
