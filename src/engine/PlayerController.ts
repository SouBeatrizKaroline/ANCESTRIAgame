import * as THREE from 'three';
import { GameState } from '../state/GameState';
import { AudioManager } from './AudioManager';
import { ANDES_NPCS } from '../data/dialogues/andesDialogues';

export interface InteractiveZone {
  id: string;
  name: string;
  type: 'npc' | 'object';
  position: THREE.Vector3;
  radius: number;
  promptText: string;
  onInteract: () => void;
}

export class PlayerController {
  public group: THREE.Group;
  private leftLeg!: THREE.Mesh;
  private rightLeg!: THREE.Mesh;
  private bodyMesh!: THREE.Mesh;
  private headMesh!: THREE.Mesh;
  private hatMesh!: THREE.Mesh;
  private chuspaMesh!: THREE.Mesh;

  private speed: number = 7.0;
  private keys: { [key: string]: boolean } = {};
  private moveDirection: THREE.Vector3 = new THREE.Vector3();
  private walkCycle: number = 0;
  private lastStepSoundTime: number = 0;

  public interactiveZones: InteractiveZone[] = [];
  public currentInteractiveZone: InteractiveZone | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.buildMesh();
    this.setupInputs();

    // Carrega posição inicial do GameState
    const state = GameState.getInstance();
    this.group.position.set(state.playerTransform.x, state.playerTransform.y, state.playerTransform.z);
    this.group.rotation.y = state.playerTransform.rotationY;
  }

  private buildMesh(): void {
    // Materiais low-poly estilizados
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xc68642 });
    const ponchoMat = new THREE.MeshLambertMaterial({ color: 0xb23a22 }); // Vermelho terroso inca
    const ponchoAccentMat = new THREE.MeshLambertMaterial({ color: 0xf4a261 }); // Ocre
    const chulloMat = new THREE.MeshLambertMaterial({ color: 0x2a9d8f }); // Azul-turquesa andino
    const chulloAccentMat = new THREE.MeshLambertMaterial({ color: 0xe76f51 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x4a4e69 });
    const bagMat = new THREE.MeshLambertMaterial({ color: 0xe9c46a });

    // Tronco / Poncho (Unku)
    const ponchoGeo = new THREE.CylinderGeometry(0.32, 0.45, 0.65, 6);
    this.bodyMesh = new THREE.Mesh(ponchoGeo, ponchoMat);
    this.bodyMesh.position.y = 0.62;
    this.bodyMesh.castShadow = true;
    this.group.add(this.bodyMesh);

    // Detalhe de faixa no poncho (Tokapu)
    const bandGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.12, 6);
    const bandMesh = new THREE.Mesh(bandGeo, ponchoAccentMat);
    bandMesh.position.y = 0.58;
    this.group.add(bandMesh);

    // Bolsa tiracolo (Chuspa)
    const bagGeo = new THREE.BoxGeometry(0.18, 0.22, 0.1);
    this.chuspaMesh = new THREE.Mesh(bagGeo, bagMat);
    this.chuspaMesh.position.set(0.3, 0.5, 0.15);
    this.chuspaMesh.rotation.z = -0.2;
    this.group.add(this.chuspaMesh);

    // Cabeça
    const headGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    this.headMesh = new THREE.Mesh(headGeo, skinMat);
    this.headMesh.position.y = 1.1;
    this.headMesh.castShadow = true;
    this.group.add(this.headMesh);

    // Gorro Andino com abas (Chullo)
    const hatGeo = new THREE.ConeGeometry(0.32, 0.4, 5);
    this.hatMesh = new THREE.Mesh(hatGeo, chulloMat);
    this.hatMesh.position.y = 1.35;
    this.group.add(this.hatMesh);

    // Abas de orelha do chullo
    const earGeo = new THREE.BoxGeometry(0.06, 0.16, 0.12);
    const leftEar = new THREE.Mesh(earGeo, chulloAccentMat);
    leftEar.position.set(0.2, 1.05, 0);
    const rightEar = new THREE.Mesh(earGeo, chulloAccentMat);
    rightEar.position.set(-0.2, 1.05, 0);
    this.group.add(leftEar);
    this.group.add(rightEar);

    // Pernas
    const legGeo = new THREE.BoxGeometry(0.14, 0.45, 0.14);
    this.leftLeg = new THREE.Mesh(legGeo, pantsMat);
    this.leftLeg.position.set(0.14, 0.22, 0);
    this.leftLeg.castShadow = true;
    this.group.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(legGeo, pantsMat);
    this.rightLeg.position.set(-0.14, 0.22, 0);
    this.rightLeg.castShadow = true;
    this.group.add(this.rightLeg);
  }

  private setupInputs(): void {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') {
        this.interact();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  public setVirtualMove(dirX: number, dirZ: number): void {
    this.moveDirection.set(dirX, 0, dirZ);
    if (this.moveDirection.lengthSq() > 1) {
      this.moveDirection.normalize();
    }
  }

  public update(delta: number): void {
    const isReducedMotion = GameState.getInstance().settings.reduceMotion;

    // Movimento por teclado
    let keyboardDirX = 0;
    let keyboardDirZ = 0;

    if (this.keys['KeyW'] || this.keys['ArrowUp']) keyboardDirZ -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) keyboardDirZ += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) keyboardDirX -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) keyboardDirX += 1;

    let moveX = this.moveDirection.x || keyboardDirX;
    let moveZ = this.moveDirection.z || keyboardDirZ;

    const dir = new THREE.Vector3(moveX, 0, moveZ);
    const isMoving = dir.lengthSq() > 0.01;

    if (isMoving) {
      dir.normalize();

      // Rotação suave do personagem na direção do movimento
      const targetRotation = Math.atan2(dir.x, dir.z);
      let diff = targetRotation - this.group.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.group.rotation.y += diff * (isReducedMotion ? 0.4 : 0.2);

      // Deslocamento
      const moveDistance = this.speed * delta;
      const nextX = this.group.position.x + dir.x * moveDistance;
      const nextZ = this.group.position.z + dir.z * moveDistance;

      // Limites do vale andino jogável (-24 a +24 em X, -24 a +24 em Z)
      if (nextX > -24 && nextX < 24) {
        this.group.position.x = nextX;
      }
      if (nextZ > -24 && nextZ < 24) {
        this.group.position.z = nextZ;
      }

      // Animação de caminhada das pernas
      this.walkCycle += delta * 12;
      if (!isReducedMotion) {
        this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.6;
        this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.6;
        this.bodyMesh.position.y = 0.62 + Math.abs(Math.sin(this.walkCycle * 2)) * 0.04;
      }

      // Som de passos periódicos
      const now = performance.now();
      if (now - this.lastStepSoundTime > 340) {
        AudioManager.getInstance().playStep();
        this.lastStepSoundTime = now;
      }
    } else {
      // Repouso
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.bodyMesh.position.y = 0.62;
    }

    // Atualiza estado do jogador
    const state = GameState.getInstance();
    state.playerTransform.x = this.group.position.x;
    state.playerTransform.y = this.group.position.y;
    state.playerTransform.z = this.group.position.z;
    state.playerTransform.rotationY = this.group.rotation.y;

    // Checagem de zonas de interação próximas
    this.checkInteractiveZones();
  }

  private checkInteractiveZones(): void {
    const playerPos = this.group.position;
    let closestZone: InteractiveZone | null = null;
    let minDistance = Infinity;

    for (const zone of this.interactiveZones) {
      const dist = playerPos.distanceTo(zone.position);
      if (dist <= zone.radius && dist < minDistance) {
        minDistance = dist;
        closestZone = zone;
      }
    }

    this.currentInteractiveZone = closestZone;
    const state = GameState.getInstance();

    if (closestZone) {
      state.setNearbyInteraction({
        id: closestZone.id,
        name: closestZone.name,
        type: closestZone.type,
        promptText: closestZone.promptText
      });
    } else {
      state.setNearbyInteraction(null);
    }
  }

  public interact(): void {
    if (this.currentInteractiveZone) {
      AudioManager.getInstance().playInteract();
      this.currentInteractiveZone.onInteract();
    }
  }
}
