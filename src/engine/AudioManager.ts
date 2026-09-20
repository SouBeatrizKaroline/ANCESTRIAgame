import { GameState } from '../state/GameState';

/**
 * AudioManager - Gerador de áudio e sonoplastia sintetizada procedural via Web Audio API.
 * Não requer arquivos de áudio externos, garantindo reprodução instantânea e sem falhas de conexão.
 */
export class AudioManager {
  private static instance: AudioManager;
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicIntervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  // Escala pentatônica andina tradicional (Lá Menor Pentatônica: A - C - D - E - G)
  private pentatonicFrequencies = [
    220.0, // A3
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.0, // G4
    440.0, // A4 (Quena fundamental)
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99 // G5
  ];

  private constructor() {
    // Inicialização sob demanda após primeiro clique do usuário para respeitar políticas de navegadores
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private initContext(): void {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.connect(this.masterGain);

        this.musicGain = this.ctx.createGain();
        this.musicGain.connect(this.masterGain);

        this.updateVolumes();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public updateVolumes(): void {
    const state = GameState.getInstance();
    if (this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(state.settings.soundVolume, this.ctx?.currentTime || 0);
    }
    if (this.musicGain) {
      this.musicGain.gain.setValueAtTime(state.settings.musicVolume * 0.4, this.ctx?.currentTime || 0);
    }
  }

  /**
   * Toca efeito de passo sobre solo andino
   */
  public playStep(): void {
    this.initContext();
    if (!this.ctx || !this.sfxGain || GameState.getInstance().settings.soundVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90 + Math.random() * 30, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Efeito de interação suave (sino de madeira / pedra)
   */
  public playInteract(): void {
    this.initContext();
    if (!this.ctx || !this.sfxGain || GameState.getInstance().settings.soundVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Efeito de descoberta cultural registrada
   */
  public playDiscovery(): void {
    this.initContext();
    if (!this.ctx || !this.sfxGain || GameState.getInstance().settings.soundVolume <= 0) return;

    const now = this.ctx.currentTime;
    const notes = [440.0, 523.25, 659.25, 783.99, 880.0]; // Acorde pentatônico ascendente

    notes.forEach((freq, index) => {
      const noteTime = now + index * 0.08;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.18, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  }

  /**
   * Efeito de vitória / missão concluída
   */
  public playMissionComplete(): void {
    this.initContext();
    if (!this.ctx || !this.sfxGain || GameState.getInstance().settings.soundVolume <= 0) return;

    const now = this.ctx.currentTime;
    const fanfare = [
      { f: 440, t: 0 },
      { f: 523.25, t: 0.12 },
      { f: 659.25, t: 0.24 },
      { f: 880, t: 0.4 },
      { f: 1046.5, t: 0.65 }
    ];

    fanfare.forEach((note) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0.22, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + note.t);
      osc.stop(now + note.t + 0.55);
    });
  }

  /**
   * Efeito de clique de UI
   */
  public playClick(): void {
    this.initContext();
    if (!this.ctx || !this.sfxGain || GameState.getInstance().settings.soundVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Inicia trilha sonora andina procedural suave com notas de flauta quena e vento
   */
  public startAndeanMusic(): void {
    this.initContext();
    if (this.isMusicPlaying || !this.ctx || !this.musicGain) return;
    this.isMusicPlaying = true;

    // Loop de notas melódicas pentatônicas calmas
    const playMelodyNote = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      if (GameState.getInstance().settings.musicVolume <= 0) return;

      const now = this.ctx.currentTime;
      const freq = this.pentatonicFrequencies[
        Math.floor(Math.random() * this.pentatonicFrequencies.length)
      ];

      const osc = this.ctx.createOscillator();
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      const noteGain = this.ctx.createGain();

      // Timbre suave de flauta de bambu (onda senoidal com sutil vibrato)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      vibrato.frequency.setValueAtTime(5.5, now); // 5.5 Hz vibrato
      vibratoGain.gain.setValueAtTime(4.0, now);
      vibrato.connect(osc.frequency);

      // Envelope com ataque suave e sustentação
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.15, now + 0.4);
      noteGain.gain.linearRampToValueAtTime(0.1, now + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc.connect(noteGain);
      noteGain.connect(this.musicGain);

      vibrato.start(now);
      osc.start(now);
      vibrato.stop(now + 2.5);
      osc.stop(now + 2.5);
    };

    // Toca uma nota suave a cada 2 a 3.5 segundos
    const scheduleNext = () => {
      if (!this.isMusicPlaying) return;
      playMelodyNote();
      const delay = 1800 + Math.random() * 1500;
      this.musicIntervalId = window.setTimeout(scheduleNext, delay);
    };

    scheduleNext();
  }

  public stopMusic(): void {
    this.isMusicPlaying = false;
    if (this.musicIntervalId) {
      clearTimeout(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }
}
