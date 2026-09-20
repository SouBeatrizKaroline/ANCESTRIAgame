import { Discovery } from '../types';

export const ANDES_DISCOVERIES: Discovery[] = [
  {
    id: 'disc_qhapaq_nan',
    name: 'Qhapaq Ñan (A Grande Rede de Estradas)',
    category: 'Tecnologias',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Uma colossal rede viária com mais de 30.000 km que unificava o relevo andino através de escadarias, calçamentos e postos de revezamento.',
    fullContent: `O Qhapaq Ñan é uma das obras de infraestrutura mais impressionantes da história humana. Cruzava desertos costeiros, planaltos gélidos a mais de 4.500 metros de altitude e gargantas profundas da cordilheira.
A rede contava com:
- Tambos: postos de abastecimento e hospedagem para viajantes estatais, situados a um dia de marcha de distância entre si.
- Chasquis: mensageiros treinados que corriam em revezamento, capazes de transportar uma mensagem ou peixe fresco da costa até Cusco (mais de 400 km) em menos de dois dias!
A via foi declarada Patrimônio Mundial da Humanidade pela UNESCO em 2014, reconhecendo o esforço cooperativo de 6 países modernos.`,
    iconSvg: '<path d="M4 21 L10 3 L14 3 L20 21 M8 15 L16 15 M9 9 L15 9" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Na entrada do caminho pavimentado de pedra, próximo a Kuntur.',
    sourceIds: ['cieza_cronica', 'daltroy_incas'],
    curiosityFact: 'Os mensageiros usavam o som do pututu (buzina de caracol marinho Strombus) para alertar o próximo corredor de que uma mensagem urgente estava chegando.'
  },
  {
    id: 'disc_andenes',
    name: 'Andenes (Terraços Agrícolas de Altitude)',
    category: 'Agricultura',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Engenharia agrícola em socalcos que multiplicou o solo cultivável, evitou erosão e criou estufas térmicas nas montanhas.',
    fullContent: `Os andenes transformaram encostas íngremes e improdutivas em terras agrícolas hiperprodutivas.
Estrutura em camadas:
1. Base de grandes pedras para sustentação.
2. Camada intermediária de cascalho e areia grossa que garantia drenagem rápida sem acúmulo de água que causasse deslizamento.
3. Camada superior de terra fértil rica em matéria orgânica trazida dos vales.
Além da retenção de solo, as paredes de pedra absorviam a intensa radiação solar durante o dia e liberavam esse calor lentamente durante a noite, protegendo mudas tenras contra as severas geadas andinas.`,
    iconSvg: '<path d="M2 19 L7 19 L7 14 L13 14 L13 9 L19 9 L19 4 L22 4" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Nos terraços verdes em socalcos ao lado da aldeia.',
    sourceIds: ['murra_verticalidad', 'morris_huanuco_pampa'],
    curiosityFact: 'Em sítios como Moray, os terraços concêntricos geravam variações térmicas de até 15°C entre o topo e o fundo, funcionando como verdadeiras estações de aclimatação botânica.'
  },
  {
    id: 'disc_quipu',
    name: 'Quipu (Khipu: O Sistema de Nós e Memória)',
    category: 'Tecnologias',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Instrumento mnemônico e de contabilidade de cordas e nós que administrava censos, safras, estoques e memórias genealógicas.',
    fullContent: `Sem necessitar de caracteres escritos em papel ou argila, o Tawantinsuyu desenvolveu o Quipu (da palavra quechua para "nó").
Constitui-se de um cordão principal horizontal do qual pendem centenas de cordões secundários verticais:
- Posição dos nós: organizada em sistema decimal rigoroso (unidades na parte inferior, dezenas no meio, centenas e milhares no topo).
- Tipos de nós: nós simples para dezenas/centenas, nós em oito (figura 8) e nós longos com múltiplas voltas para unidades.
- Cores e torção: a cor da fibra (algodão ou lã de alpaca/lhama) indicava a categoria do produto registrado (ex: amarelo para ouro ou milho, branco para prata ou lã, vermelho para soldados).
Apenas os especialistas treinados (Quipucamayocs) tinham permissão e maestria para atar e ler os quipus.`,
    iconSvg: '<path d="M3 5 L21 5 M6 5 L6 19 M12 5 L12 21 M18 5 L18 16 M6 10 A2 2 0 0 1 6 14 M12 8 A2 2 0 0 1 12 12 M12 15 A2 2 0 0 1 12 19 M18 11 A2 2 0 0 1 18 14" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Na mesa de registros ao lado dos depósitos de mantimentos Qullqa.',
    sourceIds: ['urton_quipu', 'rostworowski_incas'],
    curiosityFact: 'Pesquisas de Harvard e do Museu de Berlim catalogaram mais de 1.000 quipus sobreviventes que escaparam da queima promovida durante a colonização.'
  },
  {
    id: 'disc_cantaria',
    name: 'Cantaria Inca e Arquitetura Sismorresistente',
    category: 'Arquitetura',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Blocos ciclópicos de pedra esculpidos com precisão milimétrica, montados a seco para dançar com as ondas de terremotos sem desabar.',
    fullContent: `A arquitetura imperial incaica é famosa por sua resistência e beleza austera. Em locais de grande atividade sísmica como Cusco e Ollantaytambo, os edifícios modernos espanhóis desmoronaram repetidamente durante abalos sísmicos, enquanto as muralhas incas sob elas permaneceram intocadas.
Segredos da cantaria:
1. Encaixe a seco (Ashlar): os blocos não usam argamassa; suas faces internas têm ligeiras concavidades e protuberâncias que se travam mutualmente.
2. Flexibilidade sísmica: durante um terremoto, as pedras vibram no lugar e voltam à posição original.
3. Parede trapezoidal e portas inclinadas: centros de gravidade puxados para o interior do edifício aumentam a rigidez estrutural.
4. Pedra de Doze Ângulos: célebre exemplo em Cusco onde uma única rocha se articula perfeitamente com todas as pedras vizinhas.`,
    iconSvg: '<rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 12 L21 12 M12 4 L12 12 M8 12 L8 20 M16 12 L16 20" stroke="currentColor" stroke-width="2"/>',
    locationHint: 'Na oficina de corte de pedra próxima a Wayra.',
    sourceIds: ['protzen_ollantaytambo', 'daltroy_incas'],
    curiosityFact: 'Os incas não usavam ferro para cortar granito; usavam martelos de pedras ainda mais duras (como hematita e olivina basáltica) e areia úmida como abrasivo de polimento.'
  },
  {
    id: 'disc_qullqa',
    name: 'Qullqa (Armazéns Estatais e Segurança Alimentar)',
    category: 'Sociedade',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Rede de silos e celeiros públicos que garantia abastecimento e segurança alimentar por anos em caso de geadas, secas ou guerras.',
    fullContent: `As Qullqas eram armazéns circulares ou retangulares construídos em colinas ventiladas para armazenar alimentos desidratados (chuño, charqui), milho, tecidos, armas e sementes.
O sistema era a espinha dorsal da reciprocidade estatal:
Quando uma província sofria com pragas ou secas, o imperador abria os depósitos da região vizinha para alimentar a população sem cobrar preço monetário.
A localização em encostas altas aproveitava brisas frias e secas constantes, mantendo a temperatura interna baixa e prevenindo fungos e deterioração.`,
    iconSvg: '<path d="M4 10 L12 4 L20 10 L20 20 L4 20 Z M9 20 L9 13 L15 13 L15 20" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Nas construções de pedra com ventilação no platô central.',
    sourceIds: ['morris_huanuco_pampa', 'cieza_cronica'],
    curiosityFact: 'Arqueólogos estimam que dezenas de milhares de Qullqas pontilhavam o império, capazes de manter o Tawantinsuyu alimentado por até 3 a 7 anos sem nenhuma colheita nova!'
  },
  {
    id: 'disc_qeswachaka',
    name: 'Q\'eswachaka (A Ponte Pênsil de Fibra de Ichu)',
    category: 'Tecnologias',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Ponte suspensa trançada inteiramente com capim de altitude pelas comunidades em um mutirão ritual milenar.',
    fullContent: `O capim ichu, que cresce abundante nas punas gélidas, era trançado pelas famílias em cordas finas (q\'eya). Em seguida, essas cordas eram trançadas juntas em cabos grossos da espessura de um tronco humano.
Seis grandes cabos de fibra vegetal atravessavam o abismo de até 30 metros sobre o rio caudaloso, fixados em esteios maciços de pedra em ambas as margens.
A cada ano, comunidades de quatro ayllus (Huinchiri, Chaupibanda, Choccahua e Ccollana Quehue) se reúnem em ritual comunitário (Minka):
A ponte velha é cortada e cai no rio, e uma nova é trançada e esticada em três dias de trabalho e celebração coletiva ininterrupta.`,
    iconSvg: '<path d="M2 8 C8 15, 16 15, 22 8 M2 13 C8 19, 16 19, 22 13 M6 10 L6 16 M12 12 L12 17 M18 10 L18 16" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Cruzando o desfiladeiro rochoso na borda oeste do vale.',
    sourceIds: ['qeswachaka_unesco'],
    curiosityFact: 'Mesmo após a invenção do aço e do concreto, os moradores continuam renovando anualmente a ponte com ichu para manter viva a honra e o ensinamento de seus antepassados.'
  },
  {
    id: 'disc_intihuatana',
    name: 'Intihuatana (O Marco Solar das Estações)',
    category: 'Astronomia',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Escultura talhada diretamente na rocha matriz para observar os movimentos do Sol e ditar o calendário ritual e agrícola.',
    fullContent: `O nome vem do Quechua e significa "lugar onde se ancora ou ata o Sol".
Trata-se de uma coluna de pedra esculpida na própria montanha. No dia do solstício de inverno (Inti Raymi, em junho), quando o sol parece estar mais distante e fraco no hemisfério sul, os sacerdotes realizavam rituais simbólicos para "ancorar" o astro-rei e garantir que ele voltasse a aquecer a terra.
A sombra projetada pela coluna permitia medir com espantosa exatidão os equinócios e solstícios, indicando o momento exato de preparar a terra e semear a batata e o milho.`,
    iconSvg: '<circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 1 L12 3 M12 11 L12 13 M6 7 L4 7 M14 7 L16 7 M8 17 L16 17 L14 11 L10 11 Z" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'No ponto mais alto da aldeia, sobre o cume rochoso.',
    sourceIds: ['rostworowski_incas', 'daltroy_incas'],
    curiosityFact: 'Durante os equinócios de outono e primavera, o sol fica diretamente a pino sobre o topo do Intihuatana ao meio-dia, não projetando nenhuma sombra lateral.'
  },
  {
    id: 'disc_ayllu',
    name: 'Ayllu, Ayni e Minka (O Tecido Social Andino)',
    category: 'Sociedade',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'A estrutura comunitária de parentesco e os princípios éticos de reciprocidade que tornavam a solidariedade obrigatória e voluntária.',
    fullContent: `O Ayllu era a célula fundamental da sociedade andina. Não era apenas uma família biológica, mas uma comunidade ampliada com ancestrais comuns, protegendo um território específico (Marka).
Dois princípios regiam a vida:
- Ayni: ajuda mútua interpessoal. Se uma família precisava construir uma casa ou semear seu campo, vizinhos vinham ajudar com a certeza de que receberiam o mesmo apoio no futuro.
- Minka: esforço coletivo para o bem de todos. Toda a comunidade se mobilizava para limpar canais de água, reparar pontes ou colher as terras dos idosos e enfermos.
Essa cooperação impedia a miséria extrema: ninguém ficava sem comida enquanto houvesse comida no Ayllu.`,
    iconSvg: '<circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="8" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="16" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 11 L12 13 L16 11" stroke="currentColor" stroke-width="2"/>',
    locationHint: 'Aprendido nas conversas com a agricultora Sumaq na praça.',
    sourceIds: ['rostworowski_incas', 'murra_verticalidad'],
    curiosityFact: 'O lema andino "Ama sua, ama llulla, ama quella" (Não roube, não minta, não seja ocioso) resumia a integridade moral esperada de todo membro do Ayllu.'
  },
  {
    id: 'disc_chuno',
    name: 'Chuño e a Liofilização Andina Ancestral',
    category: 'Tecnologias',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'Processo natural de congelamento noturno e desidratação solar que permitia guardar batatas comestíveis por mais de 10 anos.',
    fullContent: `Os povos andinos inventaram a liofilização (desidratação por congelamento) séculos antes dos laboratórios espaciais modernos!
Processo tradicional:
1. As batatas colhidas são espalhadas nas noites gélidas do altiplano (temperaturas abaixo de zero).
2. De manhã, com o sol escaldante e ar seco, a água congelada evapora por sublimação.
3. As pessoas pisam suavemente nas batatas para expelir a umidade restante sem romper a polpa.
4. Repete-se o ciclo por vários dias até a batata se transformar em um tubérculo seco e leve como pedra.
O chuño pode ser armazenado por mais de uma década sem perder propriedades nutricionais e basta ser reidratado em sopas.`,
    iconSvg: '<circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 10 L9 14 M15 10 L15 14 M12 8 L12 16" stroke="currentColor" stroke-width="1.5"/>',
    locationHint: 'Perto do depósito de grãos e batatas na aldeia.',
    sourceIds: ['morris_huanuco_pampa'],
    curiosityFact: 'Esse processo neutraliza os glicoalcaloides amargos presentes em certas batatas silvestres de altitude extrema, tornando-as perfeitamente comestíveis.'
  },
  {
    id: 'disc_runa_simi',
    name: 'Runa Simi (O Idioma Quechua)',
    category: 'Idiomas',
    regionId: 'andes',
    cultureId: 'inca',
    shortDescription: 'A "fala do ser humano", língua franca que unificou centenas de etnias e continua viva hoje na voz de milhões de pessoas.',
    fullContent: `O Quechua (chamado nativamente de Runa Simi, de runa = pessoa/gente, e simi = fala/palavra) foi adotado como língua oficial do Tawantinsuyu para facilitar a administração e a justiça entre povos de idiomas diversos.
É uma língua aglutinante de enorme riqueza poética e afetiva, capaz de expressar nuances de empatia e relação com a natureza em um único sufixo.
Palavras do Quechua presentes no português do dia a dia:
- Pampa (planície)
- Condor (kuntur)
- Lhama (llama)
- Alpaca (allpaqa)
- Charque / Charqui (ch\'arki = carne desidratada ao sol)
- Puma (puma)`,
    iconSvg: '<path d="M4 18 L4 6 A4 4 0 0 1 12 6 A4 4 0 0 1 20 6 L20 18" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 12 Q12 15 16 12" stroke="currentColor" stroke-width="2" fill="none"/>',
    locationHint: 'Descoberto ao dialogar com os moradores da aldeia.',
    sourceIds: ['rostworowski_incas'],
    curiosityFact: 'Hoje, o Quechua é falado por mais de 8 milhões de pessoas no Peru, Bolívia, Equador e Argentina, sendo língua oficial reconhecida constitucionalmente.'
  }
];
