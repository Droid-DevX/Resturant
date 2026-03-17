import * as THREE from 'three';

export interface FloatingObject {
  mesh: THREE.Object3D;
  basePosition: THREE.Vector3;
  bobSpeed: number;
  bobAmplitude: number;
  rotationSpeed: THREE.Vector3;
  phase: number;
}

export function createFloatingObjects(scene: THREE.Scene): FloatingObject[] {
  const objects: FloatingObject[] = [];

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xc9a84c,
    roughness: 0.1,
    metalness: 0.95,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf5f0e8,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.95,
    thickness: 1.0,
    ior: 1.5,
    transparent: true,
  });

  const blackMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.8,
    metalness: 0.2,
  });

  // 1. Croissant (Using Extrude/Tube abstraction)
  // We approximate a croissant using a thick TorusKnot or Custom Curve Tube
  class CroissantCurve extends THREE.Curve<THREE.Vector3> {
    getPoint(t: number, optionalTarget = new THREE.Vector3()) {
      const x = Math.sin(Math.PI * t) * 0.3;
      const y = Math.cos(Math.PI * t) * 0.1;
      const z = Math.sin(Math.PI * t * 2) * 0.1; // Gentle curve
      return optionalTarget.set(x, y, z);
    }
  }
  const croissantGeo = new THREE.TubeGeometry(new CroissantCurve(), 32, 0.15, 16, false);
  const croissant = new THREE.Mesh(croissantGeo, goldMaterial);
  croissant.scale.set(1.5, 1, 1);
  objects.push({
    mesh: croissant,
    basePosition: new THREE.Vector3(-6, 4, -3),
    bobSpeed: 0.8,
    bobAmplitude: 0.4,
    rotationSpeed: new THREE.Vector3(0.001, 0.003, 0.001),
    phase: 0,
  });
  scene.add(croissant);

  // 2. Wine Glass (LatheGeometry)
  const glassProfile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.1, 0.01), // Base
    new THREE.Vector2(0.02, 0.03), // Stem
    new THREE.Vector2(0.02, 0.3),  // Stem tall
    new THREE.Vector2(0.06, 0.35), // Bowl base
    new THREE.Vector2(0.18, 0.5),  // Bowl wide
    new THREE.Vector2(0.12, 0.7),  // Lip
  ];
  const glassGeo = new THREE.LatheGeometry(glassProfile, 32);
  const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
  objects.push({
    mesh: glassMesh,
    basePosition: new THREE.Vector3(6, 5, -2),
    bobSpeed: 1.0,
    bobAmplitude: 0.35,
    rotationSpeed: new THREE.Vector3(0.002, 0.001, 0.002),
    phase: Math.PI / 3,
  });
  scene.add(glassMesh);

  // 3. Knife (ExtrudeGeometry)
  const knifeShape = new THREE.Shape();
  knifeShape.moveTo(0, 0);
  knifeShape.lineTo(0.05, 0); // Handle width
  knifeShape.lineTo(0.05, 0.4); // Handle top
  knifeShape.lineTo(0.04, 0.45); // Blade start
  knifeShape.lineTo(0.03, 0.8); // Blade edge
  knifeShape.bezierCurveTo(0.03, 0.9, 0, 0.9, 0, 0.8); // Tip curve down
  knifeShape.lineTo(0, 0);

  const extrudeSettings = { depth: 0.01, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.002, bevelThickness: 0.005 };
  const knifeGeo = new THREE.ExtrudeGeometry(knifeShape, extrudeSettings);
  
  // Center geometry
  knifeGeo.computeBoundingBox();
  const offset = new THREE.Vector3();
  knifeGeo.boundingBox?.getCenter(offset);
  knifeGeo.translate(-offset.x, -offset.y, -offset.z);

  const knife = new THREE.Mesh(knifeGeo, goldMaterial);
  objects.push({
    mesh: knife,
    basePosition: new THREE.Vector3(-5, 6, 1),
    bobSpeed: 0.6,
    bobAmplitude: 0.5,
    rotationSpeed: new THREE.Vector3(0.003, 0.001, 0.002),
    phase: Math.PI / 2,
  });
  scene.add(knife);

  // 4. Abstract Gold Plate (Torus)
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 16, 48), blackMaterial);
  objects.push({
    mesh: ring1,
    basePosition: new THREE.Vector3(5, 3, 2),
    bobSpeed: 0.9,
    bobAmplitude: 0.3,
    rotationSpeed: new THREE.Vector3(0.002, 0.004, 0.001),
    phase: Math.PI,
  });
  scene.add(ring1);

  // Set initial shadows
  objects.forEach((obj) => {
    obj.mesh.position.copy(obj.basePosition);
    obj.mesh.castShadow = true;
    obj.mesh.receiveShadow = true;
  });

  return objects;
}

export function updateFloatingObjects(objects: FloatingObject[], elapsed: number): void {
  objects.forEach((obj) => {
    obj.mesh.position.y = obj.basePosition.y + Math.sin(elapsed * obj.bobSpeed + obj.phase) * obj.bobAmplitude;
    obj.mesh.position.x = obj.basePosition.x + Math.sin(elapsed * obj.bobSpeed * 0.5 + obj.phase) * 0.1;
    obj.mesh.rotation.x += obj.rotationSpeed.x;
    obj.mesh.rotation.y += obj.rotationSpeed.y;
    obj.mesh.rotation.z += obj.rotationSpeed.z;
  });
}
