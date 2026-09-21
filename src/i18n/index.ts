import { Language } from '../data/types';
import { GameState } from '../state/GameState';

const messages = {
  es: {
    'menu.badge': 'Exploración histórica y saberes de pueblos originarios',
    'menu.tagline': 'Un viaje interactivo por tecnologías, memorias y culturas de las Américas',
    'menu.start': 'Iniciar viaje', 'menu.continue': 'Continuar exploración',
    'menu.people': 'Pueblo y recorrido', 'menu.atlas': 'Atlas de las Américas',
    'menu.journal': 'Diario de exploración', 'menu.settings': 'Configuración y accesibilidad',
    'menu.about': 'Propósito educativo y fuentes',
    'menu.footer': 'Contenido construido con respeto a la pluralidad cultural y prioridad para fuentes y perspectivas indígenas.',
    'menu.featuredKicker': 'Recorrido inicial · Mexico-Tenochtitlan', 'menu.featuredText': 'Memoria, agua, ciudad y conocimiento vivo.',
    'menu.prototype': 'Prototipo', 'menu.educational3d': 'Web · 3D educativo',
    'settings.badge': 'Preferencias', 'settings.title': 'Configuración y accesibilidad',
    'settings.language': 'Idioma', 'settings.languageHelp': 'El español es el idioma inicial. Tu elección queda guardada en este dispositivo.',
    'settings.accessibility': 'Accesibilidad visual', 'settings.motion': 'Reducir movimiento',
    'settings.motionHelp': 'Reduce animaciones de cámara y transiciones dinámicas.',
    'settings.contrast': 'Alto contraste', 'settings.contrastHelp': 'Aumenta la nitidez de textos, botones y contornos.',
    'settings.textSize': 'Tamaño del texto', 'settings.subtitles': 'Subtítulos y diálogos escritos',
    'settings.audio': 'Audio', 'settings.sfx': 'Efectos de sonido', 'settings.music': 'Música ambiental',
    'settings.storage': 'Datos locales', 'settings.storageHelp': 'El progreso se guarda solamente en tu navegador.',
    'settings.reset': 'Reiniciar todo el progreso', 'settings.close': 'Cerrar',
    'settings.confirmReset': '¿Quieres borrar el progreso y reiniciar los descubrimientos?',
    'settings.resetDone': 'Progreso reiniciado.', 'size.normal': 'Normal', 'size.large': 'Grande', 'size.xlarge': 'Muy grande',
    'people.badge': 'Elige un recorrido', 'people.title': 'Pueblos y civilizaciones jugables',
    'people.intro': 'Cada recorrido tendrá fuentes, voces y contextos propios. No presentamos a los pueblos originarios como una cultura homogénea.',
    'people.mexica': 'Mexica (también conocido como azteca)',
    'people.mexicaDesc': 'Recorrido inicial sobre Mexico-Tenochtitlan, chinampas y saberes mexicas, priorizando fuentes y perspectivas indígenas.',
    'people.start': 'Comenzar con el pueblo Mexica', 'people.soon': 'Próximamente', 'people.back': 'Volver',
    'people.inca': 'Pueblos andinos / Tawantinsuyu', 'people.maya': 'Pueblos mayas',
    'people.mexicaStatus': 'Prototipo 3D disponible', 'people.mexicaStart': 'Jugar el prototipo Mexica 3D', 'people.mexicaExplore': 'Abrir recorrido educativo',
    'people.mexicaPreview': 'Este recorrido está siendo construido con revisión de fuentes y perspectivas indígenas. La experiencia 3D Mexica todavía no está disponible.',
    'people.incaStatus': 'Prototipo 3D disponible', 'people.incaDesc': 'Explora el prototipo actual del Valle Sagrado andino, con misiones, diálogos y minijuegos.', 'people.incaStart': 'Jugar el prototipo andino',
    'people.note': '“Azteca” es el término más difundido internacionalmente; usamos Mexica como nombre propio del pueblo de Mexico-Tenochtitlan.'
    ,'hud.fragments': 'Fragmentos', 'hud.journal': 'Diario', 'hud.map': 'Mapa', 'hud.settings': 'Configuración', 'hud.home': 'Menú principal',
    'journal.badge': 'Registro cultural', 'journal.title': 'Diario de memorias', 'journal.count': 'Descubrimientos registrados', 'journal.search': 'Buscar saberes, tecnologías y costumbres…',
    'journal.all': 'Todas', 'journal.tech': 'Tecnologías', 'journal.agriculture': 'Agricultura', 'journal.architecture': 'Arquitectura', 'journal.society': 'Sociedad', 'journal.astronomy': 'Astronomía', 'journal.languages': 'Idiomas',
    'journal.locked': 'Descubrimiento por revelar', 'journal.hint': 'Pista', 'journal.read': 'Leer detalles y fuentes', 'journal.empty': 'No se encontraron registros con estos criterios.',
    'journal.didYouKnow': '¿Sabías que?', 'journal.sources': 'Fuentes y referencias históricas y arqueológicas', 'journal.sourceLink': 'Consultar registro',
    'atlas.badge': 'Territorios y memorias de las Américas', 'atlas.subtitle': 'Elige un territorio para conocer saberes desde contextos y perspectivas propias.', 'atlas.fragments': 'Tus fragmentos de conocimiento',
    'atlas.playable': 'Jugable', 'atlas.expansion': 'En expansión', 'atlas.characters': 'personajes', 'atlas.discoveries': 'descubrimientos', 'atlas.explore': 'Explorar ahora', 'atlas.soon': 'Disponible próximamente', 'atlas.requires': 'Requiere',
    'mexica.mission': 'Recorrido Mexica', 'mexica.missionTitle': 'La ciudad entre aguas', 'mexica.objective': 'Conversa con tres habitantes educativos y explora calzadas, canales, chinampas y el recinto ceremonial.',
    'mexica.chinampaPrompt': 'Observar el manejo de agua y suelo de las chinampas', 'mexica.causewayPrompt': 'Examinar cómo las calzadas y canales articulan la ciudad', 'mexica.templePrompt': 'Conocer el contexto del recinto ceremonial',
  },
  'pt-BR': {
    'menu.badge': 'Exploração histórica e saberes de povos originários', 'menu.tagline': 'Uma jornada interativa por tecnologias, memórias e culturas das Américas',
    'menu.start': 'Iniciar jornada', 'menu.continue': 'Continuar exploração', 'menu.people': 'Povo e percurso', 'menu.atlas': 'Atlas das Américas',
    'menu.journal': 'Diário de exploração', 'menu.settings': 'Configurações e acessibilidade', 'menu.about': 'Propósito educacional e fontes',
    'menu.footer': 'Conteúdo construído com respeito à pluralidade cultural e prioridade para fontes e perspectivas indígenas.',
    'menu.featuredKicker': 'Percurso inicial · Mexico-Tenochtitlan', 'menu.featuredText': 'Memória, água, cidade e conhecimento vivo.',
    'menu.prototype': 'Protótipo', 'menu.educational3d': 'Web · 3D educativo',
    'settings.badge': 'Preferências', 'settings.title': 'Configurações e acessibilidade', 'settings.language': 'Idioma',
    'settings.languageHelp': 'O espanhol é o idioma inicial. Sua escolha fica salva neste dispositivo.', 'settings.accessibility': 'Acessibilidade visual',
    'settings.motion': 'Reduzir movimento', 'settings.motionHelp': 'Reduz animações de câmera e transições dinâmicas.',
    'settings.contrast': 'Alto contraste', 'settings.contrastHelp': 'Aumenta a nitidez de textos, botões e contornos.',
    'settings.textSize': 'Tamanho do texto', 'settings.subtitles': 'Legendas e diálogos escritos', 'settings.audio': 'Áudio',
    'settings.sfx': 'Efeitos sonoros', 'settings.music': 'Música ambiente', 'settings.storage': 'Dados locais',
    'settings.storageHelp': 'O progresso é salvo apenas no seu navegador.', 'settings.reset': 'Reiniciar todo o progresso', 'settings.close': 'Fechar',
    'settings.confirmReset': 'Deseja apagar o progresso e reiniciar as descobertas?', 'settings.resetDone': 'Progresso reiniciado.',
    'size.normal': 'Normal', 'size.large': 'Grande', 'size.xlarge': 'Muito grande', 'people.badge': 'Escolha um percurso',
    'people.title': 'Povos e civilizações jogáveis', 'people.intro': 'Cada percurso terá fontes, vozes e contextos próprios. Não apresentamos povos originários como uma cultura homogênea.',
    'people.mexica': 'Mexica (também conhecido como Asteca)', 'people.mexicaDesc': 'Percurso inicial sobre Mexico-Tenochtitlan, chinampas e saberes mexicas, priorizando fontes e perspectivas indígenas.',
    'people.start': 'Começar com o povo Mexica', 'people.soon': 'Em breve', 'people.back': 'Voltar', 'people.inca': 'Povos andinos / Tawantinsuyu',
    'people.maya': 'Povos maias', 'people.note': '“Asteca” é o termo mais difundido internacionalmente; usamos Mexica como nome próprio do povo de Mexico-Tenochtitlan.'
    ,'people.mexicaStatus': 'Protótipo 3D disponível', 'people.mexicaStart': 'Jogar o protótipo Mexica 3D', 'people.mexicaExplore': 'Abrir percurso educativo',
    'people.mexicaPreview': 'Este percurso está sendo construído com revisão de fontes e perspectivas indígenas. A experiência 3D Mexica ainda não está disponível.',
    'people.incaStatus': 'Protótipo 3D disponível', 'people.incaDesc': 'Explore o protótipo atual do Vale Sagrado andino, com missões, diálogos e minijogos.', 'people.incaStart': 'Jogar o protótipo andino'
    ,'hud.fragments': 'Fragmentos', 'hud.journal': 'Diário', 'hud.map': 'Mapa', 'hud.settings': 'Configurações', 'hud.home': 'Menu principal',
    'journal.badge': 'Registro cultural', 'journal.title': 'Diário de memórias', 'journal.count': 'Descobertas registradas', 'journal.search': 'Pesquisar saberes, tecnologias e costumes…',
    'journal.all': 'Todas', 'journal.tech': 'Tecnologias', 'journal.agriculture': 'Agricultura', 'journal.architecture': 'Arquitetura', 'journal.society': 'Sociedade', 'journal.astronomy': 'Astronomia', 'journal.languages': 'Idiomas',
    'journal.locked': 'Descoberta a revelar', 'journal.hint': 'Pista', 'journal.read': 'Ler detalhes e fontes', 'journal.empty': 'Nenhum registro encontrado para estes critérios.',
    'journal.didYouKnow': 'Você sabia?', 'journal.sources': 'Fontes e referências históricas e arqueológicas', 'journal.sourceLink': 'Consultar registro',
    'atlas.badge': 'Territórios e memórias das Américas', 'atlas.subtitle': 'Escolha um território para conhecer saberes em seus próprios contextos e perspectivas.', 'atlas.fragments': 'Seus fragmentos de conhecimento',
    'atlas.playable': 'Jogável', 'atlas.expansion': 'Em expansão', 'atlas.characters': 'personagens', 'atlas.discoveries': 'descobertas', 'atlas.explore': 'Explorar agora', 'atlas.soon': 'Disponível em breve', 'atlas.requires': 'Requer',
    'mexica.mission': 'Percurso Mexica', 'mexica.missionTitle': 'A cidade entre águas', 'mexica.objective': 'Converse com três habitantes educativos e explore calçadas, canais, chinampas e o recinto cerimonial.',
    'mexica.chinampaPrompt': 'Observar o manejo de água e solo das chinampas', 'mexica.causewayPrompt': 'Examinar como calçadas e canais articulam a cidade', 'mexica.templePrompt': 'Conhecer o contexto do recinto cerimonial',
  },
  en: {
    'menu.badge': 'Historical exploration and Indigenous knowledge', 'menu.tagline': 'An interactive journey through technologies, memories, and cultures of the Americas',
    'menu.start': 'Start journey', 'menu.continue': 'Continue exploration', 'menu.people': 'People and journey', 'menu.atlas': 'Atlas of the Americas',
    'menu.journal': 'Exploration journal', 'menu.settings': 'Settings and accessibility', 'menu.about': 'Educational purpose and sources',
    'menu.footer': 'Content built with respect for cultural plurality and priority for Indigenous sources and perspectives.',
    'menu.featuredKicker': 'Opening journey · Mexico-Tenochtitlan', 'menu.featuredText': 'Memory, water, city, and living knowledge.',
    'menu.prototype': 'Prototype', 'menu.educational3d': 'Web · educational 3D',
    'settings.badge': 'Preferences', 'settings.title': 'Settings and accessibility', 'settings.language': 'Language',
    'settings.languageHelp': 'Spanish is the initial language. Your choice is saved on this device.', 'settings.accessibility': 'Visual accessibility',
    'settings.motion': 'Reduce motion', 'settings.motionHelp': 'Reduces camera animations and dynamic transitions.',
    'settings.contrast': 'High contrast', 'settings.contrastHelp': 'Improves the definition of text, buttons, and outlines.',
    'settings.textSize': 'Text size', 'settings.subtitles': 'Subtitles and written dialogue', 'settings.audio': 'Audio',
    'settings.sfx': 'Sound effects', 'settings.music': 'Ambient music', 'settings.storage': 'Local data',
    'settings.storageHelp': 'Progress is stored only in your browser.', 'settings.reset': 'Reset all progress', 'settings.close': 'Close',
    'settings.confirmReset': 'Delete progress and restart discoveries?', 'settings.resetDone': 'Progress reset.',
    'size.normal': 'Normal', 'size.large': 'Large', 'size.xlarge': 'Very large', 'people.badge': 'Choose a journey',
    'people.title': 'Playable peoples and civilizations', 'people.intro': 'Each journey will have its own sources, voices, and contexts. We do not present Indigenous peoples as one homogeneous culture.',
    'people.mexica': 'Mexica (also known as Aztec)', 'people.mexicaDesc': 'The initial journey explores Mexico-Tenochtitlan, chinampas, and Mexica knowledge, prioritizing Indigenous sources and perspectives.',
    'people.start': 'Begin with the Mexica people', 'people.soon': 'Coming soon', 'people.back': 'Back', 'people.inca': 'Andean peoples / Tawantinsuyu',
    'people.maya': 'Maya peoples', 'people.note': '“Aztec” is the best-known international term; we use Mexica as the people’s own name for Mexico-Tenochtitlan.'
    ,'people.mexicaStatus': '3D prototype available', 'people.mexicaStart': 'Play the Mexica 3D prototype', 'people.mexicaExplore': 'Open the learning journey',
    'people.mexicaPreview': 'This journey is being built with a review of Indigenous sources and perspectives. The Mexica 3D experience is not available yet.',
    'people.incaStatus': '3D prototype available', 'people.incaDesc': 'Explore the current Andean Sacred Valley prototype, with missions, dialogue, and minigames.', 'people.incaStart': 'Play the Andean prototype'
    ,'hud.fragments': 'Fragments', 'hud.journal': 'Journal', 'hud.map': 'Map', 'hud.settings': 'Settings', 'hud.home': 'Main menu',
    'journal.badge': 'Cultural record', 'journal.title': 'Memory journal', 'journal.count': 'Discoveries recorded', 'journal.search': 'Search knowledge, technologies, and customs…',
    'journal.all': 'All', 'journal.tech': 'Technologies', 'journal.agriculture': 'Agriculture', 'journal.architecture': 'Architecture', 'journal.society': 'Society', 'journal.astronomy': 'Astronomy', 'journal.languages': 'Languages',
    'journal.locked': 'Discovery yet to be revealed', 'journal.hint': 'Hint', 'journal.read': 'Read details and sources', 'journal.empty': 'No records match these criteria.',
    'journal.didYouKnow': 'Did you know?', 'journal.sources': 'Historical and archaeological sources', 'journal.sourceLink': 'Open record',
    'atlas.badge': 'Territories and memories of the Americas', 'atlas.subtitle': 'Choose a territory to explore knowledge through its own contexts and perspectives.', 'atlas.fragments': 'Your knowledge fragments',
    'atlas.playable': 'Playable', 'atlas.expansion': 'In development', 'atlas.characters': 'characters', 'atlas.discoveries': 'discoveries', 'atlas.explore': 'Explore now', 'atlas.soon': 'Coming soon', 'atlas.requires': 'Requires',
    'mexica.mission': 'Mexica journey', 'mexica.missionTitle': 'The city among the waters', 'mexica.objective': 'Talk to three educational residents and explore causeways, canals, chinampas, and the ceremonial precinct.',
    'mexica.chinampaPrompt': 'Observe chinampa water and soil management', 'mexica.causewayPrompt': 'Examine how causeways and canals connect the city', 'mexica.templePrompt': 'Learn about the ceremonial precinct context',
  }
} as const;

export type TranslationKey = keyof typeof messages.es;
export const SUPPORTED_LANGUAGES: Language[] = ['es', 'pt-BR', 'en'];

export function getLanguage(): Language { return GameState.getInstance().settings.language; }
export function t(key: TranslationKey, language: Language = getLanguage()): string { return messages[language][key] ?? messages.es[key]; }
export function applyDocumentLanguage(language: Language): void {
  document.documentElement.lang = language;
  document.getElementById('game-canvas-container')?.setAttribute(
    'aria-label',
    language === 'es' ? 'Escenario 3D interactivo de ANCESTRIA' : language === 'pt-BR' ? 'Cenário 3D interativo de ANCESTRIA' : 'Interactive ANCESTRIA 3D scene'
  );
  document.getElementById('ui-root')?.setAttribute(
    'aria-label',
    language === 'es' ? 'Interfaz del juego e información educativa' : language === 'pt-BR' ? 'Interface do jogo e informações educativas' : 'Game interface and educational information'
  );
}
