import { Artifact } from '../types';

export const ANDES_ARTIFACTS: Artifact[] = [
  {
    id: 'art_quipu_imperial',
    name: 'Khipu Imperial de Algodón y Lana de Vicuña',
    nativeName: 'Khipu',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'Siglo XV d.C.',
    material: 'Fibras de algodón teñidas con tintes vegetales y lana fina de camélido',
    purpose: 'Censo demográfico, control de reservas agrícolas y registro de bienes comunitarios',
    description: 'Compuesto por un cordón principal de 60 cm y 48 cordones colgantes con nudos en sistema decimal, en tonos ocre, carmesí e índigo.',
    estimatedDate: 'c. 1475 d.C.',
    museumReference: 'Inspirado en ejemplares del Museo Larco (Lima) y colecciones comunitarias andinas',
    sourceIds: ['urton_quipu']
  },
  {
    id: 'art_chaquitaclla',
    name: 'Chaquitaclla (Arado de Pie Tradicional)',
    nativeName: 'Chakitaklla',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'Milenios de tradición andina viva',
    material: 'Madera densa de chachacomo, punta reforzada de bronce andino y tiras de cuero',
    purpose: 'Preparar y airear el suelo pedregoso en las laderas empinadas de los andenes',
    description: 'Herramienta ergonómica accionada por el peso y la fuerza del pie, ideal para terrenos escarpados donde no es posible emplear arados de tracción animal.',
    estimatedDate: 'c. 1450 d.C.',
    sourceIds: ['morris_huanuco_pampa']
  },
  {
    id: 'art_kero_cerimonial',
    name: 'Qiru Polícromo de Madera Sagrada',
    nativeName: 'Qiru',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'Siglos XV y XVI d.C.',
    material: 'Madera de chonta tallada y sellada con resina vegetal de mopa-mopa',
    purpose: 'Vaso ritual utilizado para brindar con chicha de maíz en pactos de alianza y reciprocidad (Ayni)',
    description: 'Vaso ceremonial con representaciones de flora sagrada, flores de cantuta y símbolos tokapu de prestigio.',
    estimatedDate: 'c. 1500 d.C.',
    museumReference: 'Museo Inka de la Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)',
    sourceIds: ['rostworowski_incas']
  },
  {
    id: 'art_pedra_doze_angulos',
    name: 'Piedra de los Doce Ángulos (Hatun Rumiyoc)',
    nativeName: 'Hatun Rumiyoc ("Roca Grande")',
    cultureId: 'inca',
    regionId: 'andes',
    period: 'c. 1450 d.C.',
    material: 'Diorita verde andesítica de gran dureza',
    purpose: 'Elemento de esquina y soporte angular en el palacio de Inca Roca en Cusco',
    description: 'Bloque de cantería poligonal almohadillada con doce vértices tallados que se acoplan con precisión milimétrica a todas las piedras adyacentes sin ningún tipo de mortero o cemento.',
    estimatedDate: 'c. 1450 d.C.',
    sourceIds: ['protzen_ollantaytambo']
  }
];
