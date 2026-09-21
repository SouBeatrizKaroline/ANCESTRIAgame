/**
 * ANCESTRIA - Tipos e Interfaces do Sistema de Dados e Gameplay
 */

export type CultureId = 'inca' | 'maya' | 'mexica' | 'amazonia' | 'indigenas_brasil'
  | 'quechua' | 'zapotec' | 'yanomami' | 'guarani' | 'warao' | 'wayuu'
  | 'tupinamba' | 'xukuru' | 'bribri' | 'raramuri' | 'aymara';
export type Language = 'es' | 'pt-BR' | 'en';
export type RegionId = 'andes' | 'mesoamerica' | 'amazonia' | 'territorios_brasil';

export type DiscoveryCategory =
  | 'Povos'
  | 'Lugares'
  | 'Tecnologias'
  | 'Agricultura'
  | 'Arte'
  | 'Arquitetura'
  | 'Sociedade'
  | 'Astronomia'
  | 'Idiomas'
  | 'Curiosidades'
  | 'Artefatos';

export interface SourceReference {
  id: string;
  author: string;
  title: string;
  year?: string;
  institutionOrPublisher?: string;
  url?: string;
  type: 'livro' | 'artigo_academico' | 'museu' | 'documento_historico' | 'registro_arqueologico';
  notes?: string;
}

export interface Culture {
  id: CultureId;
  name: string;
  originalName?: string;
  primaryRegionId: RegionId;
  timePeriod: string;
  geographicScope: string;
  summary: string;
  detailedOverview: string;
  socialStructure: string[];
  keyTechnologies: string[];
  agriculturePractices: string[];
  astronomyBeliefs: string[];
  artAndArchitecture: string[];
  languages: string[];
  traditionsAndCosmovision: string[];
  academicDiscrepanciesOrNotes?: string[];
  sourceIds: string[];
}

export interface Region {
  id: RegionId;
  name: string;
  titleSubtitle: string;
  status: 'disponivel' | 'em_desenvolvimento' | 'bloqueado';
  unlockRequirementFragments: number;
  timePeriod: string;
  associatedCultureIds: CultureId[];
  description: string;
  environmentDescription: string;
  startingCoordinates: { x: number; y: number; z: number };
  npcCount: number;
  discoveriesCount: number;
  soundscapeTrack: string;
  sourceIds: string[];
}

export interface DialogueChoice {
  text: string;
  response: string;
  unlockDiscoveryId?: string;
  triggerMissionId?: string;
  giveFragments?: number;
}

export interface DialogueNode {
  id: string;
  npcId: string;
  speakerName: string;
  role: string;
  text: string;
  choices?: DialogueChoice[];
  rewardFragments?: number;
  unlockDiscoveryId?: string;
  startsMissionId?: string;
  completesMissionId?: string;
  triggerMinigameId?: 'terraces' | 'quipu' | 'stonework';
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  regionId: RegionId;
  cultureId: CultureId;
  position: { x: number; y: number; z: number };
  rotationY: number;
  visualColor: string;
  clothingDescription: string;
  dialogueRootId: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  regionId: RegionId;
  position: { x: number; y: number; z: number };
  interactionRadius: number;
  interactionType: 'dialogue' | 'minigame' | 'discovery' | 'observation';
  targetId: string; // e.g. minigameId, discoveryId, or dialogueId
  promptText: string;
  iconName: string;
}

export interface Discovery {
  id: string;
  name: string;
  category: DiscoveryCategory;
  regionId: RegionId;
  cultureId: CultureId;
  shortDescription: string;
  fullContent: string;
  iconSvg: string;
  locationHint: string;
  sourceIds: string[];
  curiosityFact?: string;
}

export interface MissionStep {
  id: string;
  description: string;
  isCompleted: boolean;
  targetEntityId?: string;
}

export interface Mission {
  id: string;
  title: string;
  type: 'principal' | 'secundaria';
  regionId: RegionId;
  cultureId: CultureId;
  summary: string;
  rewardFragments: number;
  steps: MissionStep[];
  isCompleted: boolean;
  isActive: boolean;
  unlocksJournalDiscoveryIds?: string[];
  historicalContext: string;
}

export interface Artifact {
  id: string;
  name: string;
  nativeName?: string;
  cultureId: CultureId;
  regionId: RegionId;
  period: string;
  material: string;
  purpose: string;
  description: string;
  estimatedDate: string;
  museumReference?: string;
  sourceIds: string[];
}

export interface UserSettings {
  language: Language;
  reduceMotion: boolean;
  soundVolume: number; // 0 to 1
  musicVolume: number; // 0 to 1
  subtitles: boolean;
  highContrast: boolean;
  fontSize: 'normal' | 'grande' | 'muito_grande';
}

export interface GameSaveData {
  version: number;
  lastSavedAt: string;
  knowledgeFragments: number;
  unlockedRegionIds: RegionId[];
  completedMissionIds: string[];
  activeMissionId: string | null;
  unlockedDiscoveryIds: string[];
  playerTransform: {
    x: number;
    y: number;
    z: number;
    rotationY: number;
  };
  currentRegionId: RegionId;
  selectedCultureId: CultureId;
  settings: UserSettings;
}
