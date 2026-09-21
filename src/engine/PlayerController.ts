import * as THREE from 'three';
import { GameState, CULTURE_SPAWN_POINTS } from '../state/GameState';
import { AudioManager } from './AudioManager';
import { CultureId } from '../data/types';

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
  public cultureId: CultureId;
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
  private verticalVelocity = 0;
  private readonly groundY = 0.7;
  public colliders: THREE.Box3[] = [];

  public interactiveZones: InteractiveZone[] = [];
  public currentInteractiveZone: InteractiveZone | null = null;

  constructor(cultureId: CultureId = 'inca') {
    this.cultureId = cultureId;
    this.group = new THREE.Group();
    this.buildMesh(cultureId);
    this.setupInputs();

    this.resetToSpawn(cultureId);
  }

  public resetToSpawn(cultureId: CultureId = this.cultureId): void {
    this.cultureId = cultureId;
    const spawn = CULTURE_SPAWN_POINTS[cultureId] || { x: 0, y: 0.7, z: 12, rotationY: Math.PI };
    this.group.position.set(spawn.x, spawn.y, spawn.z);
    this.group.rotation.y = spawn.rotationY;
    this.verticalVelocity = 0;

    const state = GameState.getInstance();
    state.playerTransform.x = spawn.x;
    state.playerTransform.y = spawn.y;
    state.playerTransform.z = spawn.z;
    state.playerTransform.rotationY = spawn.rotationY;
  }

  private buildMesh(cultureId: CultureId): void {
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xc68642 });
    const ponchoMat = new THREE.MeshLambertMaterial({ color: cultureId === 'mexica' ? 0x274c47 : 0xb23a22 });
    const ponchoAccentMat = new THREE.MeshLambertMaterial({ color: 0xf4a261 });
    const chulloMat = new THREE.MeshLambertMaterial({ color: cultureId === 'mexica' ? 0xc98c3a : 0x2a9d8f });
    const chulloAccentMat = new THREE.MeshLambertMaterial({ color: 0xe76f51 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x4a4e69 });
    const bagMat = new THREE.MeshLambertMaterial({ color: 0xe9c46a });
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x25150f });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1b1210 });

    const ponchoGeo = new THREE.CylinderGeometry(0.32, 0.45, 0.65, 6);
    this.bodyMesh = new THREE.Mesh(ponchoGeo, ponchoMat);
    this.bodyMesh.position.y = 0.62;
    this.bodyMesh.castShadow = true;
    this.group.add(this.bodyMesh);

    const bandGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.12, 6);
    const bandMesh = new THREE.Mesh(bandGeo, ponchoAccentMat);
    bandMesh.position.y = 0.58;
    this.group.add(bandMesh);

    const bagGeo = new THREE.BoxGeometry(0.18, 0.22, 0.1);
    this.chuspaMesh = new THREE.Mesh(bagGeo, bagMat);
    this.chuspaMesh.position.set(0.3, 0.5, 0.15);
    this.chuspaMesh.rotation.z = -0.2;
    this.group.add(this.chuspaMesh);

    const headGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    this.headMesh = new THREE.Mesh(headGeo, skinMat);
    this.headMesh.position.y = 1.1;
    this.headMesh.castShadow = true;
    this.group.add(this.headMesh);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.12, 0.37), hairMat);
    hair.position.set(0, 1.25, 0);
    this.group.add(hair);
    [-0.085, 0.085].forEach((x) => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.018), eyeMat);
      eye.position.set(x, 1.12, 0.184);
      this.group.add(eye);
    });

    const hatGeo = new THREE.ConeGeometry(0.32, 0.4, 5);
    this.hatMesh = new THREE.Mesh(hatGeo, chulloMat);
    this.hatMesh.position.y = 1.35;
    this.group.add(this.hatMesh);

    const earGeo = new THREE.BoxGeometry(0.06, 0.16, 0.12);
    const leftEar = new THREE.Mesh(earGeo, chulloAccentMat);
    leftEar.position.set(0.2, 1.05, 0);
    const rightEar = new THREE.Mesh(earGeo, chulloAccentMat);
    rightEar.position.set(-0.2, 1.05, 0);
    this.group.add(leftEar);
    this.group.add(rightEar);

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
      if (e.code === 'KeyE' || e.code === 'Enter') {
        this.interact();
      }
      if (e.code === 'Space') {
        e.preventDefault();
        this.jump();
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

  public addCollider(centerX: number, centerZ: number, width: number, depth: number): void {
    this.colliders.push(
      new THREE.Box3(
        new THREE.Vector3(centerX - width / 2, -1, centerZ - depth / 2),
        new THREE.Vector3(centerX + width / 2, 5, centerZ + depth / 2)
      )
    );
  }

  public ensureSafePosition(): void {
    const radius = 0.35;
    const curBox = new THREE.Box3(
      new THREE.Vector3(this.group.position.x - radius, 0, this.group.position.z - radius),
      new THREE.Vector3(this.group.position.x + radius, 1.5, this.group.position.z + radius)
    );

    const colliding = this.colliders.some((box) => box.intersectsBox(curBox));
    if (colliding) {
      const spawn = CULTURE_SPAWN_POINTS[this.cultureId] || { x: 0, y: 0.7, z: 12, rotationY: Math.PI };
      this.group.position.set(spawn.x, spawn.y, spawn.z);
      this.group.rotation.y = spawn.rotationY;
    }

    this.group.position.x = Math.max(-23.5, Math.min(23.5, this.group.position.x));
    this.group.position.z = Math.max(-23.5, Math.min(23.5, this.group.position.z));
  }

  public jump(): void {
    if (this.group.position.y <= this.groundY + 0.05) {
      this.verticalVelocity = 5.4;
    }
  }

  private canOccupy(x: number, z: number): boolean {
    const radius = 0.32;
    const testBox = new THREE.Box3(
      new THREE.Vector3(x - radius, 0, z - radius),
      new THREE.Vector3(x + radius, 1.5, z + radius)
    );
    const currentBox = new THREE.Box3(
      new THREE.Vector3(this.group.position.x - radius, 0, this.group.position.z - radius),
      new THREE.Vector3(this.group.position.x + radius, 1.5, this.group.position.z + radius)
    );

    for (const box of this.colliders) {
      if (box.intersectsBox(testBox)) {
        if (box.intersectsBox(currentBox)) {
          const center = new THREE.Vector3();
          box.getCenter(center);
          const curDistSq = (this.group.position.x - center.x) ** 2 + (this.group.position.z - center.z) ** 2;
          const nextDistSq = (x - center.x) ** 2 + (z - center.z) ** 2;
          if (nextDistSq > curDistSq) {
            continue;
          }
        }
        return false;
      }
    }
    return true;
  }

  public update(delta: number): void {
    const isReducedMotion = GameState.getInstance().settings.reduceMotion;

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

      const targetRotation = Math.atan2(dir.x, dir.z);
      let diff = targetRotation - this.group.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.group.rotation.y += diff * (isReducedMotion ? 0.4 : 0.2);

      const moveDistance = this.speed * delta;
      const nextX = this.group.position.x + dir.x * moveDistance;
      const nextZ = this.group.position.z + dir.z * moveDistance;

      if (nextX > -23.5 && nextX < 23.5 && this.canOccupy(nextX, this.group.position.z)) {
        this.group.position.x = nextX;
      }
      if (nextZ > -23.5 && nextZ < 23.5 && this.canOccupy(this.group.position.x, nextZ)) {
        this.group.position.z = nextZ;
      }

      this.walkCycle += delta * 12;
      if (!isReducedMotion) {
        this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.6;
        this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.6;
        this.bodyMesh.position.y = 0.62 + Math.abs(Math.sin(this.walkCycle * 2)) * 0.04;
      }

      const now = performance.now();
      if (now - this.lastStepSoundTime > 340) {
        AudioManager.getInstance().playStep();
        this.lastStepSoundTime = now;
      }
    } else {
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.bodyMesh.position.y = 0.62;
    }

    this.verticalVelocity -= 13 * delta;
    this.group.position.y = Math.max(this.groundY, this.group.position.y + this.verticalVelocity * delta);
    if (this.group.position.y === this.groundY) this.verticalVelocity = 0;

    const state = GameState.getInstance();
    state.playerTransform.x = this.group.position.x;
    state.playerTransform.y = this.group.position.y;
    state.playerTransform.z = this.group.position.z;
    state.playerTransform.rotationY = this.group.rotation.y;

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
