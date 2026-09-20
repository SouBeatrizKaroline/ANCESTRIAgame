import { Region } from '../types';

export const BRASIL_REGION: Region = {
  id: 'territorios_brasil',
  name: 'Territórios de Pindorama: Saberes e Biodiversidade',
  titleSubtitle: 'A cosmologia do Teko Porã, saberes da mata atlântica, cerrado e litoral',
  status: 'em_desenvolvimento',
  unlockRequirementFragments: 450,
  timePeriod: 'Tradições ancestrais e continuidade contemporânea',
  associatedCultureIds: ['indigenas_brasil'],
  description: 'Um vasto território conectado pela diversidade de mais de mil povos que dominavam a botânica medicinal, a arquitetura sustentável de fibras e palhas e sistemas de convivência comunitária sem desigualdade estrutural.',
  environmentDescription: 'Mata atlântica preservada com orquídeas e bromélias, riachos cristalinos, grandes malocas comunitárias termoacústicas e praças de cantos e celebrações coletivas.',
  startingCoordinates: { x: 0, y: 0.7, z: 12 },
  npcCount: 4,
  discoveriesCount: 8,
  soundscapeTrack: 'brasil_maraca_chimes',
  sourceIds: ['fausto_indigenas']
};
