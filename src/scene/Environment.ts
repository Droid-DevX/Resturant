import * as THREE from 'three';

export interface EnvironmentMeshes {
  floor: THREE.Mesh;
  tables: THREE.Group;
  decorations: THREE.Group;
  candles: THREE.Mesh[]; // Expose for shader updates
}

export function createRestaurantEnvironment(scene: THREE.Scene): EnvironmentMeshes {
  // --- Procedural Reflective Floor ---
  const floorGeo = new THREE.PlaneGeometry(40, 40, 10, 10);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0705,
    roughness: 0.15,
    metalness: 0.35,
    envMapIntensity: 0.8,
  });

  // Adding procedural tile bump pattern via shader modification (onBeforeCompile)
  floorMat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <roughnessmap_fragment>',
      `
      #include <roughnessmap_fragment>
      vec2 tileUv = vUv * 20.0;
      vec2 grid = abs(fract(tileUv - 0.5) - 0.5);
      float line = min(grid.x, grid.y);
      float grout = smoothstep(0.01, 0.02, line);
      roughnessFactor = mix(0.9, 0.15, grout);
      `
    );
  };
  
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1;
  floor.receiveShadow = true;
  scene.add(floor);

  // --- Tables Group ---
  const tables = new THREE.Group();
  const tablePositions: Array<[number, number, number]> = [
    [-4, -1, -2],
    [5, -1, -3],
    [-3, -1, 4],
    [3, -1, 3],
    [0, -1, -6],
    [-8, -1, 0],
    [8, -1, 1],
  ];

  const candlesList: THREE.Mesh[] = [];

  tablePositions.forEach(([x, y, z]) => {
    const { group, flame } = createDetailedTable();
    group.position.set(x, y, z);
    group.rotation.y = Math.random() * Math.PI;
    tables.add(group);
    candlesList.push(flame);
  });
  scene.add(tables);

  // --- Decorations ---
  const decorations = new THREE.Group();

  // Grand Wall panels (back wall)
  const wallGeometry = new THREE.PlaneGeometry(40, 15);
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x0d0b08,
    roughness: 0.7,
    metalness: 0.2,
  });
  const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
  backWall.position.set(0, 5, -12);
  backWall.receiveShadow = true;
  decorations.add(backWall);

  // Side walls
  const sideGeo = new THREE.PlaneGeometry(30, 15);
  const leftWall = new THREE.Mesh(sideGeo, wallMaterial.clone());
  leftWall.position.set(-15, 5, 0);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.receiveShadow = true;
  decorations.add(leftWall);

  const rightWall = new THREE.Mesh(sideGeo, wallMaterial.clone());
  rightWall.position.set(15, 5, 0);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.receiveShadow = true;
  decorations.add(rightWall);

  scene.add(decorations);

  return { floor, tables, decorations, candles: candlesList };
}

function createDetailedTable(): { group: THREE.Group, flame: THREE.Mesh } {
  const group = new THREE.Group();

  // Premium marble/wood table top
  const topGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 64);
  const topMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a120b,
    roughness: 0.3,
    metalness: 0.1,
    clearcoat: 0.9,
    clearcoatRoughness: 0.2,
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = 0.8;
  top.castShadow = true;
  top.receiveShadow = true;
  group.add(top);

  // Table leg 
  const legMat = new THREE.MeshStandardMaterial({
    color: 0xc9a84c,
    roughness: 0.2,
    metalness: 0.9,
  });
  const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.8, 32), legMat);
  leg.position.y = 0.4;
  leg.castShadow = true;
  group.add(leg);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.03, 32), legMat);
  base.position.y = 0.015;
  base.castShadow = true;
  group.add(base);

  // Placemats & Plates (Lathe + Extrude)
  const plateProfile: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.2, 0.01),
    new THREE.Vector2(0.25, 0.03),
    new THREE.Vector2(0.3, 0.04), // Rim
    new THREE.Vector2(0.35, 0.045), // Edge
  ];
  const plateGeo = new THREE.LatheGeometry(plateProfile, 64);
  const plateMat = new THREE.MeshPhysicalMaterial({
    color: 0xfdfdfd,
    roughness: 0.1,
    metalness: 0.05,
    clearcoat: 0.6,
  });

  // Table setup for 2
  const setupOffsets = [
    { x: 0, z: -0.4, rot: 0 },
    { x: 0, z: 0.4, rot: Math.PI }
  ];

  setupOffsets.forEach(pos => {
    // Plate
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.set(pos.x, 0.825, pos.z);
    plate.castShadow = true;
    group.add(plate);

    // Wine Glass (Advanced Transparent Material)
    const glassProfile = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.04, 0.005), // Base
      new THREE.Vector2(0.005, 0.01), // Stem start
      new THREE.Vector2(0.005, 0.1),  // Stem end
      new THREE.Vector2(0.02, 0.11),  // Bowl base
      new THREE.Vector2(0.06, 0.15),  // Bowl belly
      new THREE.Vector2(0.04, 0.22),  // Bowl lip
    ];
    const glassGeo = new THREE.LatheGeometry(glassProfile, 32);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95, // Glass effect
      opacity: 1,
      metalness: 0,
      roughness: 0.01,
      ior: 1.5,
      thickness: 0.01,
    });
    
    // Water and Wine Glass
    const waterGlass = new THREE.Mesh(glassGeo, glassMaterial);
    waterGlass.position.set(pos.x + 0.35, 0.825, pos.z - (pos.rot === 0 ? 0.2 : -0.2));
    waterGlass.scale.setScalar(0.85);
    waterGlass.castShadow = true;
    group.add(waterGlass);

    const wineGlass = new THREE.Mesh(glassGeo, glassMaterial);
    wineGlass.position.set(pos.x + 0.25, 0.825, pos.z - (pos.rot === 0 ? 0.1 : -0.1));
    wineGlass.castShadow = true;
    group.add(wineGlass);
  });

  // Centerpiece Candle
  const candleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 32);
  const candleMat = new THREE.MeshStandardMaterial({
    color: 0xf5eedc,
    roughness: 0.8,
    subsurface: true // Custom visual or just rely on tone mapping
  });
  const candle = new THREE.Mesh(candleGeo, candleMat);
  candle.position.set(0, 0.825 + 0.075, 0);
  candle.castShadow = true;
  group.add(candle);

  // Procedural Flame with Custom ShaderMaterial
  const flameGeo = new THREE.SphereGeometry(0.015, 16, 16);
  // Flattening the sphere into a flame tear-drop shape
  flameGeo.scale(1, 2.5, 1);
  flameGeo.translate(0, 0.0375, 0); // shift pivot

  const flameMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorInner: { value: new THREE.Color(0xffffff) },
      uColorOuter: { value: new THREE.Color(0xff8c00) }
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vHeight;
      void main() {
        vUv = uv;
        vHeight = position.y / 0.075; // Normalize approx
        
        // Organic waver
        vec3 pos = position;
        float wave = sin(uTime * 5.0 + position.y * 20.0) * 0.005 * vHeight;
        pos.x += wave;
        pos.z += cos(uTime * 4.0) * 0.003 * vHeight;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorInner;
      uniform vec3 uColorOuter;
      varying float vHeight;
      
      void main() {
        // Gradient from base (inner) to top (outer)
        float mixVal = smoothstep(0.0, 1.0, vHeight + 0.2);
        vec3 finalCol = mix(uColorInner, uColorOuter, mixVal);
        
        // Soft edges
        float alpha = 1.0 - smoothstep(0.7, 1.0, vHeight);
        
        gl_FragColor = vec4(finalCol, alpha * 0.9);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.set(0, 0.825 + 0.15, 0);
  
  // Attach pointlight inside the group for this specific candle (performance intensive if too many, but beautiful)
  const candleLight = new THREE.PointLight(0xffaa22, 1, 5);
  candleLight.position.set(0, 0.825 + 0.2, 0);
  candleLight.castShadow = true;
  candleLight.shadow.bias = -0.005;
  candleLight.shadow.mapSize.width = 256;
  candleLight.shadow.mapSize.height = 256;
  group.add(candleLight);

  group.add(flame);

  return { group, flame };
}

export function updateShaders(meshes: THREE.Mesh[], elapsed: number): void {
  meshes.forEach(mesh => {
    if (mesh.material instanceof THREE.ShaderMaterial) {
      if (mesh.material.uniforms.uTime) {
        mesh.material.uniforms.uTime.value = elapsed;
      }
    }
  });
}
