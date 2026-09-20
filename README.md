# ANCESTRIA 🏛️🌎
### *Stories. Peoples. Memories.*

Jogo educativo de aventura e exploração 2.5D / 3D low-poly sobre saberes e povos originários das Américas.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF.svg)](https://vitejs.org/)
[![Acessibilidade](https://img.shields.io/badge/Acessibilidade-WCAG%20Ready-green.svg)](#acessibilidade)
[![Rigor Histórico](https://img.shields.io/badge/Pesquisa-Fontes%20Acad%C3%AAmicas-orange.svg)](#fontes-e-referências)

---

## Idiomas e percurso inicial

- **Español** é o idioma padrão do jogo.
- **Português** e **English** podem ser escolhidos em **Configurações e acessibilidade**.
- A preferência de idioma é persistida localmente no navegador e reaplicada ao recarregar.
- O catálogo de povos começa por **Mexica**, relacionando de forma contextualizada esse nome próprio ao termo internacionalmente mais conhecido “Azteca/Asteca/Aztec”.
- Incas, Maias e futuros povos são entradas independentes e extensíveis; a arquitetura não os trata como uma cultura originária homogênea.

As traduções da interface ficam centralizadas em `src/i18n/index.ts`, e o fluxo de escolha de povo em `src/ui/CultureSelectionModal.ts`. Para adicionar um idioma, inclua seu código no tipo `Language`, em `SUPPORTED_LANGUAGES` e no catálogo de mensagens. Para adicionar um povo jogável, crie seus dados culturais/fontes e uma entrada própria no seletor, sem reutilizar narrativas de outro povo como se fossem equivalentes.

### Diretriz editorial

Histórias, saberes, nomes e elementos culturais devem ser apresentados como conhecimentos situados, apoiados em relatos, tradições, fontes e perspectivas de povos originários. Fontes indígenas devem ser priorizadas; documentos coloniais podem ser contextualizados como registros históricos, mas não devem ocupar automaticamente o lugar de voz principal.

---

## 📖 Visão Geral e Conceito

O **ANCESTRIA** é um jogo educativo de exploração e aventura construído para a web, com estética visual que mescla **interface 2D acolhedora** e um **mundo tridimensional 2.5D low-poly estilizado**.

O jogador assume o papel de um **Explorador do Conhecimento** que viaja por diferentes regiões e períodos históricos das Américas através de um mapa interativo ancestral. Longe de ser uma plataforma transmissiva ou um mero compilador de perguntas e respostas (quizzes descontextualizados), o jogo ancora a aprendizagem na própria jogabilidade: **explorar o ambiente, interagir com personagens contextuais, manipular tecnologias históricas e registrar descobertas em um diário de campo**.

---

## 🎯 Objetivo Educacional

- **Desconstruir o mito do atraso e da homogeneidade**: Cada sociedade originária das Américas desenvolveu soluções científicas, arquitetônicas, matemáticas, botânicas e sociais de altíssima sofisticação.
- **Pluralidade Cultural**: Incas, Maias, Mexicas, sociedades da Amazônia antiga e povos indígenas do Brasil não formavam uma "cultura única". O jogo evidencia diferenças linguísticas, cosmológicas, geográficas e tecnológicas.
- **Engenharia e Sustentabilidade**: Compreender como técnicas ancestrais — como os terraços agrícolas térmicos (*andenes*), os solos antrópicos de *Terra Preta de Índio*, as ilhas agrícolas flutuantes (*chinampas*) e a arquitetura sismorresistente — dialogavam harmonicamente com seus ecossistemas.
- **Rigor Científico e Evidências**: Explicitar fontes acadêmicas e registros arqueológicos, sem dogmatismos, respeitando controvérsias e debates em aberto na historiografia contemporânea.

---

## 🎮 Ciclo de Gameplay (Game Loop)

O jogo opera sob o princípio:
```
EXPLORAR ➔ DESCOBRIR ➔ INTERAGIR ➔ APRENDER ➔ RESOLVER ➔ DESBLOQUEAR
```

1. **Explorar**: Percorra livremente o cenário 3D em busca de aldeias, caminhos, terraços, monumentos e silos.
2. **Descobrir**: Encontre locais de interesse que emitem partículas de sabedoria e revelam entradas no *Diário do Explorador*.
3. **Interagir**: Converse com NPCs que possuem funções reais na comunidade (mensageiros, agrônomos, guardiões de registros e mestres canteros).
4. **Aprender**: Compreenda a lógica por trás de cada prática histórica através de diálogos objetivos e informativos.
5. **Resolver**: Participe de minigames contextualizados que exigem a aplicação direta do conhecimento adquirido (ex: organizar lavouras por altitude ou atar nós decimais em quipus).
6. **Desbloquear**: Ganhe **Fragmentos de Conhecimento** para desbloquear novas regiões no Atlas, novas páginas no diário e insígnias culturais.

---

## 🌄 O MVP Jogável: Andes & Tawantinsuyu (Incas)

A primeira região verticalmente implementada transporta o jogador para o coração do **Vale Sagrado dos Andes**:

- **Cenário 3D Low-Poly**:
  - Caminho Real pavimentado com pedras (*Qhapaq Ñan*).
  - Terraços agrícolas em socalcos (*Andenes*) com muros de sustentação e canais de irrigação de pedra.
  - Armazéns públicos ventilados (*Qullqas*) para conservação de milho e batatas liofilizadas (*chuño*).
  - Ponte pênsil trançada em capim de altitude (*Q'eswachaka*).
  - Observatório solar sagrado de pedra (*Intihuatana*) no promontório.
  - Oficina de corte de rocha poligonal com a famosa *Pedra dos Doze Ângulos*.
  - Lhamas pastando nas encostas andinas e árvores nativas de *Queñua* (*Polylepis*).
- **NPCs Históricos**:
  1. **Kuntur (o Chasqui)**: Mensageiro veloz das estradas imperiais, introduzindo o sistema de comunicação e os tambos.
  2. **Sumaq (Mestra dos Andenes)**: Especialista em agricultura vertical e microclimas térmicos andinos.
  3. **Tupaq (o Quipucamayoc)**: Guardião dos registros contábeis e fiscais do império.
  4. **Wayra (o Mestre Cantero)**: Arquiteto da alvenaria sismorresistente com juntas a seco sem argamassa.
- **Minigames Educativos Integrados**:
  1. **Organização dos Andenes**: Distribuição correta de culturas (batatas na puna, milho nos vales e coca nas encostas baixas) conforme o modelo de *Controle Vertical de Pisos Ecológicos* de John Murra.
  2. **O Enigma do Quipu**: Decifração e atamento de cordões com nós em posições decimais (centenas, dezenas, unidades) no cordão amarelo de estocagem de milho.
  3. **A Cantaria Sísmica**: Rotação e polimento abrasivo da *Pedra de Doze Ângulos* para atingir estabilidade sismorresistente perfeita.

---

## 🗺️ Estrutura de Regiões do Atlas

O mapa-múndi continental prepara a expansão do jogo em quatro grandes eixos:

| Região | Foco Cultural | Período de Destaque | Status |
| :--- | :--- | :--- | :--- |
| **Andes** | Incas, Chankas, Lupaqas e povos andinos | c. 1438 – 1533 d.C. | **Jogável no MVP** |
| **Mesoamérica** | Maias (Cidades-estado) e Mexicas (Tenochtitlan) | 250 – 1521 d.C. | Em Expansão (150 Fragm.) |
| **Amazônia Ancestral** | Cacicados do Baixo/Alto Amazonas e Terra Preta | 500 – 1500 d.C. | Em Expansão (300 Fragm.) |
| **Territórios de Pindorama** | Povos originários do Brasil (Tupi, Macro-Jê, etc.) | Ancestral ao Contemporâneo | Em Expansão (450 Fragm.) |

---

## 🛠️ Tecnologias Utilizadas

- **TypeScript**: Tipagem estática rigorosa para garantir modularidade e previsibilidade de dados e eventos.
- **Three.js (r160)**: Motor de renderização 3D em tempo real com câmera isométrica 2.5D, sombras suaves e materiais *low-poly* estilizados.
- **Web Audio API**: Gerador sintetizado procedural de áudio para trilha sonora andina pentatônica (flautas quenas e sons de vento) e efeitos sonoros, garantindo funcionamento 100% offline e sem falhas de carregamento de arquivos externos.
- **Vite**: Ferramenta de desenvolvimento ultrarrápida para empacotamento, HMR e build de produção.
- **LocalStorage**: Mecanismo de persistência de dados no cliente sem coleta invasiva ou necessidade de servidores externos.
- **CSS Moderno Responsivo**: Interface com paleta de cores terrosas andinas, variáveis CSS, glassmorphism e compatibilidade total com telas de celulares, tablets e computadores.

---

## 📁 Estrutura de Pastas do Projeto

```
Gemini-RepoLab/
├── index.html                     # Ponto de entrada do Vite e aplicação web
├── standalone.html                # Versão para teste direto no navegador com importmap
├── package.json                   # Dependências e scripts de execução
├── tsconfig.json                  # Configurações do compilador TypeScript
├── vite.config.ts                 # Configuração do bundler Vite
├── README.md                      # Documentação completa do projeto
└── src/
    ├── main.ts                    # Bootstrap do jogo e inicialização dos subsistemas
    ├── data/                      # CONTEÚDO HISTÓRICO E PEDAGÓGICO SEPARADO DA LÓGICA
    │   ├── types.ts               # Tipos e contratos de dados (Culturas, Missões, etc.)
    │   ├── cultures/              # Registros culturais aprofundados
    │   │   ├── inca.ts            # Tawantinsuyu, Ayllu, Ayni, Quipus e Andenes
    │   │   ├── maya.ts            # Escrita hieroglífica, astronomia e milpa
    │   │   ├── mexica.ts          # Tenochtitlan, chinampas e diques
    │   │   ├── amazonia.ts        # Terra preta, geoglifos e agroflorestas
    │   │   ├── brasil.ts          # Teko Porã, saberes botânicos e grafismos
    │   │   └── index.ts           # Catálogo centralizado de culturas
    │   ├── regions/               # Definições geográficas e climáticas
    │   │   ├── andes.ts           # Vale Sagrado, coordenadas e referências
    │   │   ├── mesoamerica.ts     # Selvas e lagos mesoamericanos
    │   │   ├── amazonia.ts        # Bacia amazônica e hidrovias
    │   │   ├── brasil.ts          # Territórios ancestrais de Pindorama
    │   │   └── index.ts           # Catálogo de regiões
    │   ├── missions/              # Sistema de missões principais e secundárias
    │   │   └── andesMissions.ts
    │   ├── discoveries/           # Catálogo categorizado do Diário do Explorador
    │   │   └── andesDiscoveries.ts
    │   ├── dialogues/             # Árvores de diálogos e NPCs
    │   │   └── andesDialogues.ts
    │   ├── artifacts/             # Artefatos modelados e descritos
    │   │   └── andesArtifacts.ts
    │   └── references/            # Fontes bibliográficas e acadêmicas
    │       └── historicalSources.ts
    ├── engine/                    # MOTOR 3D E MULTIMÍDIA
    │   ├── AudioManager.ts        # Sintetizador procedural Web Audio API
    │   ├── PlayerController.ts    # Personagem 3D, física, input e zonas de contato
    │   ├── WorldRenderer.ts       # Construtor procedural do cenário andino 3D
    │   └── GameEngine.ts          # Loop de renderização, câmera isométrica e iluminação
    ├── state/                     # GERENCIAMENTO DE ESTADO E PERSISTÊNCIA
    │   └── GameState.ts           # LocalStorage, fragmentos, missões e eventos reativos
    ├── ui/                        # INTERFACE DO USUÁRIO E COMPONENTES
    │   ├── UIManager.ts           # Coordenador de modais e notificações toast
    │   ├── HUD.ts                 # Interface in-game minimalista e D-Pad touch
    │   ├── MainMenu.ts            # Menu principal do jogo
    │   ├── DialogueModal.ts       # Caixa de diálogo no estilo RPG
    │   ├── JournalModal.ts        # Diário do Explorador categorizado com busca
    │   ├── RegionMapModal.ts      # Mapa continental de ANCESTRIA
    │   ├── SettingsModal.ts       # Painel de configurações e acessibilidade
    │   ├── AboutModal.ts          # Manifesto pedagógico e lista de fontes
    │   └── Minigames/             # Minigames educativos modulares
    │       ├── TerracesMinigame.ts
    │       ├── QuipuMinigame.ts
    │       └── StoneworkMinigame.ts
    └── styles/
        └── main.css               # Estilização completa, variáveis e acessibilidade
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (versão 18 ou superior recomendada).

### 1. Executando em Modo de Desenvolvimento (Vite)
```bash
# Clone o repositório
git clone https://github.com/SouBeatrizKaroline/Gemini-RepoLab.git

# Entre na pasta do projeto
cd Gemini-RepoLab

# Instale as dependências
npm install

# Inicie o servidor local de desenvolvimento
npm run dev
```
O navegador abrirá automaticamente em `http://localhost:3000` (ou na porta indicada no terminal).

### 2. Gerando a Versão de Produção (Build)
```bash
npm run build
```
Os arquivos otimizados e prontos para publicação (GitHub Pages, Vercel, Netlify) serão gerados na pasta `dist/`.

Para testar o build localmente:
```bash
npm run preview
```

---

## 🕹️ Controles

| Ação | Teclado | Mobile / Touch |
| :--- | :--- | :--- |
| **Mover Personagem** | `W, A, S, D` ou `Setas Direcionais` | D-Pad virtual no canto inferior esquerdo |
| **Interagir / Conversar / Ação** | `Tecla E`, `Espaço` ou `Enter` | Botão tátil `AÇÃO [E]` ou balão na tela |
| **Abrir Diário do Explorador** | `Tecla J` ou botão no topo da tela | Toque no botão `📖 Diário` no HUD |
| **Abrir mapa de ANCESTRIA** | `Tecla M` ou botão no topo da tela | Toque no botão `🗺️ Mapa` no HUD |
| **Configurações e Acessibilidade** | Botão `⚙️` no HUD | Toque no ícone de engrenagem |
| **Menu Principal** | Botão `🏠` no HUD | Toque no ícone de casa |

---

## ♿ Acessibilidade e Inclusão

O projeto foi planejado desde a arquitetura inicial com recursos dedicados de acessibilidade:

- **Redução de Movimento (`prefers-reduced-motion`)**: Opção no menu de configurações para desativar oscilações de passos, suavizar o acompanhamento da câmera e eliminar transições bruscas.
- **Alto Contraste**: Modo que eleva o contraste de textos, contornos de botões e cartões de informação para facilitar a leitura por pessoas com baixa visão.
- **Escala Tipográfica Ajustável**: Três tamanhos de fonte disponíveis (*Normal*, *Grande* e *Muito Grande*).
- **Legendas Completas e Diálogos Escritos**: O jogo pode ser aproveitado 100% sem dependência de áudio, com textos descritivos e informativos.
- **Controles Universais**: Suporte integral a teclado, mouse e controles virtuais na tela para telas de toque.
- **Volumes Separados**: Controles graduais para efeitos sonoros e música ambiente, além de opção de mudo imediato.

---

## 📚 Fontes e Referências Acadêmicas

Todo o conteúdo inserido no jogo apoia-se em literatura especializada e relatórios patrimoniais de instituições de pesquisa:

1. **MURRA, John Victor (1972)**. *El control vertical de un máximo de pisos ecológicos en la economía de las sociedades andinas*. Universidad Hermilio Valdizán, Huánuco.
   - *Contribuição:* Base teórica da distribuição de cultivos nos andenes conforme microclimas e altitudes.
2. **ROSTWOROWSKI, María (1988)**. *Historia del Tahuantinsuyu*. Instituto de Estudios Peruanos (IEP).
   - *Contribuição:* Princípios de reciprocidade (*Ayni* e *Minka*), organização social em *Ayllus* e cosmovisão andina.
3. **URTON, Gary (2003)**. *Signs of the Inka Khipu: Binary Coding in the Andean Knotted-String Records*. University of Texas Press.
   - *Contribuição:* Lógica posicional de base decimal, torção das fibras e codificação cromática dos quipus.
4. **PROTZEN, Jean-Pierre (1993)**. *Inca Architecture and Construction at Ollantaytambo*. Oxford University Press.
   - *Contribuição:* Arqueologia experimental sobre cantaria poligonal, corte por percussão com martelos líticos e juntas sismorresistentes sem argamassa.
5. **D’ALTROY, Terence N. (2014)**. *The Incas*. Wiley-Blackwell (2ª ed.).
   - *Contribuição:* Dados arqueológicos sobre a malha viária do *Qhapaq Ñan* e a rede de depósitos (*Qullqas*).
6. **UNESCO / MINISTÉRIO DA CULTURA DO PERU (2013)**. *Conhecimentos, técnicas e rituais associados à renovação anual da ponte Q’eswachaka*. Patrimônio Cultural Imaterial da Humanidade.
   - *Contribuição:* Engenharia comunitária tradicional de trançado de capim *ichu*.
7. **NEVES, Eduardo Góes (2022)**. *Sob os Tempos do Equinócio: Oito mil anos de história na Amazônia Central*. Ubu Editora / EDUSP.
   - *Contribuição:* Evidências de solos antrópicos (*Terra Preta de Índio*), geoglifos e manejo florestal pré-colonial.
8. **FAUSTO, Carlos (2000)**. *Os Índios antes do Brasil*. Jorge Zahar Editor.
   - *Contribuição:* Síntese arqueológica e etnográfica da diversidade de povos indígenas no território brasileiro.
9. **COE, Michael D. & HOUSTON, Stephen (2015)**. *The Maya*. Thames & Hudson (9ª ed.).
   - *Contribuição:* Epigrafia maia, agricultura consorciada (*milpa*) e cidades-estado.

---

## 🔮 Roadmap e Expansões Futuras

- [ ] **Mesoamérica: O Esplendor das Cidades-Estado e Lagos**
  - Implementação da região jogável com pirâmides maias de calcário e as hortas flutuantes (*chinampas*) de Tenochtitlan.
  - Minigame do calendário e matemática vigesimal maia com o uso do zero.
- [ ] **Amazônia: Floresta Cultivada & Cacicados das Águas**
  - Cenário de igarapés e aldeias circulares com estradas elevadas.
  - Minigame de produção sustentável de *Terra Preta de Índio* (biochar e restos orgânicos) e cerâmica Marajoara/Tapajônica.
- [ ] **Territórios de Pindorama: Saberes e Biodiversidade**
  - Exploração dos conhecimentos botânicos medicinais dos povos Tupi, Guarani e Macro-Jê.
  - Minigame de arquitetura sustentável de grandes malocas termoacústicas e manejo agroecológico de coivara com pousio.
- [ ] **Modo Professor / Educador**:
  - Painel com trilhas temáticas para uso em sala de aula (alinhado a diretrizes curriculares de história e geografia).
  - Geração de relatórios de atividades e reflexões pedagógicas.
- [ ] **Exposições Virtuais e Integração com Museus**:
  - Parcerias para exibir réplicas digitais 3D (fotogrametria) de artefatos reais do Museu Larco, Museu Nacional e instituições comunitárias indígenas.
- [ ] **Glossário de Idiomas Originários**:
  - Gravações e pronúncias de termos fundamentais em *Runa Simi* (Quechua), *Aymara*, *Nahuatl*, *Tupi-Guarani* e línguas indígenas brasileiras faladas na atualidade.

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [MIT](LICENSE) com finalidade educacional, cultural e de preservação da memória histórica das Américas.
