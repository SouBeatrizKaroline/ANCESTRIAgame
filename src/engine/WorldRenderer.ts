import * as THREE from 'three';
import { ANDES_NPCS } from '../data/dialogues/andesDialogues';
import { PlayerController, InteractiveZone } from './PlayerController';
import { t } from '../i18n';
import { getLanguage } from '../i18n';
import { CultureId } from '../data/types';
import { PEOPLE_CATALOG } from '../data/peopleCatalog';

/**
 * WorldRenderer - Constrói o mundo 3D low-poly estilizado dos Andes:
 * Terraços agrícolas em socalcos (Andenes), canais de irrigação, pontes suspensas,
 * muralhas de cantaria inca, armazéns Qullqa, observatório Intihuatana, lhamas e vegetação nativa.
 */
export class WorldRenderer {
  public scene: THREE.Scene;
  private animatedLlamas: THREE.Group[] = [];
  private waterMeshes: THREE.Mesh[] = [];
  private knowledgeSparks: THREE.Mesh[] = [];
  private npcMeshes: Map<string, THREE.Group> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public buildMexicaEnvironment(playerController: PlayerController, onTriggerNpc: (npcId: string) => void, onTriggerObject: (objectId: string) => void): void {
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshPhongMaterial({ color: 0x3b9faf, shininess: 70 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.18;
    water.receiveShadow = true;
    this.scene.add(water);

    const causewayMat = new THREE.MeshLambertMaterial({ color: 0xcbb994 });
    const islandMat = new THREE.MeshLambertMaterial({ color: 0x687b45 });
    const soilMat = new THREE.MeshLambertMaterial({ color: 0x58412f });
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0xb9a98d });
    const redMat = new THREE.MeshLambertMaterial({ color: 0xa33d2d });

    const island = new THREE.Mesh(new THREE.CylinderGeometry(11, 12, 0.5, 12), islandMat);
    island.position.y = 0.05;
    island.receiveShadow = true;
    this.scene.add(island);

    [[0, 18, 4, 28], [18, 0, 28, 4], [-18, 0, 28, 4]].forEach(([x, z, w, h]) => {
      const road = new THREE.Mesh(new THREE.BoxGeometry(w, 0.28, h), causewayMat);
      road.position.set(x, 0.12, z);
      road.receiveShadow = true;
      this.scene.add(road);
    });

    // Chinampas: parcelas retangulares separadas por canais, mostradas como prática lacustre.
    [-20, -14, 14, 20].forEach((x, ix) => {
      [-17, -9, 9, 17].forEach((z, iz) => {
        const plot = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.38, 6.2), soilMat);
        plot.position.set(x, 0.04, z);
        plot.receiveShadow = true;
        this.scene.add(plot);
        for (let row = -2; row <= 2; row += 2) {
          const crop = new THREE.Mesh(
            new THREE.ConeGeometry(0.22, 0.7, 5),
            new THREE.MeshLambertMaterial({ color: (ix + iz) % 2 ? 0x7aa64b : 0x91b955 })
          );
          crop.position.set(x + row * 0.7, 0.55, z);
          crop.castShadow = true;
          this.scene.add(crop);
        }
      });
    });

    const platform = new THREE.Mesh(new THREE.BoxGeometry(8, 1.2, 8), stoneMat);
    platform.position.set(0, 0.7, -2);
    platform.castShadow = true;
    platform.receiveShadow = true;
    this.scene.add(platform);
    for (let level = 0; level < 3; level++) {
      const temple = new THREE.Mesh(new THREE.BoxGeometry(5 - level, 1, 4 - level * 0.55), redMat);
      temple.position.set(0, 1.8 + level, -2.4);
      temple.castShadow = true;
      this.scene.add(temple);
    }
    const shrineA = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.3, 1.5), new THREE.MeshLambertMaterial({ color: 0x2f6762 }));
    shrineA.position.set(-1.2, 4.25, -2.4);
    const shrineB = shrineA.clone();
    (shrineB.material as THREE.MeshLambertMaterial) = new THREE.MeshLambertMaterial({ color: 0xc68b32 });
    shrineB.position.x = 1.2;
    this.scene.add(shrineA, shrineB);
    playerController.addCollider(0, -2, 8.8, 8.8);

    [[7, 5], [-7, 5], [7, -9], [-7, -9]].forEach(([x, z], index) => {
      const house = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 2.6), new THREE.MeshLambertMaterial({ color: index % 2 ? 0xd9c7a0 : 0xc9b184 }));
      house.position.set(x, 1, z);
      house.castShadow = true;
      const roof = new THREE.Mesh(new THREE.ConeGeometry(2.25, 1.1, 4), new THREE.MeshLambertMaterial({ color: 0x8d623c }));
      roof.position.set(x, 2.35, z);
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      this.scene.add(house, roof);
      playerController.addCollider(x, z, 3.8, 3.2);
    });
    [
      { id: 'mexica_chinampas', name: 'Chinampas', x: 14, z: 9, prompt: t('mexica.chinampaPrompt') },
      { id: 'mexica_causeway', name: 'Calzadas / Causeways', x: 0, z: 11, prompt: t('mexica.causewayPrompt') },
      { id: 'mexica_templo', name: 'Recinto ceremonial', x: 0, z: -7, prompt: t('mexica.templePrompt') }
    ].forEach((o) => playerController.interactiveZones.push({ id: o.id, name: o.name, type: 'object', position: new THREE.Vector3(o.x, 0.7, o.z), radius: 3, promptText: o.prompt, onInteract: () => onTriggerObject(o.id) }));
    const residents = [
      { id: 'npc_mexica_chinampa', name: 'Cuidadora de chinampa', role: 'Personaje educativo', x: 11, z: 8, color: 0x2a9d8f },
      { id: 'npc_mexica_market', name: 'Comerciante de Tlatelolco', role: 'Personaje educativo', x: 2, z: 9, color: 0xc98c3a },
      { id: 'npc_mexica_language', name: 'Mediadora de memoria nahua', role: 'Personaje educativo', x: 6, z: -6, color: 0x9b5de5 }
    ];
    residents.forEach((resident) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(.3, .46, .82, 6), new THREE.MeshLambertMaterial({ color: resident.color })); body.position.y = .55; body.castShadow = true;
      const sash = new THREE.Mesh(new THREE.CylinderGeometry(.38, .41, .1, 6), new THREE.MeshLambertMaterial({ color: 0xf4a261 })); sash.position.y = .55;
      const head = new THREE.Mesh(new THREE.BoxGeometry(.33, .33, .33), new THREE.MeshLambertMaterial({ color: 0xb87545 })); head.position.y = 1.1; head.castShadow = true;
      const hair = new THREE.Mesh(new THREE.BoxGeometry(.35, .12, .35), new THREE.MeshLambertMaterial({ color: 0x24150f })); hair.position.y = 1.25;
      const marker = new THREE.Mesh(new THREE.OctahedronGeometry(.18), new THREE.MeshBasicMaterial({ color: 0xffd166 })); marker.position.y = 1.62; marker.name = 'interaction-marker';
      group.add(body, sash, head, hair, marker); group.position.set(resident.x, 0, resident.z); this.scene.add(group); this.npcMeshes.set(resident.id, group);
      playerController.interactiveZones.push({ id: resident.id, name: resident.name, type: 'npc', position: new THREE.Vector3(resident.x, .7, resident.z), radius: 2.7, promptText: `Conversar con ${resident.name} (${resident.role})`, onInteract: () => onTriggerNpc(resident.id) });
    });
  }

  public buildPeopleAtlasEnvironment(cultureId: CultureId, playerController: PlayerController, onTriggerNpc: (npcId: string) => void, onTriggerObject: (objectId: string) => void): void {
    const profile = PEOPLE_CATALOG.find((item) => item.id === cultureId);
    if (!profile) { this.buildAndesEnvironment(playerController, onTriggerNpc, onTriggerObject); return; }
    const palettes: Record<string, [number, number, number]> = {
      quechua:[0x718355,0xd4a373,0x8d6e63], zapotec:[0x557c83,0xd8b384,0x8c5e3c], yanomami:[0x31572c,0x90a955,0x6b4226],
      guarani:[0x386641,0xa7c957,0x6a994e], warao:[0x287271,0x7ac7c4,0x9c6644], wayuu:[0xc76d2b,0xe9c46a,0x2a9d8f],
      tupinamba:[0x2d6a4f,0x74c69d,0x99582a], xukuru:[0x606c38,0xdda15e,0x7f5539], bribri:[0x1b4332,0x52b788,0xb08968],
      raramuri:[0x9c6644,0xe9c46a,0x5f6f52], aymara:[0x577590,0xd9ae61,0x785964]
    };
    const [groundColor, accentColor, stoneColor] = palettes[cultureId] || [0x5f6f52,0xd4a373,0x8d6e63];
    this.scene.background = new THREE.Color(cultureId === 'warao' ? 0x91cbd1 : 0xa8c5d6);
    this.scene.fog = new THREE.FogExp2(this.scene.background.getHex(), 0.012);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(58, 58), new THREE.MeshLambertMaterial({ color: groundColor }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; this.scene.add(ground);
    const path = new THREE.Mesh(new THREE.PlaneGeometry(5, 42), new THREE.MeshLambertMaterial({ color: accentColor }));
    path.rotation.x = -Math.PI / 2; path.position.y = .02; this.scene.add(path);
    for (let i = 0; i < 14; i++) {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.16,.24,1.5,6), new THREE.MeshLambertMaterial({color:0x5b3a29}));
      const crown = new THREE.Mesh(new THREE.ConeGeometry(.8,1.8,7), new THREE.MeshLambertMaterial({color:groundColor}));
      const x = (i % 2 ? -1 : 1) * (7 + (i % 4) * 2.3), z = -18 + i * 2.8;
      trunk.position.set(x,.75,z); crown.position.set(x,2.1,z); this.scene.add(trunk,crown);
    }
    const lang = getLanguage();
    const labels = lang === 'es' ? ['Territorio','Lenguas','Memoria viva'] : lang === 'pt-BR' ? ['Território','Línguas','Memória viva'] : ['Territory','Languages','Living memory'];
    [-8,0,8].forEach((x,index) => {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.8,.6,8), new THREE.MeshLambertMaterial({color:stoneColor}));
      const marker = new THREE.Mesh(new THREE.OctahedronGeometry(.65), new THREE.MeshPhongMaterial({color:accentColor,emissive:accentColor,emissiveIntensity:.18}));
      base.position.set(x,.3,-4); marker.position.set(x,1.5,-4); marker.name='interaction-marker'; this.scene.add(base,marker);
      playerController.addCollider(x,-4,3.2,3.2);
      playerController.interactiveZones.push({ id:`people_${cultureId}_${index}`, name:labels[index], type:'object', position:new THREE.Vector3(x,.7,-1.8), radius:3.2, promptText:`${labels[index]} · ${profile.name[lang]}`, onInteract:()=>onTriggerObject(`people_${cultureId}_${index}`) });
    });
    const resident = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(.34,.5,.95,7),new THREE.MeshLambertMaterial({color:accentColor})); body.position.y=.6;
    const head = new THREE.Mesh(new THREE.SphereGeometry(.24,8,8),new THREE.MeshLambertMaterial({color:0xb87545})); head.position.y=1.25;
    const sign = new THREE.Mesh(new THREE.OctahedronGeometry(.18),new THREE.MeshBasicMaterial({color:0xffd166})); sign.position.y=1.75; sign.name='interaction-marker';
    resident.add(body,head,sign); resident.position.set(4,0,7); this.scene.add(resident);
    playerController.interactiveZones.push({id:`npc_people_${cultureId}`,name:profile.name[lang],type:'npc',position:new THREE.Vector3(4,.7,7),radius:2.8,promptText:`${lang==='es'?'Conversar':lang==='pt-BR'?'Conversar':'Talk'} · ${profile.name[lang]}`,onInteract:()=>onTriggerNpc(`npc_people_${cultureId}`)});
  }

  public buildAndesEnvironment(
    playerController: PlayerController,
    onTriggerNpc: (npcId: string) => void,
    onTriggerObject: (objectId: string) => void
  ): void {
    // 1. Chão principal do Vale e caminhos de pedra
    this.createValleyGround();

    // 2. Terraços agrícolas em socalcos (Andenes) com muros de pedra
    this.createAgriculturalTerraces();

    // 3. Canal de irrigação de pedra com água estilizada
    this.createWaterIrrigationCanal();

    // 4. Arquitetura: Casas de pedra com teto de palha e Silos Qullqa
    this.createIncaVillageAndSilos();

    // 5. Ponte suspensa de cordas de fibra vegetal (Q'eswachaka)
    this.createHangingBridge();

    // 6. Observatório Solar Intihuatana no cume
    this.createIntihuatanaObservatory();

    // 7. Muralha de cantaria poligonal (Pedra de Doze Ângulos)
    this.createPolygonalStoneworkWorkshop();

    // 8. Vegetação andina nativa (Queñuas e flores de batata)
    this.createNativeFlora();

    // 9. Lhamas pastando pacificamente
    this.createLlamas();

    // 10. Cordilheira de montanhas ao fundo com picos nevados
    this.createMountainBackdrop();

    // 11. Camadas decorativas leves para profundidade, cor e orientação visual
    this.createScenicDetails();

    // 12. Criação dos NPCs 3D e registro das zonas de interação
    this.createNPCsAndInteractions(playerController, onTriggerNpc, onTriggerObject);
    playerController.addCollider(7, 4, 5.3, 4.6);
    playerController.addCollider(10.5, -3, 5.2, 3.8);
    playerController.addCollider(0, -16, 7.5, 7.5);
    playerController.addCollider(-4, -8, 6, 1.6);
  }

  private createValleyGround(): void {
    // Chão base verde-oliva andino
    const groundGeo = new THREE.PlaneGeometry(60, 60, 16, 16);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x606c38 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Caminho real de pedra (Qhapaq Ñan) cortando o vale
    const roadMat = new THREE.MeshLambertMaterial({ color: 0xd4a373 });
    const roadGeo = new THREE.PlaneGeometry(3.5, 48);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.02, 0);
    road.receiveShadow = true;
    this.scene.add(road);

    // Praça central de lajotas poligonais
    const plazaMat = new THREE.MeshLambertMaterial({ color: 0xb08968 });
    const plazaGeo = new THREE.CylinderGeometry(6, 6, 0.05, 8);
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.set(0, 0.03, 0);
    plaza.receiveShadow = true;
    this.scene.add(plaza);
  }

  private createAgriculturalTerraces(): void {
    const terraceWallMat = new THREE.MeshLambertMaterial({ color: 0x7f7f7f });
    const terraceSoilMat = new THREE.MeshLambertMaterial({ color: 0x556b2f });

    // 4 níveis de terraços escalonados no lado oeste (X negativo)
    const levels = [
      { y: 0.6, width: 7, length: 22, x: -10, z: 2 },
      { y: 1.2, width: 6, length: 20, x: -13.5, z: 2 },
      { y: 1.8, width: 5, length: 18, x: -16.8, z: 2 },
      { y: 2.4, width: 4.5, length: 16, x: -20, z: 2 }
    ];

    levels.forEach((lvl, i) => {
      // Muro de sustentação de pedra
      const wallGeo = new THREE.BoxGeometry(0.4, lvl.y, lvl.length);
      const wall = new THREE.Mesh(wallGeo, terraceWallMat);
      wall.position.set(lvl.x + lvl.width / 2, lvl.y / 2, lvl.z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      this.scene.add(wall);

      // Superfície fértil do terraço
      const terraceGeo = new THREE.BoxGeometry(lvl.width, 0.2, lvl.length);
      const terrace = new THREE.Mesh(terraceGeo, terraceSoilMat);
      terrace.position.set(lvl.x, lvl.y, lvl.z);
      terrace.receiveShadow = true;
      this.scene.add(terrace);

      // Pequenas plantas de milho ou batata nos degraus
      const plantMat = new THREE.MeshLambertMaterial({
        color: i % 2 === 0 ? 0x90be6d : 0x43aa8b
      });
      for (let pz = -lvl.length / 2 + 2; pz < lvl.length / 2 - 1; pz += 2.5) {
        const cropGeo = new THREE.ConeGeometry(0.25, 0.5, 4);
        const crop = new THREE.Mesh(cropGeo, plantMat);
        crop.position.set(lvl.x - 0.8 + Math.random() * 1.6, lvl.y + 0.35, lvl.z + pz);
        crop.castShadow = true;
        this.scene.add(crop);
      }
    });
  }

  private createWaterIrrigationCanal(): void {
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x8d99ae });
    const waterMat = new THREE.MeshLambertMaterial({
      color: 0x48cae4,
      transparent: true,
      opacity: 0.85
    });

    // Canal escavado em linha reta descendo ao lado dos terraços
    const canalStoneGeo = new THREE.BoxGeometry(0.9, 0.25, 24);
    const canalStone = new THREE.Mesh(canalStoneGeo, stoneMat);
    canalStone.position.set(-6.2, 0.1, 2);
    canalStone.receiveShadow = true;
    this.scene.add(canalStone);

    const waterGeo = new THREE.BoxGeometry(0.5, 0.2, 23.6);
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(-6.2, 0.15, 2);
    this.waterMeshes.push(water);
    this.scene.add(water);
  }

  private createIncaVillageAndSilos(): void {
    const stoneWallMat = new THREE.MeshLambertMaterial({ color: 0x9a8c98 });
    const ichuRoofMat = new THREE.MeshLambertMaterial({ color: 0xdda15e }); // Palha dourada

    // 1. Casa Administrativa / Residência Comunitária
    const houseGeo = new THREE.BoxGeometry(4.5, 2.5, 3.8);
    const house = new THREE.Mesh(houseGeo, stoneWallMat);
    house.position.set(7, 1.25, 4);
    house.castShadow = true;
    house.receiveShadow = true;
    this.scene.add(house);

    // Teto de duas águas em palha ichu
    const roofGeo = new THREE.ConeGeometry(3.6, 1.6, 4);
    const roof = new THREE.Mesh(roofGeo, ichuRoofMat);
    roof.position.set(7, 3.2, 4);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    this.scene.add(roof);

    // 2. Dois silos cilíndricos Qullqa para mantimentos
    const qullqaPositions = [
      { x: 9.5, z: -3 },
      { x: 12.5, z: -3 }
    ];

    qullqaPositions.forEach((pos) => {
      const qullqaBaseGeo = new THREE.CylinderGeometry(1.4, 1.6, 2.4, 8);
      const qullqaBase = new THREE.Mesh(qullqaBaseGeo, stoneWallMat);
      qullqaBase.position.set(pos.x, 1.2, pos.z);
      qullqaBase.castShadow = true;
      qullqaBase.receiveShadow = true;
      this.scene.add(qullqaBase);

      const qullqaRoofGeo = new THREE.ConeGeometry(1.7, 1.2, 8);
      const qullqaRoof = new THREE.Mesh(qullqaRoofGeo, ichuRoofMat);
      qullqaRoof.position.set(pos.x, 2.9, pos.z);
      qullqaRoof.castShadow = true;
      this.scene.add(qullqaRoof);
    });
  }

  private createHangingBridge(): void {
    const ropeMat = new THREE.MeshLambertMaterial({ color: 0xc9ada7 });
    const woodPlankMat = new THREE.MeshLambertMaterial({ color: 0x6f4e37 });
    const bridgeGroup = new THREE.Group();

    // Dois pilares de sustentação de pedra nas extremidades
    const pilarGeo = new THREE.BoxGeometry(1.2, 2.8, 1.6);
    const pilarMat = new THREE.MeshLambertMaterial({ color: 0x5c677d });

    const pilarA = new THREE.Mesh(pilarGeo, pilarMat);
    pilarA.position.set(-1, 1.4, 17);
    const pilarB = new THREE.Mesh(pilarGeo, pilarMat);
    pilarB.position.set(-1, 1.4, 23);
    this.scene.add(pilarA);
    this.scene.add(pilarB);

    // Cabos de fibra trançada suspensos
    const cableGeo = new THREE.CylinderGeometry(0.08, 0.08, 6.2, 6);
    const leftCable = new THREE.Mesh(cableGeo, ropeMat);
    leftCable.rotation.x = Math.PI / 2;
    leftCable.position.set(-0.4, 1.8, 20);

    const rightCable = new THREE.Mesh(cableGeo, ropeMat);
    rightCable.rotation.x = Math.PI / 2;
    rightCable.position.set(-1.6, 1.8, 20);

    bridgeGroup.add(leftCable);
    bridgeGroup.add(rightCable);

    // Pranchas de madeira/bambu entrelaçado
    for (let z = 17.5; z <= 22.5; z += 0.5) {
      const plankGeo = new THREE.BoxGeometry(1.3, 0.08, 0.35);
      const plank = new THREE.Mesh(plankGeo, woodPlankMat);
      plank.position.set(-1, 1.1, z);
      bridgeGroup.add(plank);
    }

    this.scene.add(bridgeGroup);
  }

  private createIntihuatanaObservatory(): void {
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x4a4e69 });

    // Platô elevado sagrado (Ushnu / Promontório)
    const moundGeo = new THREE.CylinderGeometry(3.5, 4.5, 2.2, 6);
    const mound = new THREE.Mesh(moundGeo, stoneMat);
    mound.position.set(0, 1.1, -16);
    mound.castShadow = true;
    mound.receiveShadow = true;
    this.scene.add(mound);

    // O marco solar monolítico Intihuatana
    const columnGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.4, 5);
    const column = new THREE.Mesh(columnGeo, new THREE.MeshLambertMaterial({ color: 0x22223b }));
    column.position.set(0, 2.8, -16);
    column.castShadow = true;
    this.scene.add(column);

    // Brilho dourado solar sutil sobre o Intihuatana
    const sparkGeo = new THREE.OctahedronGeometry(0.25);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffd166, wireframe: true });
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.set(0, 3.8, -16);
    this.knowledgeSparks.push(spark);
    this.scene.add(spark);
  }

  private createPolygonalStoneworkWorkshop(): void {
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x6c757d });

    // Parede em construção com blocos de cantaria almofadada
    const wallGeo = new THREE.BoxGeometry(5.2, 2.2, 0.8);
    const wall = new THREE.Mesh(wallGeo, stoneMat);
    wall.position.set(-4, 1.1, -8);
    wall.castShadow = true;
    wall.receiveShadow = true;
    this.scene.add(wall);

    // Bloco central destacado (representando a pedra de 12 ângulos)
    const blockMat = new THREE.MeshLambertMaterial({ color: 0xadb5bd });
    const blockGeo = new THREE.DodecahedronGeometry(0.65);
    const block = new THREE.Mesh(blockGeo, blockMat);
    block.position.set(-4, 1.2, -7.4);
    block.castShadow = true;
    this.scene.add(block);
  }

  private createNativeFlora(): void {
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x582f0e });
    const foliageMat = new THREE.MeshLambertMaterial({ color: 0x2d6a4f });

    // Árvores nativas Queñua (Polylepis)
    const treePositions = [
      { x: -7, z: 12 },
      { x: 6, z: 12 },
      { x: 12, z: 8 },
      { x: -9, z: -14 },
      { x: 8, z: -14 }
    ];

    treePositions.forEach((pos) => {
      const trunkGeo = new THREE.CylinderGeometry(0.18, 0.28, 1.6, 5);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(pos.x, 0.8, pos.z);
      trunk.castShadow = true;
      this.scene.add(trunk);

      const crownGeo = new THREE.DodecahedronGeometry(0.9);
      const crown = new THREE.Mesh(crownGeo, foliageMat);
      crown.position.set(pos.x, 1.9, pos.z);
      crown.castShadow = true;
      this.scene.add(crown);
    });
  }

  private createLlamas(): void {
    const llamaMat = new THREE.MeshLambertMaterial({ color: 0xfdf0d5 }); // Bege fofo

    const positions = [
      { x: 6, z: -9, rotY: 0.5 },
      { x: -8, z: -4, rotY: -1.2 },
      { x: 3, z: -8, rotY: 2.1 }
    ];

    positions.forEach((pos) => {
      const llamaGroup = new THREE.Group();

      // Corpo
      const bodyGeo = new THREE.BoxGeometry(0.6, 0.5, 0.9);
      const body = new THREE.Mesh(bodyGeo, llamaMat);
      body.position.y = 0.55;
      body.castShadow = true;
      llamaGroup.add(body);

      // Pescoço longo e cabeça
      const neckGeo = new THREE.BoxGeometry(0.2, 0.65, 0.22);
      const neck = new THREE.Mesh(neckGeo, llamaMat);
      neck.position.set(0, 0.95, 0.35);
      llamaGroup.add(neck);

      const headGeo = new THREE.BoxGeometry(0.22, 0.24, 0.35);
      const head = new THREE.Mesh(headGeo, llamaMat);
      head.position.set(0, 1.3, 0.45);
      llamaGroup.add(head);

      // Orelhas
      const earGeo = new THREE.ConeGeometry(0.06, 0.18, 3);
      const earL = new THREE.Mesh(earGeo, llamaMat);
      earL.position.set(0.08, 1.45, 0.4);
      const earR = new THREE.Mesh(earGeo, llamaMat);
      earR.position.set(-0.08, 1.45, 0.4);
      llamaGroup.add(earL);
      llamaGroup.add(earR);

      // Pernas
      const legGeo = new THREE.BoxGeometry(0.1, 0.4, 0.1);
      const leg1 = new THREE.Mesh(legGeo, llamaMat);
      leg1.position.set(0.2, 0.2, 0.3);
      const leg2 = new THREE.Mesh(legGeo, llamaMat);
      leg2.position.set(-0.2, 0.2, 0.3);
      const leg3 = new THREE.Mesh(legGeo, llamaMat);
      leg3.position.set(0.2, 0.2, -0.3);
      const leg4 = new THREE.Mesh(legGeo, llamaMat);
      leg4.position.set(-0.2, 0.2, -0.3);

      llamaGroup.add(leg1);
      llamaGroup.add(leg2);
      llamaGroup.add(leg3);
      llamaGroup.add(leg4);

      llamaGroup.position.set(pos.x, 0, pos.z);
      llamaGroup.rotation.y = pos.rotY;
      this.animatedLlamas.push(llamaGroup);
      this.scene.add(llamaGroup);
    });
  }

  private createMountainBackdrop(): void {
    const mountainMat = new THREE.MeshLambertMaterial({ color: 0x52645f });
    const snowMat = new THREE.MeshLambertMaterial({ color: 0xf7f0df });

    const mountainCoords = [
      { x: -28, z: -28, radius: 14, height: 26 },
      { x: 0, z: -32, radius: 18, height: 32 },
      { x: 28, z: -28, radius: 16, height: 28 },
      { x: -32, z: 0, radius: 15, height: 24 },
      { x: 32, z: 0, radius: 15, height: 24 },
      { x: -26, z: 26, radius: 14, height: 22 },
      { x: 26, z: 26, radius: 14, height: 22 }
    ];

    mountainCoords.forEach((coord) => {
      const peakGeo = new THREE.ConeGeometry(coord.radius, coord.height, 6);
      const peak = new THREE.Mesh(peakGeo, mountainMat);
      peak.position.set(coord.x, coord.height / 2 - 2, coord.z);
      this.scene.add(peak);

      // Pico nevado no topo
      const snowGeo = new THREE.ConeGeometry(coord.radius * 0.45, coord.height * 0.35, 6);
      const snow = new THREE.Mesh(snowGeo, snowMat);
      snow.position.set(coord.x, coord.height - coord.height * 0.18 - 2, coord.z);
      this.scene.add(snow);
    });
  }

  private createScenicDetails(): void {
    const flowerColors = [0xf4c95d, 0xe76f51, 0x9b5de5];
    const positions = [
      [-4.7, 8.5], [4.8, 9.8], [5.2, -5.8], [-8.3, 7.2],
      [8.2, 7.5], [-5.1, -12.2], [4.2, -12.8], [10.4, 1.5]
    ];
    positions.forEach(([x, z], index) => {
      const tuft = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.035, 0.34 + i * 0.05, 5),
          new THREE.MeshLambertMaterial({ color: 0x527a3b })
        );
        stem.position.set((i - 1) * 0.12, 0.18, (i % 2) * 0.08);
        const bloom = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.09),
          new THREE.MeshLambertMaterial({ color: flowerColors[(index + i) % flowerColors.length] })
        );
        bloom.position.copy(stem.position).setY(stem.position.y + 0.2 + i * 0.025);
        tuft.add(stem, bloom);
      }
      tuft.position.set(x, 0.02, z);
      this.scene.add(tuft);
    });
  }

  private createNPCsAndInteractions(
    playerController: PlayerController,
    onTriggerNpc: (npcId: string) => void,
    onTriggerObject: (objectId: string) => void
  ): void {
    ANDES_NPCS.forEach((npc) => {
      const npcGroup = new THREE.Group();
      const skinMat = new THREE.MeshLambertMaterial({ color: 0xbc6c25 });
      const tunicMat = new THREE.MeshLambertMaterial({ color: npc.visualColor });
      const hairMat = new THREE.MeshLambertMaterial({ color: 0x24150f });
      const sashMat = new THREE.MeshLambertMaterial({ color: 0xf4a261 });

      // Corpo com túnica
      const bodyGeo = new THREE.CylinderGeometry(0.3, 0.42, 0.8, 6);
      const body = new THREE.Mesh(bodyGeo, tunicMat);
      body.position.y = 0.55;
      body.castShadow = true;
      npcGroup.add(body);

      // Cabeça
      const headGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
      const head = new THREE.Mesh(headGeo, skinMat);
      head.position.y = 1.1;
      head.castShadow = true;
      npcGroup.add(head);

      const hair = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.11, 0.35), hairMat);
      hair.position.y = 1.23;
      npcGroup.add(hair);

      const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.39, 0.1, 6), sashMat);
      sash.position.y = 0.55;
      npcGroup.add(sash);

      // Faixa de cabelo / gorro
      const bandGeo = new THREE.BoxGeometry(0.34, 0.08, 0.34);
      const band = new THREE.Mesh(bandGeo, new THREE.MeshLambertMaterial({ color: 0xffffff }));
      band.position.y = 1.22;
      npcGroup.add(band);

      // Marcador indicador flutuante sobre a cabeça
      const iconGeo = new THREE.OctahedronGeometry(0.18);
      const iconMat = new THREE.MeshBasicMaterial({ color: 0xffe066 });
      const icon = new THREE.Mesh(iconGeo, iconMat);
      icon.position.y = 1.6;
      icon.name = 'interaction-marker';
      npcGroup.add(icon);

      npcGroup.position.set(npc.position.x, npc.position.y, npc.position.z);
      npcGroup.rotation.y = npc.rotationY;

      this.npcMeshes.set(npc.id, npcGroup);
      this.scene.add(npcGroup);

      // Registra zona interativa no PlayerController
      playerController.interactiveZones.push({
        id: npc.id,
        name: npc.name,
        type: 'npc',
        position: new THREE.Vector3(npc.position.x, npc.position.y, npc.position.z),
        radius: 2.6,
        promptText: `Hablar con ${npc.name} (${npc.role})`,
        onInteract: () => onTriggerNpc(npc.id)
      });
    });

    // Objetos Interativos adicionais pelo mapa
    const objects: Array<{
      id: string;
      name: string;
      pos: THREE.Vector3;
      radius: number;
      prompt: string;
    }> = [
      {
        id: 'obj_intihuatana',
        name: 'Marcador solar Intihuatana',
        pos: new THREE.Vector3(0, 2.0, -16),
        radius: 3.2,
        prompt: 'Observar la alineación solar del Intihuatana'
      },
      {
        id: 'obj_qullqa_deposito',
        name: 'Almacén qullqa',
        pos: new THREE.Vector3(10.5, 1.2, -3),
        radius: 3.0,
        prompt: 'Examinar el sistema de conservación de las qullqas'
      },
      {
        id: 'obj_terraces_canal',
        name: 'Canales de riego de los andenes',
        pos: new THREE.Vector3(-6.2, 0.5, 2),
        radius: 2.8,
        prompt: 'Examinar la ingeniería hidráulica de las terrazas'
      },
      {
        id: 'obj_bridge',
        name: 'Puente colgante Q\'eswachaka',
        pos: new THREE.Vector3(-1, 1.2, 17),
        radius: 2.8,
        prompt: 'Cruzar y observar el puente de fibra de ichu'
      }
    ];

    objects.forEach((obj) => {
      playerController.interactiveZones.push({
        id: obj.id,
        name: obj.name,
        type: 'object',
        position: obj.pos,
        radius: obj.radius,
        promptText: obj.prompt,
        onInteract: () => onTriggerObject(obj.id)
      });
    });
  }

  public animate(elapsedTime: number): void {
    // Respiração e ondulação das lhamas
    this.animatedLlamas.forEach((llama, index) => {
      llama.position.y = Math.sin(elapsedTime * 1.5 + index) * 0.03;
    });

    // Partículas de conhecimento girando
    this.knowledgeSparks.forEach((spark, index) => {
      spark.rotation.y = elapsedTime * 1.8 + index;
      spark.rotation.x = elapsedTime * 1.2;
      spark.position.y = 3.8 + Math.sin(elapsedTime * 2.5 + index) * 0.15;
    });

    // Ícones sobre a cabeça dos NPCs flutuando
    this.npcMeshes.forEach((npcGroup) => {
      const icon = npcGroup.getObjectByName('interaction-marker');
      if (icon) {
        icon.rotation.y = elapsedTime * 2;
        icon.position.y = 1.6 + Math.sin(elapsedTime * 3) * 0.08;
      }
    });
  }
}
