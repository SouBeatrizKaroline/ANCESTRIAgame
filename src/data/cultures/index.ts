import { Culture, CultureId } from '../types';
import { INCA_CULTURE } from './inca';
import { MAYA_CULTURE } from './maya';
import { MEXICA_CULTURE } from './mexica';
import { AMAZONIA_CULTURE } from './amazonia';
import { BRASIL_CULTURE } from './brasil';

export const ALL_CULTURES: Partial<Record<CultureId, Culture>> = {
  inca: INCA_CULTURE,
  maya: MAYA_CULTURE,
  mexica: MEXICA_CULTURE,
  amazonia: AMAZONIA_CULTURE,
  indigenas_brasil: BRASIL_CULTURE
};

export {
  INCA_CULTURE,
  MAYA_CULTURE,
  MEXICA_CULTURE,
  AMAZONIA_CULTURE,
  BRASIL_CULTURE
};
