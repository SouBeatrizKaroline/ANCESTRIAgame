import { CultureId, GameSaveData, RegionId, UserSettings } from '../data/types';
import { ANDES_MISSIONS } from '../data/missions/andesMissions';
import { ANDES_DISCOVERIES } from '../data/discoveries/andesDiscoveries';
import { CULTURE_SPAWN_POINTS } from '../engine/PlayerController';

const SAVE_KEY = 'ancestria_game_save_v2';

export type GameEvent =
  | 'fragments_changed'
  | 'discovery_unlocked'
  | 'mission_updated'
  | 'mission_completed'
  | 'settings_changed'
  | 'culture_changed'
  | 'region_changed'
  | 'interaction_target_changed';

type EventCallback = (data?: any) => void;

export class GameState {
  private static instance: GameState;

  public knowledgeFragments: number = 0;
  public currentRegionId: RegionId = 'mesoamerica';
  public selectedCultureId: CultureId = 'mexica';
  public unlockedRegionIds: RegionId[] = ['mesoamerica'];
  public completedMissionIds: string[] = [];
  public activeMissionId: string | null = 'mission_main_andes';
  public unlockedDiscoveryIds: string[] = [];
  public playerTransform = { x: 0, y: 0.7, z: 6, rotationY: Math.PI };
  public nearbyInteraction: {
    id: string;
    name: string;
    type: 'npc' | 'object';
    promptText: string;
  } | null = null;

  public settings: UserSettings = {
    language: 'es',
    reduceMotion: false,
    soundVolume: 0.8,
    musicVolume: 0.5,
    subtitles: true,
    highContrast: false,
    fontSize: 'normal'
  };

  private listeners: Map<GameEvent, Set<EventCallback>> = new Map();

  private constructor() {
    this.load();
    if (!this.activeMissionId && this.completedMissionIds.length === 0) {
      this.activeMissionId = 'mission_main_andes';
    }
  }

  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  public on(event: GameEvent, cb: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(cb);
    return () => this.listeners.get(event)?.delete(cb);
  }

  public emit(event: GameEvent, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error en callback de evento ${event}:`, e);
        }
      });
    }
  }

  public addKnowledgeFragments(amount: number): void {
    if (amount <= 0) return;
    this.knowledgeFragments += amount;
    this.save();
    this.emit('fragments_changed', this.knowledgeFragments);
  }

  public unlockDiscovery(discoveryId: string): boolean {
    if (this.unlockedDiscoveryIds.includes(discoveryId)) {
      return false;
    }
    this.unlockedDiscoveryIds.push(discoveryId);
    this.addKnowledgeFragments(20);
    this.save();
    this.emit('discovery_unlocked', discoveryId);
    return true;
  }

  public isDiscoveryUnlocked(discoveryId: string): boolean {
    return this.unlockedDiscoveryIds.includes(discoveryId);
  }

  public completeMissionStep(missionId: string, stepId: string): void {
    const mission = ANDES_MISSIONS.find((m) => m.id === missionId);
    if (!mission) return;

    const step = mission.steps.find((s) => s.id === stepId);
    if (step && !step.isCompleted) {
      step.isCompleted = true;
      this.emit('mission_updated', mission);

      const allCompleted = mission.steps.every((s) => s.isCompleted);
      if (allCompleted && !this.completedMissionIds.includes(missionId)) {
        this.completeMission(missionId);
      }
    }
  }

  public completeMission(missionId: string): void {
    if (this.completedMissionIds.includes(missionId)) return;

    const mission = ANDES_MISSIONS.find((m) => m.id === missionId);
    if (!mission) return;

    mission.isCompleted = true;
    mission.isActive = false;
    this.completedMissionIds.push(missionId);
    this.addKnowledgeFragments(mission.rewardFragments);

    if (mission.unlocksJournalDiscoveryIds) {
      mission.unlocksJournalDiscoveryIds.forEach((id) => this.unlockDiscovery(id));
    }

    if (missionId === 'mission_main_andes') {
      const sec1 = ANDES_MISSIONS.find((m) => m.id === 'mission_sec_andenes');
      if (sec1 && !this.completedMissionIds.includes(sec1.id)) {
        sec1.isActive = true;
        this.activeMissionId = sec1.id;
      }
    }

    this.save();
    this.emit('mission_completed', mission);
  }

  public updateSettings(newSettings: Partial<UserSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    this.save();
    this.emit('settings_changed', this.settings);
  }

  public selectCulture(cultureId: CultureId): void {
    this.selectedCultureId = cultureId;
    this.currentRegionId = cultureId === 'mexica' || cultureId === 'maya' ? 'mesoamerica' : 'andes';
    const spawn = CULTURE_SPAWN_POINTS[cultureId] || CULTURE_SPAWN_POINTS.default;
    this.playerTransform = { x: spawn.x, y: spawn.y, z: spawn.z, rotationY: spawn.rotationY };
    this.save();
    this.emit('culture_changed', cultureId);
  }

  public setNearbyInteraction(interaction: typeof this.nearbyInteraction): void {
    if (
      this.nearbyInteraction?.id !== interaction?.id ||
      this.nearbyInteraction?.promptText !== interaction?.promptText
    ) {
      this.nearbyInteraction = interaction;
      this.emit('interaction_target_changed', interaction);
    }
  }

  public save(): void {
    try {
      const data: GameSaveData = {
        version: 2,
        lastSavedAt: new Date().toISOString(),
        knowledgeFragments: this.knowledgeFragments,
        unlockedRegionIds: this.unlockedRegionIds,
        completedMissionIds: this.completedMissionIds,
        activeMissionId: this.activeMissionId,
        unlockedDiscoveryIds: this.unlockedDiscoveryIds,
        playerTransform: this.playerTransform,
        currentRegionId: this.currentRegionId,
        selectedCultureId: this.selectedCultureId,
        settings: this.settings
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('No se pudo guardar en LocalStorage:', e);
    }
  }

  public load(): boolean {
    try {
      const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem('atlas_origens_game_save_v1');
      if (!raw) return false;
      const data: GameSaveData = JSON.parse(raw);
      if (data) {
        this.knowledgeFragments = data.knowledgeFragments || 0;
        this.unlockedRegionIds = data.unlockedRegionIds || ['mesoamerica'];
        this.completedMissionIds = data.completedMissionIds || [];
        this.activeMissionId = data.activeMissionId || 'mission_main_andes';
        this.unlockedDiscoveryIds = data.unlockedDiscoveryIds || [];
        this.currentRegionId = data.currentRegionId || 'mesoamerica';
        this.selectedCultureId = data.selectedCultureId || 'mexica';
        if (data.playerTransform && [data.playerTransform.x, data.playerTransform.y, data.playerTransform.z].every(Number.isFinite)) {
          this.playerTransform = data.playerTransform;
        } else {
          const spawn = CULTURE_SPAWN_POINTS[this.selectedCultureId] || CULTURE_SPAWN_POINTS.default;
          this.playerTransform = { x: spawn.x, y: spawn.y, z: spawn.z, rotationY: spawn.rotationY };
        }
        if (data.settings) {
          this.settings = { ...this.settings, ...data.settings };
        }
        return true;
      }
    } catch (e) {
      console.warn('Error al cargar datos guardados:', e);
    }
    return false;
  }

  public resetProgress(): void {
    const progressKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('ancestria_') || key.startsWith('atlas_origens_') || key === SAVE_KEY)) {
        progressKeys.push(key);
      }
    }
    progressKeys.forEach((key) => localStorage.removeItem(key));
    this.knowledgeFragments = 0;
    this.unlockedRegionIds = ['mesoamerica'];
    this.completedMissionIds = [];
    this.activeMissionId = 'mission_main_andes';
    this.unlockedDiscoveryIds = [];
    this.currentRegionId = 'mesoamerica';
    this.selectedCultureId = 'mexica';
    const spawn = CULTURE_SPAWN_POINTS.mexica;
    this.playerTransform = { x: spawn.x, y: spawn.y, z: spawn.z, rotationY: spawn.rotationY };
    ANDES_MISSIONS.forEach((m) => {
      m.isCompleted = false;
      m.isActive = m.id === 'mission_main_andes';
      m.steps.forEach((s) => (s.isCompleted = false));
    });
    this.save();
    this.emit('fragments_changed', 0);
    this.emit('mission_updated', null);
  }
}
