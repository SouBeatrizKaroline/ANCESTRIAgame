import { Culture } from '../types';

export const INCA_CULTURE: Culture = {
  id: 'inca',
  name: 'Incas (Tawantinsuyu)',
  originalName: 'Tawantinsuyu ("As Quatro Regiões Unidas")',
  primaryRegionId: 'andes',
  timePeriod: 'c. 1438 – 1533 d.C. (período imperial consolidado, herdeiro de milênios de tradição andina prévia)',
  geographicScope: 'Cordilheira dos Andes (atuais Peru, Bolívia, Equador, noroeste da Argentina, norte do Chile e extremo sul da Colômbia)',
  summary: 'Uma das maiores civilizações do mundo pré-colombiano, notável pela engenharia de estradas (Qhapaq Ñan), terraços agrícolas (andenes), cantaria sismorresistente e sofisticada contabilidade sem escrita alfabética através dos quipus.',
  detailedOverview: `O Tawantinsuyu organizava-se em quatro suyus (partes ou quadrantes): Chinchaysuyu (norte), Antisuyu (leste/selva alta), Qullasuyu (sul) e Kuntisuyu (oeste), todos convergindo na capital sagrada de Cusco (o "umbigo do mundo").
Longe de ser uma sociedade monocultural estática, o império integrava centenas de etnias andinas (como Chankas, Huancas, Lupaqas e Cañaris), respeitando muitas autoridades locais (Kurakas) em troca de lealdade e trabalho organizado em reciprocidade.
A economia não utilizava moedas nem comércio livre nos moldes mercantis europeus: baseava-se em sistemas de reciprocidade e redistribuição controlados pelos ayllus e pela burocracia imperial.`,
  socialStructure: [
    'Sapa Inca: líder supremo com autoridade política, militar e religiosa de mediação cosmológica.',
    'Coya: rainha consorte imperial, detentora de papel ritual, político e liderança de linhagens femininas essenciais.',
    'Ayllu: comunidade básica de parentesco e gestão coletiva da terra, águas e animais.',
    'Kurakas: chefes comunitários locais responsáveis pela organização do trabalho coletivo.',
    'Ayni e Minka: trabalho recíproco solidário entre famílias (Ayni) e mutirão coletivo para obras públicas da comunidade (Minka).',
    'Mit\'a: sistema de tributo em forma de trabalho temporário rotativo prestado ao Estado (construção de estradas, andenes, minas, exército).'
  ],
  keyTechnologies: [
    'Qhapaq Ñan: rede viária de mais de 30.000 km cruzando cordilheiras, vales e desertos com pavimentação de pedra, drenagens e escadarias.',
    'Quipu (Khipu): sistema de cordas de algodão ou lã com cores e nós posicionais de base decimal para registro censitário, tributário e memórias narrativas.',
    'Pontes pênseis de fibra vegetal (Q\'eswachaka): pontes suspensas trançadas com capim ichu, renovadas periodicamente pela comunidade.',
    'Liofilização natural (Chuño e Charqui): desidratação de batatas e carne aproveitando as noites gélidas de geada e os dias secos de sol forte na puna.',
    'Chaquitaclla: arado de pé eficiente para inclinações montanhosas acentuadas onde animais de tração seriam ineficazes.'
  ],
  agriculturePractices: [
    'Andenes: terraços agrícolas em socalcos com muros de pedra que absorvem calor diurno para proteger plantas das geadas noturnas.',
    'Estratificação vertical: modelo de controle vertical de pisos ecológicos (John Murra) explorando milho nos vales, tubérculos nas punas e coca/pimenta nas encostas quentes.',
    'Waru Waru (Camellones): canteiros elevados cercados por canais de água que regulam temperatura e mantêm umidade no altiplano.',
    'Domesticação de mais de 3.000 variedades de batata, quinoa, kiwicha, milho (sara) e tarwi.'
  ],
  astronomyBeliefs: [
    'Inti (Sol), Mama Killa (Lua) e Pachamama (Mãe Terra) como forças vitais interligadas à vida humana.',
    'Intihuatana ("lugar onde se ancora o sol"): marco astronômico para observação dos solstícios e equinócios, orientando calendários agrícolas.',
    'Constelações escuras (Yana Phuyu): observação das manchas escuras da Via Láctea (Mayu / o rio celestial), como a Lhama Cósmica (Yacana) e a Perdiz (Yutu).'
  ],
  artAndArchitecture: [
    'Cantaria poligonal: blocos maciços de pedra andesita e granito esculpidos para encaixe perfeito a seco sem argamassa, suportando fortes terremotos.',
    'Portas e janelas trapezoidais com inclinação interna projetada para dissipar vibrações sísmicas.',
    'Têxteis finos (Cumbi): tecidos com padrões geométricos (tokapu) carregados de códigos simbólicos de status social e autoridade.'
  ],
  languages: [
    'Runa Simi (Quechua) como língua franca administrativa e de coesão imperial.',
    'Aymara, Puquina e Mochica como importantes idiomas regionais de povos ancestrais integrados.'
  ],
  traditionsAndCosmovision: [
    'Pacha: conceito de tempo-espaço integrado em três planos interconectados (Hanan Pacha / mundo celestial, Kay Pacha / mundo terreno, Uku Pacha / mundo interior ancestral).',
    'Ayni: princípio ético e prático de cooperação: "Hoje por ti, amanhã por mim".'
  ],
  academicDiscrepanciesOrNotes: [
    'Leitura de Quipus: O consenso reconhece plenamente o papel contábil e censitário; pesquisas recentes (como de Gary Urton e Sabine Hyland) investigam se quipus também registravam fonogramas e crônicas narrativas completas.',
    'Machu Picchu: Historiadores e arqueólogos debatem se era uma propriedade real (finca) do Sapa Inca Pachacuti, um centro cerimonial de consagração solar ou uma fortaleza defensiva.'
  ],
  sourceIds: [
    'murra_verticalidad',
    'rostworowski_incas',
    'urton_quipu',
    'daltroy_incas',
    'protzen_ollantaytambo',
    'qeswachaka_unesco',
    'cieza_cronica',
    'morris_huanuco_pampa'
  ]
};
