import * as THREE from 'three';
import { PlayerController } from './PlayerController';
import { WorldRenderer } from './WorldRenderer';
import { GameState } from '../state/GameState';
import { CultureId } from '../data/types';

export class GameEngine {
  private container: HTMLElement;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public playerController: PlayerController;
  public worldRenderer: WorldRenderer;

  private clock: THREE.Clock;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private readonly boundResize = () => this.onWindowResize();
  private resizeObserver: ResizeObserver | null = null;

  // Parâmetros de câmera suave isométrica 2.5D
  private cameraOffset = new THREE.Vector3(0, 11, 12);
  private cameraLookTarget = new THREE.Vector3();

  constructor(
    container: HTMLElement,
    cultureId: CultureId,
    onTriggerNpc: (npcId: string) => void,
    onTriggerObject: (objectId: string) => void
  ) {
    this.container = container;
    this.clock = new THREE.Clock();

    // 1. Cena com atmosfera límpida
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x9fc8dc);
    this.scene.fog = new THREE.FogExp2(0x9fc8dc, 0.012);

    // 2. Câmera com ângulo isométrico acolhedor (2.5D)
    const initialWidth = Math.max(container.clientWidth || window.innerWidth || 1, 1);
    const initialHeight = Math.max(container.clientHeight || window.innerHeight || 1, 1);
    const aspect = initialWidth / initialHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.5, 120);

    // 3. Renderizador WebGL otimizado
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(initialWidth, initialHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Iluminação solar acolhedora e luz difusa
    this.setupLighting();

    // 5. Controlador do Jogador
    this.playerController = new PlayerController(cultureId);
    this.scene.add(this.playerController.group);

    // 6. Construtor do Cenário
    this.worldRenderer = new WorldRenderer(this.scene);
    if (cultureId === 'mexica') this.worldRenderer.buildMexicaEnvironment(this.playerController, onTriggerNpc, onTriggerObject);
    else if (cultureId === 'inca') this.worldRenderer.buildAndesEnvironment(this.playerController, onTriggerNpc, onTriggerObject);
    else this.worldRenderer.buildPeopleAtlasEnvironment(cultureId, this.playerController, onTriggerNpc, onTriggerObject);

    // 7. Garante posicionamento em ponto de início seguro e sem colisão
    this.playerController.spawnForCulture(cultureId);

    // 8. Sincroniza a câmera imediatamente com o ponto de surgimento
    const pPos = this.playerController.group.position;
    this.camera.position.set(pPos.x + this.cameraOffset.x, pPos.y + this.cameraOffset.y, pPos.z + this.cameraOffset.z);
    this.cameraLookTarget.copy(pPos);
    this.camera.lookAt(pPos.x, pPos.y + 0.8, pPos.z);

    // 9. Event listeners
    window.addEventListener('resize', this.boundResize);
    this.resizeObserver = new ResizeObserver(this.boundResize);
    this.resizeObserver.observe(this.container);
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xfff3b0, 0.65);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffae0, 1.1);
    sunLight.position.set(18, 30, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 70;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    this.scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xa0c4ff, 0.35);
    fillLight.position.set(-15, 12, -15);
    this.scene.add(fillLight);
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();
    this.loop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private loop = (): void => {
    if (!this.isRunning) return;
    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // Atualiza jogador
    this.playerController.update(delta);

    // Anima elementos ambientais
    this.worldRenderer.animate(elapsedTime);

    // Câmera segue o jogador suavemente
    const playerPos = this.playerController.group.position;
    if (![playerPos.x, playerPos.y, playerPos.z].every(Number.isFinite)) {
      this.playerController.spawnForCulture(GameState.getInstance().selectedCultureId);
    }
    const targetCamX = playerPos.x + this.cameraOffset.x;
    const targetCamY = playerPos.y + this.cameraOffset.y;
    const targetCamZ = playerPos.z + this.cameraOffset.z;

    const isReducedMotion = GameState.getInstance().settings.reduceMotion;
    const lerpFactor = isReducedMotion ? 0.3 : 0.08;

    if (![targetCamX, targetCamY, targetCamZ].every(Number.isFinite)) {
      this.animationFrameId = requestAnimationFrame(this.loop);
      return;
    }
    this.camera.position.x += (targetCamX - this.camera.position.x) * lerpFactor;
    this.camera.position.y += (targetCamY - this.camera.position.y) * lerpFactor;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * lerpFactor;

    this.cameraLookTarget.lerp(playerPos, lerpFactor);
    this.camera.lookAt(
      this.cameraLookTarget.x,
      this.cameraLookTarget.y + 0.8,
      this.cameraLookTarget.z
    );

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private onWindowResize(): void {
    if (!this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public forceRefreshView(): void {
    requestAnimationFrame(() => {
      this.onWindowResize();
      this.camera.updateMatrixWorld();
      this.renderer.render(this.scene, this.camera);
    });
  }

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.boundResize);
    this.resizeObserver?.disconnect();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
