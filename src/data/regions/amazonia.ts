import { Region } from '../types';

export const AMAZONIA_REGION: Region = {
  id: 'amazonia',
  name: 'Amazônia: Floresta Cultivada & Cacicados das Águas',
  titleSubtitle: 'Solos férteis de Terra Preta, geoglifos ancestrais e cidades-jardim',
  status: 'em_desenvolvimento',
  unlockRequirementFragments: 300,
  timePeriod: 'c. 1000 d.C. (Grandes sociedades ribeirinhas e de terra firme)',
  associatedCultureIds: ['amazonia'],
  description: 'A imensa bacia dos rios caudalosos onde sociedades milenares transformaram o solo através da Terra Preta de Índio, domesticaram fruteiras fundamentais e ergueram aldeias conectadas por caminhos geométricos.',
  environmentDescription: 'Copa florestal exuberante, igarapés e rios cor de chá ou barrentos, estradas retas de terra batida ligando praças circulares e ateliês de cerâmica policromada.',
  startingCoordinates: { x: 0, y: 0.7, z: 12 },
  npcCount: 4,
  discoveriesCount: 8,
  soundscapeTrack: 'amazonia_water_birds',
  sourceIds: ['neves_amazonia', 'fausto_indigenas']
};
