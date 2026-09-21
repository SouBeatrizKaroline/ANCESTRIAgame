import { SourceReference } from '../types';

export const HISTORICAL_SOURCES: Record<string, SourceReference> = {
  // =========================================================================
  // Relatos, crónicas y fuentes directas de pueblos originarios
  // =========================================================================
  alvarado_tezozomoc_mexicayotl: {
    id: 'alvarado_tezozomoc_mexicayotl',
    author: 'Hernando Alvarado Tezozómoc (cronista nahua-mexica)',
    title: 'Crónica Mexicáyotl',
    year: 'c. 1598',
    institutionOrPublisher: 'Universidad Nacional Autónoma de México (UNAM) / Instituto de Investigaciones Históricas',
    type: 'documento_historico',
    notes: 'Crónica e historia mexica escrita en lengua náhuatl por un noble y cronista nahua, narrando desde la memoria viva originaria la fundación de Mexico-Tenochtitlan, el linaje tenochca y la vida lacustre.',
    url: 'https://historicas.unam.mx/publicaciones/catalogo/ficha?id=008c'
  },
  guaman_poma_nueva_coronica: {
    id: 'guaman_poma_nueva_coronica',
    author: 'Felipe Guamán Poma de Ayala (cronista quechua andino)',
    title: 'El primer nueva corónica y buen gobierno',
    year: 'c. 1615',
    institutionOrPublisher: 'Biblioteca Real de Dinamarca (Edición facsimilar digital)',
    type: 'documento_historico',
    notes: 'Manuscrito monumental ilustrado de autoría indígena andina. Describe minuciosamente la vida comunitaria (ayllus, minka, ayni), los andenes agrícolas, los quipus, las fiestas solares y los caminos del Tawantinsuyu.',
    url: 'http://www.kb.dk/permalink/2006/poma/info/es/frontpage.htm'
  },
  garcilaso_comentarios_reales: {
    id: 'garcilaso_comentarios_reales',
    author: 'Inca Garcilaso de la Vega',
    title: 'Comentarios Reales de los Incas',
    year: '1609',
    institutionOrPublisher: 'Edición crítica / Biblioteca Clásica Real Academia Española',
    type: 'livro',
    notes: 'Relato que recoge las tradiciones orales directas de sus parientes nobles incas, detallando el sistema viario del Qhapaq Ñan, la contabilidad en quipus y el manejo ecológico de las aguas.',
    url: 'https://www.cervantesvirtual.com/obra/primera-parte-de-los-comentarios-reales-de-los-incas/'
  },
  qeswachaka_comunidades_quechuas: {
    id: 'qeswachaka_comunidades_quechuas',
    author: 'Comunidades Quechuas de Huinchiri, Chaupibanda, Choccahua y Ccollana Quehue',
    title: 'Conocimientos, técnicas y rituales vinculados a la renovación anual del puente Q’eswachaka',
    year: 'Tradición viva / UNESCO 2013',
    institutionOrPublisher: 'Patrimonio Cultural Inmaterial de la Humanidad — UNESCO / Ministerio de Cultura del Perú',
    type: 'registro_arqueologico',
    notes: 'Transmisión oral comunitaria viva de ingeniería tradicional andina: trenzado colectivo de fibra de ichu sobre el río Apurímac mediante trabajo recíproco solidario (Minka).',
    url: 'https://ich.unesco.org/es/RL/conocimientos-tecnicas-y-rituales-vinculados-a-la-renovacion-anual-del-puente-qeswachaka-00594'
  },
  kopenawa_caida_cielo: {
    id: 'kopenawa_caida_cielo',
    author: 'Davi Kopenawa (chamán y líder yanomami) y Bruce Albert',
    title: 'La caída del cielo: palabras de un chamán yanomami (A Queda do Céu)',
    year: '2010 / 2015',
    institutionOrPublisher: 'Companhia das Letras / Harvard University Press',
    type: 'livro',
    notes: 'Testimonio autobiográfico y cosmológico directo de Davi Kopenawa. Relata la sabiduría de la tierra-bosque (Urihi A), los espíritus xapiri, la ecología chamánica y la defensa irrenunciable del territorio ancestral.',
    url: 'https://www.companhiadasletras.com.br/livro/9788535925852/a-queda-do-ceu'
  },
  krenak_ideas_postergar_fin: {
    id: 'krenak_ideas_postergar_fin',
    author: 'Ailton Krenak (filósofo y líder indígena del pueblo Krenak)',
    title: 'Ideas para postergar el fin del mundo (Ideias para adiar o fim do mundo)',
    year: '2019',
    institutionOrPublisher: 'Companhia das Letras / Ediciones en español',
    type: 'livro',
    notes: 'Reflexión filosófica originaria sobre la conexión viva con los ríos, montañas y ancestros, desarticulando visiones extractivistas y afirmando la diversidad de formas de habitar el planeta.',
    url: 'https://www.companhiadasletras.com.br/livro/9788535932386/ideias-para-adiar-o-fim-do-mundo'
  },
  hernandez_nahuatl_memoria: {
    id: 'hernandez_nahuatl_memoria',
    author: 'Natalio Hernández (escritor y poeta nahua)',
    title: 'De la memoria a la palabra / Yancuic Tlahtolli: creación contemporánea en lenguas originarias',
    year: '2008',
    institutionOrPublisher: 'Instituto Nacional de Lenguas Indígenas (INALI) / Plaza y Valdés',
    type: 'artigo_academico',
    notes: 'Ensayos y testimonios sobre la vigencia, vitalidad y literatura contemporánea en lengua náhuatl, promoviendo el conocimiento situado de los pueblos nahuas desde su propia voz.',
    url: 'https://www.inali.gob.mx/'
  },
  atlas_unicef_funproeib: {
    id: 'atlas_unicef_funproeib',
    author: 'UNICEF & FUNPROEIB Andes (Inge Sichra, ed.)',
    title: 'Atlas sociolingüístico de pueblos indígenas en América Latina',
    year: '2009',
    institutionOrPublisher: 'UNICEF / Fundación para la Educación en Contextos de Multilingüismo y Pluriculturalidad',
    type: 'artigo_academico',
    notes: 'Documentación rigurosa de más de 400 pueblos indígenas, familias lingüísticas, territorios y procesos de fortalecimiento cultural en 21 países de las Américas.',
    url: 'https://acervo.socioambiental.org/sites/default/files/documents/a2l00009.pdf'
  },
  xukuru_mandaru_memoria: {
    id: 'xukuru_mandaru_memoria',
    author: 'Pueblo Indígena Xukuru do Ororubá / Cacique Marcos Xukuru',
    title: 'Memoria territorial, asamblea comunitaria y revitalización en la Serra do Ororubá',
    year: 'Memoria comunitaria viva',
    institutionOrPublisher: 'Associação Xukuru do Ororubá / Território Sagrado',
    type: 'registro_arqueologico',
    notes: 'Relatos de la memoria colectiva del pueblo Xukuru en Pernambuco, articulando el conocimiento de las plantas medicinales, la espiritualidad del Encanto y la recuperación comunitaria de la tierra.',
    url: 'https://cimi.org.br/povo-xukuru/'
  },
  wayuu_sistema_normativo: {
    id: 'wayuu_sistema_normativo',
    author: 'Junta Mayor de Palabreros Wayuu',
    title: 'El sistema normativo Wayuu aplicado por el Pütchipü’üi (palabrero)',
    year: 'Tradición viva / UNESCO 2010',
    institutionOrPublisher: 'Patrimonio Cultural Inmaterial — UNESCO / Colombia y Venezuela',
    type: 'registro_arqueologico',
    notes: 'Sistema ancestral de resolución pacífica de conflictos y derecho consuetudinario Wayuu, centrado en el poder de la palabra mediadora, la compensación simbólica y el respeto entre clanes (eiruku).',
    url: 'https://ich.unesco.org/es/RL/el-sistema-normativo-de-los-wayuu-aplicado-por-el-putchipui-palabrero-00435'
  },

  // =========================================================================
  // Investigaciones arqueológicas, etnohistóricas y patrimoniales situadas
  // =========================================================================
  murra_verticalidad: {
    id: 'murra_verticalidad',
    author: 'John Victor Murra',
    title: 'El control vertical de un máximo de pisos ecológicos en la economía de las sociedades andinas',
    year: '1972',
    institutionOrPublisher: 'Universidad Hermilio Valdizán, Huánuco',
    type: 'artigo_academico',
    notes: 'Base teórica esencial sobre cómo los pueblos andinos aprovechaban simultáneamente pisos ecológicos a diferentes altitudes mediante reciprocidad y archipiélagos ecológicos.',
    url: 'https://dialnet.unirioja.es/servlet/articulo?codigo=2397087'
  },
  rostworowski_incas: {
    id: 'rostworowski_incas',
    author: 'María Rostworowski de Diez Canseco',
    title: 'Historia del Tahuantinsuyu',
    year: '1988',
    institutionOrPublisher: 'Instituto de Estudios Peruanos (IEP)',
    type: 'livro',
    notes: 'Investigación histórica fundamental sobre el Tawantinsuyu, enfatizando los principios andinos de reciprocidad (Ayni y Minka) y la estructura dual de organización.',
    url: 'https://iep.org.pe/publicaciones/historia-del-tahuantinsuyu/'
  },
  urton_quipu: {
    id: 'urton_quipu',
    author: 'Gary Urton',
    title: 'Signs of the Inka Khipu: Binary Coding in the Andean Knotted-String Records',
    year: '2003',
    institutionOrPublisher: 'University of Texas Press',
    type: 'livro',
    notes: 'Estudio sobre la complejidad estructural de los khipus andinos: torsión de cuerdas, código de colores y sistema posicional de numeración decimal.',
    url: 'https://utpress.utexas.edu/9780292785402/'
  },
  protzen_ollantaytambo: {
    id: 'protzen_ollantaytambo',
    author: 'Jean-Pierre Protzen',
    title: 'Inca Architecture and Construction at Ollantaytambo',
    year: '1993',
    institutionOrPublisher: 'Oxford University Press',
    type: 'livro',
    notes: 'Arqueología experimental sobre la cantería andina: técnicas de extracción, labrado por percusión con martillos líticos y uniones sismorresistentes en seco sin mortero.'
  },
  daltroy_incas: {
    id: 'daltroy_incas',
    author: 'Terence N. D’Altroy',
    title: 'The Incas',
    year: '2002 / 2014',
    institutionOrPublisher: 'Blackwell Publishing / Wiley',
    type: 'livro',
    notes: 'Visión arqueológica e histórica amplia sobre la infraestructura vial del Qhapaq Ñan y la red de almacenes públicos de abastecimiento (Qullqas).'
  },
  morris_huanuco_pampa: {
    id: 'morris_huanuco_pampa',
    author: 'Craig Morris & Donald E. Thompson',
    title: 'Huánuco Pampa: An Inca City and its Hinterland',
    year: '1985',
    institutionOrPublisher: 'Thames & Hudson',
    type: 'registro_arqueologico',
    notes: 'Investigación arqueológica sobre los centros administrativos andinos, la conservación de alimentos por liofilización natural (chuño y charqui) y la arquitectura pública.'
  },
  inah_chinampas: {
    id: 'inah_chinampas',
    author: 'Instituto Nacional de Antropología e Historia (INAH)',
    title: 'El sistema chinampero de la Cuenca de México',
    year: '2020',
    institutionOrPublisher: 'Arqueología Mexicana / INAH',
    type: 'museu',
    notes: 'Investigación sobre la agricultura lacustre prehispánica, construcción de suelos antrópicos fértiles y el manejo sustentable del agua en la cuenca lacustre.',
    url: 'https://www.inah.gob.mx/boletines/el-sistema-chinampero-de-la-cuenca-de-mexico-en-la-nueva-edicion-de-arqueologia-mexicana'
  },
  neves_amazonia: {
    id: 'neves_amazonia',
    author: 'Eduardo Góes Neves',
    title: 'Sob os Tempos do Equinócio: Oito mil anos de história na Amazônia Central',
    year: '2022',
    institutionOrPublisher: 'Ubu Editora / EDUSP',
    type: 'livro',
    notes: 'Investigación arqueológica moderna que demuestra el manejo forestal milenario, la creación de Tierra Negra antrópica y la densa red de asentamientos originarios amazónicos.'
  },
  fausto_indigenas: {
    id: 'fausto_indigenas',
    author: 'Carlos Fausto',
    title: 'Os Índios antes do Brasil',
    year: '2000',
    institutionOrPublisher: 'Jorge Zahar Editor',
    type: 'livro',
    notes: 'Panorama de la diversidad de sociedades y pueblos indígenas, tradiciones cerámicas, cosmologías y redes lingüísticas en el territorio continental.'
  },
  coe_houston_mayas: {
    id: 'coe_houston_mayas',
    author: 'Michael D. Coe & Stephen Houston',
    title: 'The Maya',
    year: '2015',
    institutionOrPublisher: 'Thames & Hudson (9th ed.)',
    type: 'livro',
    notes: 'Síntesis de evidencias epigráficas y arqueológicas sobre las ciudades-estado mayas, astronomía, matemática vigesimal con uso del cero y agricultura de milpa.'
  }
};
