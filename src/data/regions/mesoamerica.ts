import { Region } from '../types';

export const MESOAMERICA_REGION: Region = {
  id: 'mesoamerica',
  name: 'Mesoamérica: Cidades da Selva e do Lago',
  titleSubtitle: 'Das pirâmides maias de calcário às chinampas flutuantes de Tenochtitlan',
  status: 'em_desenvolvimento',
  unlockRequirementFragments: 150,
  timePeriod: 'Período Clássico e Pós-Clássico (Maia e Mexica)',
  associatedCultureIds: ['maya', 'mexica'],
  description: 'Região de contrastes que abrange as selvas úmidas de Petén com templos astronômicos maias e o altiplano lacustre do Vale do México com as vibrantes hortas flutuantes (chinampas) da Tríplice Aliança.',
  environmentDescription: 'Selvas tropicais densas pontuadas por pirâmides majestosas de calcário estucado e canais de águas calmas povoados por salgueiros ahuejotes e lírios d\'água.',
  startingCoordinates: { x: 0, y: 0.7, z: 12 },
  npcCount: 4,
  discoveriesCount: 10,
  soundscapeTrack: 'mesoamerica_flutes_drums',
  sourceIds: ['coates_mesoamerica', 'cieza_cronica']
};
