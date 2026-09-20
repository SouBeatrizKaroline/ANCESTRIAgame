import { GameSaveData, RegionId, UserSettings } from '../data/types';
import { ANDES_MISSIONS } from '../data/missions/andesMissions';
import { ANDES_DISCOVERIES } from '../data/discoveries/andesDiscoveries';

const SAVE_KEY = 'atlas_origens_game_save_v1';

export type GameEvent =
  | 'fragments_changed'
  | 'discovery_unlocked'
  | 'mission_updated'
  | 'mission_completed'
  | 'settings_changed'
  | 'region_changed'
  | 'interaction_target_changed';

type EventCallback = (data?: any) => void;

export class GameState {
  private static instance: GameState;

  public knowledgeFragments: number = 0;
  public currentRegionId: RegionId = 'andes';
  public unlockedRegionIds: RegionId[] = ['andes'];
  public completedMissionIds: string[] = [];
  public activeMissionId: string | null = 'mission_main_andes';
  public unlockedDiscoveryIds: string[] = [];
  public playerTransform = { x: 0, y: 0.7, z: 12, rotationY: 0 };
  public nearbyInteraction: {
    id: string;
    name: string;
    type: 'npc' | 'object';
    promptText: string;
  } | null = null;

  public settings: UserSettings = {
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
    // Garante que a primeira missão comece ativa se nenhuma foi concluída
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
          console.error(`Erro ao executar callback para evento ${event}:`, e);
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

      // Checa se todos os passos foram concluídos
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

    // Ativa próxima missão se houver
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
        version: 1,
        lastSavedAt: new Date().toISOString(),
        knowledgeFragments: this.knowledgeFragments,
        unlockedRegionIds: this.unlockedRegionIds,
        completedMissionIds: this.completedMissionIds,
        activeMissionId: this.activeMissionId,
        unlockedDiscoveryIds: this.unlockedDiscoveryIds,
        playerTransform: this.playerTransform,
        currentRegionId: this.currentRegionId,
        settings: this.settings
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Não foi possível salvar no LocalStorage:', e);
    }
  }

  public load(): boolean {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data: GameSaveData = JSON.parse(raw);
      if (data && data.version) {
        this.knowledgeFragments = data.knowledgeFragments || 0;
        this.unlockedRegionIds = data.unlockedRegionIds || ['andes'];
        this.completedMissionIds = data.completedMissionIds || [];
        this.activeMissionId = data.activeMissionId || 'mission_main_andes';
        this.unlockedDiscoveryIds = data.unlockedDiscoveryIds || [];
        this.currentRegionId = data.currentRegionId || 'andes';
        if (data.playerTransform) {
          this.playerTransform = data.playerTransform;
        }
        if (data.settings) {
          this.settings = { ...this.settings, ...data.settings };
        }
        return true;
      }
    } catch (e) {
      console.warn('Erro ao carregar dados salvos:', e);
    }
    return false;
  }

  public resetProgress(): void {
    localStorage.removeItem(SAVE_KEY);
    this.knowledgeFragments = 0;
    this.unlockedRegionIds = ['andes'];
    this.completedMissionIds = [];
    this.activeMissionId = 'mission_main_andes';
    this.unlockedDiscoveryIds = [];
    this.playerTransform = { x: 0, y: 0.7, z: 12, rotationY: 0 };
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
