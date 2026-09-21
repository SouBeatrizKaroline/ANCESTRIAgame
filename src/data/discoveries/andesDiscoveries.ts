import { Discovery } from '../types';

export const ANDES_DISCOVERIES: Discovery[] = [
  {
    id: 'disc_qhapaq_nan',
    name: 'Qhapaq Ñan (La Gran Red Vial Andina)',
    category: 'Tecnologías',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Una red vial de más de 30.000 km que articulaba territorios andinos mediante calzadas de piedra, escalinatas y puestos de relevo.',
    fullContent: `El Qhapaq Ñan es una de las obras de infraestructura más complejas de la historia humana. Cruzaba desiertos costeros, valles fértiles y punas a más de 4.500 metros sobre el nivel del mar.
La red contaba con:
- Tambos: postos de abastecimiento y descanso situados a distancias regulares de una jornada de marcha.
- Chasquis: mensajeros jóvenes entrenados en altitud que transmitían quipus y encargos mediante relevos continuos entre chaskiwasi.
En 2014, el Qhapaq Ñan fue inscrito como Patrimonio Mundial de la Humanidade por la UNESCO como esfuerzo conjunto de seis países andinos.`,
    iconSvg: '<path d="M4 21 L10 3 L14 3 L20 21 M8 15 L16 15 M9 9 L15 9" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Al inicio del camino empedrado, cerca de Kuntur.',
    sourceIds: ['cieza_cronica', 'daltroy_incas'],
    curiosityFact: 'Los mensajeros hacían sonar el pututu (trompeta de caracola marina) para alertar con anticipación al siguiente corredor.'
  },
  {
    id: 'disc_andenes',
    name: 'Andenes (Terrazas Agrícolas de Altitud)',
    category: 'Agricultura',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Ingeniería agrícola en terrazas que multiplicó el suelo fértil, previno la erosión y generó microclimas térmicos contra heladas.',
    fullContent: `Los andenes transformaron laderas empinadas en espacios productivos sustentables.
Estructura en capas:
1. Base de grandes bloques de piedra para contención y soporte estructural.
2. Capa intermedia de grava y arena que garantizaba drenaje rápido sin saturar el suelo ni provocar deslizamientos.
3. Capa superior de tierra fértil enriquecida con abonos orgánicos.
Además de contener el suelo, las piedras acumulaban radiación solar durante el día y liberaban ese calor por la noche, protegiendo las raíces contra las heladas de altura.`,
    iconSvg: '<path d="M2 19 L7 19 L7 14 L13 14 L13 9 L19 9 L19 4 L22 4" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'En las terrazas escalonadas al lado del valle.',
    sourceIds: ['murra_verticalidad', 'morris_huanuco_pampa'],
    curiosityFact: 'En complejos como Moray, las terrazas concéntricas producían diferencias de hasta 15°C entre los niveles, funcionando como laboratorios de aclimatación agrícola.'
  },
  {
    id: 'disc_quipu',
    name: 'Khipu (Sistema de Cuerdas, Nudos y Memoria)',
    category: 'Tecnologías',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Dispositivo mnemotécnico y administrativo de cuerdas y nudos posicionales que registraba censos, tributos y relatos.',
    fullContent: `Sin utilizar caracteres alfabéticos sobre papel, las sociedades andinas desarrollaron el khipu (del quechua: "nudo").
Consta de un cordón principal del cual penden cuerdas secundarias:
- Posición decimal: unidades en la parte inferior, decenas en el centro, centenas y millares en la parte superior.
- Tipos de nudo: nudos simples, nudos en ocho y nudos largos con vueltas múltiples.
- Colores y torsión (S o Z): el color de la fibra indicaba categorías de bienes (amarillo para maíz, pardo para papa, blanco para lana).
Los khipukamayuq eran los especialistas formados para su elaboración e interpretación comunitaria.`,
    iconSvg: '<path d="M3 5 L21 5 M6 5 L6 19 M12 5 L12 21 M18 5 L18 16 M6 10 A2 2 0 0 1 6 14 M12 8 A2 2 0 0 1 12 12 M12 15 A2 2 0 0 1 12 19 M18 11 A2 2 0 0 1 18 14" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Junto a los almacenes qullqa con Tupaq.',
    sourceIds: ['urton_quipu', 'rostworowski_incas'],
    curiosityFact: 'Estudios de Gary Urton e investigadores peruanos han catalogado más de mil khipus conservados en colecciones comunitarias y museos.'
  },
  {
    id: 'disc_cantaria',
    name: 'Cantería Andina y Estructura Sismorresistente',
    category: 'Arquitectura',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Bloques de piedra tallados con precisión milimétrica, ensamblados en seco para resistir movimientos sísmicos sin argamasa.',
    fullContent: `La arquitectura andina de piedra destaca por su sobriedad y resistencia estructural. En zonas de alta actividad sísmica como Cusco y Ollantaytambo, edificaciones coloniales colapsaron mientras los muros andinos permanecieron en pie.
Claves técnicas:
1. Ensamble en seco (almohadillado): los bloques encajan perfectamente; sus caras internas poseen ligeras concavidades que traban las piezas.
2. Flexibilidad sísmica: durante un temblor, los bloques vibran levemente y se reasientan en su posición original.
3. Muros con ligera inclinación hacia el interior y vanos trapezoidales que bajan el centro de gravedad.
4. Piedra de los Doce Ángulos: célebre ejemplo en Cusco donde una sola roca articula con todas sus vecinas sin fisuras.`,
    iconSvg: '<rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 12 L21 12 M12 4 L12 12 M8 12 L8 20 M16 12 L16 20" stroke="currentColor" stroke-width="2"/>',
    locationHint: 'En el espacio de cantería junto a Wayra.',
    sourceIds: ['protzen_ollantaytambo', 'daltroy_incas'],
    curiosityFact: 'Para tallar el granito y la andesita se usaban percutores líticos de hematita más dura y arena húmeda como abrasivo de pulido.'
  },
  {
    id: 'disc_qullqa',
    name: 'Qullqa (Almacenes Estatales y Seguridad Alimentaria)',
    category: 'Sociedad',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Red de almacenes y silos ventilados que aseguraba reservas alimentarias y semillas para años de sequía o heladas.',
    fullContent: `Las qullqas eran almacenes cilíndricos o rectangulares construidos en laderas altas y ventiladas para conservar maíz, chuño, charqui y tejidos.
El sistema sostenía la reciprocidad y la redistribución comunitaria:
Cuando un territorio sufría pérdidas por heladas o sequías, se abrían las qullqas para abastecer a las familias sin cobro monetario.
La corriente de aire frío de las laderas bajaba la temperatura interior y evitaba la proliferación de hongos e insectos.`,
    iconSvg: '<path d="M4 10 L12 4 L20 10 L20 20 L4 20 Z M9 20 L9 13 L15 13 L15 20" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'En las construcciones elevadas con ventilación en el valle.',
    sourceIds: ['morris_huanuco_pampa', 'cieza_cronica'],
    curiosityFact: 'Se estima que decenas de miles de qullqas permitían resguardar provisiones para sostener a la población por varios años.'
  },
  {
    id: 'disc_qeswachaka',
    name: 'Q’eswachaka (Puente Colgante de Fibra de Ichu)',
    category: 'Tecnologías',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Puente colgante trenzado con fibra vegetal de ichu, renovado anualmente por cuatro comunidades quechuas en un ritual colectivo.',
    fullContent: `El ichu, pasto que crece en las punas andinas, es trenzado por las familias en cuerdas delgadas (q'eya) que luego se unen en gruesos cables del ancho de un torso humano.
Seis grandes cables cruzan el cañón del río Apurímac, fijados a estribos de piedra en ambas riberas.
Cada año, las comunidades de Huinchiri, Chaupibanda, Choccahua y Ccollana Quehue se reúnen en trabajo comunitario (Minka):
El puente viejo se corta y cae al río, y uno nuevo es tejido y tensado en tres días de fiesta y cooperación intergeneracional ininterrumpida.`,
    iconSvg: '<path d="M2 8 C8 15, 16 15, 22 8 M2 13 C8 19, 16 19, 22 13 M6 10 L6 16 M12 12 L12 17 M18 10 L18 16" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Cruzando el desfiladero en el borde del valle.',
    sourceIds: ['qeswachaka_unesco'],
    curiosityFact: 'La práctica se mantiene viva para transmitir el conocimiento ancestral y honrar la memoria comunitaria.'
  },
  {
    id: 'disc_intihuatana',
    name: 'Intihuatana (Marcador Solar de Estaciones y Solsticios)',
    category: 'Astronomía',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Monolito esculpido en roca viva para observar el movimiento del Sol y sincronizar el calendario agrícola y ritual.',
    fullContent: `El término en quechua alude al lugar donde se "ata o vincula" el Sol.
Se trata de una columna labrada en la roca matriz de un promontorio. En el solsticio de invierno (Inti Raymi, en junio), cuando el Sol está en su punto más alejado en el hemisferio sur, se realizaban ceremonias para propiciar su retorno y el calentamiento de los campos.
La sombra proyectada por el monolito permitía medir con precisión equinoccios y solsticios para sembrar en el momento propicio.`,
    iconSvg: '<circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 1 L12 3 M12 11 L12 13 M6 7 L4 7 M14 7 L16 7 M8 17 L16 17 L14 11 L10 11 Z" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'En el punto más alto de la aldea, sobre la colina sagrada.',
    sourceIds: ['rostworowski_incas', 'daltroy_incas'],
    curiosityFact: 'Durante los equinoccios de otoño y primavera, el Sol cenital al mediodía prácticamente no proyecta sombra lateral sobre la superficie superior.'
  },
  {
    id: 'disc_ayllu',
    name: 'Ayllu, Ayni y Minka (Tejido Social y Reciprocidad)',
    category: 'Sociedad',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Estructura comunitaria de parentesco y principios éticos de ayuda mutua que garantizaban la solidaridad y el trabajo colectivo.',
    fullContent: `El Ayllu era la unidad social fundamental andina: una comunidad de familias con lazos de parentesco, territorio común (Marka) y memoria compartida.
Principios rectores:
- Ayni: reciprocidad interpersonal ("hoy por ti, mañana por mí"). Las familias se ayudaban mutuamente en cosechas o construcción de viviendas.
- Minka: trabajo colectivo en beneficio de toda la comunidad (reparar canales de agua, puentes comunales o cultivar parcelas de viudas, huérfanos y ancianos).
Esta solidaridad comunitaria aseguraba que nadie quedara desprovisto de alimento o cuidado.`,
    iconSvg: '<circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="8" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="16" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 11 L12 13 L16 11" stroke="currentColor" stroke-width="2"/>',
    locationHint: 'Aprendido en las conversaciones con la agricultora Sumaq.',
    sourceIds: ['rostworowski_incas', 'murra_verticalidad'],
    curiosityFact: 'El principio ético andino resumido en "Ama sua, ama llulla, ama quella" (No robar, no mentir, no ser ocioso) sintetizaba la convivencia comunitaria.'
  },
  {
    id: 'disc_chuno',
    name: 'Chuño (Liofilización Andina Ancestral)',
    category: 'Tecnologías',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Método ancestral de deshidratación por congelamiento natural que permite conservar papas por más de una década.',
    fullContent: `Las poblaciones andinas desarrollaron la liofilización natural miles de años antes de los métodos industriales modernos:
1. Las papas cosechadas se extienden en las noches gélidas del altiplano (temperaturas bajo cero).
2. De día, bajo el sol intenso y aire seco, el agua congelada se sublima.
3. Se pisan cuidadosamente para extraer el agua remanente sin romper la pulpa.
4. El ciclo se repite hasta obtener tubérculos secos y livianos que pueden conservarse por diez años sin perder nutrientes.`,
    iconSvg: '<circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 10 L9 14 M15 10 L15 14 M12 8 L12 16" stroke="currentColor" stroke-width="1.5"/>',
    locationHint: 'Cerca de los depósitos de alimentos en la aldea.',
    sourceIds: ['morris_huanuco_pampa'],
    curiosityFact: 'El proceso de lavado y congelado del chuño elimina los glucoalcaloides amargos de variedades de papa silvestre de altura.'
  },
  {
    id: 'disc_runa_simi',
    name: 'Runa Simi (Lengua Quechua)',
    category: 'Idiomas',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'La lengua de la gente: idioma de gran riqueza comunicativa y poética, hablado hoy por millones de personas en los Andes.',
    fullContent: `El quechua (denominado originariamente Runa Simi: runa = ser humano, simi = palabra o habla) fue lengua franca en amplias regiones andinas.
Es una lengua aglutinante con enorme capacidad para expresar afecto, cortesía y relaciones con la naturaleza a través de sufijos precisos.
Palabras quechuas presentes en el español cotidiano:
- Cancha (campo cercado / terreno de juego)
- Cóndor (kuntur)
- Llama (llama)
- Pampa (llanura)
- Carpa (tienda / toldo)
- Choclo (choccllo = mazorca tierna)
- Charqui (carne deshidratada al sol)`,
    iconSvg: '<path d="M4 18 L4 6 A4 4 0 0 1 12 6 A4 4 0 0 1 20 6 L20 18" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 12 Q12 15 16 12" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Al dialogar con los habitantes de la comunidad.',
    sourceIds: ['rostworowski_incas'],
    curiosityFact: 'El quechua es hablado hoy por más de 8 millones de personas en Perú, Bolivia, Ecuador, Colombia y Argentina.'
  }
];
