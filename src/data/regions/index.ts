import { Region, RegionId } from '../types';
import { ANDES_REGION } from './andes';
import { MESOAMERICA_REGION } from './mesoamerica';
import { AMAZONIA_REGION } from './amazonia';
import { BRASIL_REGION } from './brasil';

export const ALL_REGIONS: Record<RegionId, Region> = {
  andes: ANDES_REGION,
  mesoamerica: MESOAMERICA_REGION,
  amazonia: AMAZONIA_REGION,
  territorios_brasil: BRASIL_REGION
};

export {
  ANDES_REGION,
  MESOAMERICA_REGION,
  AMAZONIA_REGION,
  BRASIL_REGION
};
