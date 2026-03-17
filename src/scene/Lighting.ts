import * as THREE from 'three';

export interface LightConfig {
  color: number;
  intensity: number;
  position: THREE.Vector3;
  castShadow?: boolean;
  distance?: number;
  decay?: number;
}

export function createRestaurantLighting(scene: THREE.Scene): THREE.Light[] {
  const lights: THREE.Light[] = [];

  // Ambient light — soft warm fill
  const ambient = new THREE.AmbientLight(0x1a1008, 0.4);
  scene.add(ambient);
  lights.push(ambient);

  // Main warm overhead spotlight
  const mainSpot = new THREE.SpotLight(0xffd699, 3, 50, Math.PI / 4, 0.5, 1);
  mainSpot.position.set(0, 12, 0);
  mainSpot.castShadow = true;
  mainSpot.shadow.mapSize.width = 1024;
  mainSpot.shadow.mapSize.height = 1024;
  mainSpot.shadow.camera.near = 0.5;
  mainSpot.shadow.camera.far = 50;
  mainSpot.shadow.bias = -0.001;
  scene.add(mainSpot);
  lights.push(mainSpot);

  // Candle-like point lights (warm flickering)
  const candlePositions: Array<[number, number, number]> = [
    [-4, 1.5, -2],
    [4, 1.5, -2],
    [-2, 1.5, 2],
    [2, 1.5, 2],
    [0, 1.5, -4],
    [-5, 2, 3],
    [5, 2, 3],
  ];

  candlePositions.forEach(([x, y, z], i) => {
    const candle = new THREE.PointLight(0xffaa44, 1.5, 8, 2);
    candle.position.set(x, y, z);
    candle.castShadow = i < 3; // Only first 3 cast shadows for performance
    if (candle.castShadow) {
      candle.shadow.mapSize.width = 512;
      candle.shadow.mapSize.height = 512;
    }
    candle.userData = {
      baseIntensity: 1.2 + Math.random() * 0.8,
      flickerSpeed: 2 + Math.random() * 3,
      flickerOffset: Math.random() * Math.PI * 2,
    };
    scene.add(candle);
    lights.push(candle);
  });

  // Accent rim lights (gold-amber)
  const rimLeft = new THREE.DirectionalLight(0xc9a84c, 0.5);
  rimLeft.position.set(-10, 5, 5);
  scene.add(rimLeft);
  lights.push(rimLeft);

  const rimRight = new THREE.DirectionalLight(0xd4a853, 0.4);
  rimRight.position.set(10, 5, -5);
  scene.add(rimRight);
  lights.push(rimRight);

  // Soft blue-ish fill from below for depth
  const fillBelow = new THREE.HemisphereLight(0x0a0a15, 0x1a0f05, 0.3);
  scene.add(fillBelow);
  lights.push(fillBelow);

  return lights;
}

export function updateCandleFlicker(lights: THREE.Light[], elapsed: number): void {
  lights.forEach((light) => {
    if (light instanceof THREE.PointLight && light.userData?.baseIntensity) {
      const { baseIntensity, flickerSpeed, flickerOffset } = light.userData;
      const flicker =
        Math.sin(elapsed * flickerSpeed + flickerOffset) * 0.3 +
        Math.sin(elapsed * flickerSpeed * 2.7 + flickerOffset * 1.3) * 0.15 +
        Math.sin(elapsed * flickerSpeed * 0.5 + flickerOffset * 0.7) * 0.1;
      light.intensity = baseIntensity + flicker;
    }
  });
}
