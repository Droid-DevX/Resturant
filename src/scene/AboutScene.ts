import * as THREE from 'three';

export class AboutScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private plateGroup: THREE.Group;
  private container: HTMLElement;
  private animationFrameId: number = 0;
  private clock: THREE.Clock;
  private isRunning: boolean = false;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Container ${containerId} not found`);
    this.container = container;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 2, 4);
    this.camera.lookAt(0, 0.3, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    container.appendChild(this.renderer.domElement);

    // Clock
    this.clock = new THREE.Clock();

    // Create scene
    this.plateGroup = new THREE.Group();
    this.createPlate();
    this.createLighting();

    // Resize
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private createPlate(): void {
    // Main plate (lathe geometry for realistic shape)
    const plateProfile: THREE.Vector2[] = [];
    const outerRadius = 1.2;
    const rimWidth = 0.15;
    const depth = 0.12;

    // Bottom center
    plateProfile.push(new THREE.Vector2(0, 0));
    // Inner bottom curve
    plateProfile.push(new THREE.Vector2(0.3, 0.01));
    plateProfile.push(new THREE.Vector2(0.6, 0.04));
    // Inner wall rising
    plateProfile.push(new THREE.Vector2(outerRadius - rimWidth - 0.1, depth * 0.5));
    plateProfile.push(new THREE.Vector2(outerRadius - rimWidth, depth));
    // Rim
    plateProfile.push(new THREE.Vector2(outerRadius - rimWidth + 0.02, depth + 0.02));
    plateProfile.push(new THREE.Vector2(outerRadius, depth + 0.025));
    plateProfile.push(new THREE.Vector2(outerRadius + 0.01, depth + 0.01));

    const plateGeo = new THREE.LatheGeometry(plateProfile, 64);
    const plateMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8f4ec,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.castShadow = true;
    plate.receiveShadow = true;
    this.plateGroup.add(plate);

    // Gold rim decoration
    const rimGeo = new THREE.TorusGeometry(outerRadius - 0.02, 0.012, 8, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.1,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = depth + 0.025;
    this.plateGroup.add(rim);

    // Inner gold ring
    const innerRimGeo = new THREE.TorusGeometry(outerRadius - rimWidth, 0.008, 8, 64);
    const innerRim = new THREE.Mesh(innerRimGeo, rimMat.clone());
    innerRim.rotation.x = -Math.PI / 2;
    innerRim.position.y = depth + 0.015;
    this.plateGroup.add(innerRim);

    // Food representation - artistic spheres (molecular gastronomy style)
    const foodGroup = new THREE.Group();

    // Main element
    const mainFoodGeo = new THREE.SphereGeometry(0.15, 32, 32);
    const mainFoodMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b2500,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.6,
    });
    const mainFood = new THREE.Mesh(mainFoodGeo, mainFoodMat);
    mainFood.position.set(0, 0.2, 0);
    mainFood.scale.y = 0.7;
    foodGroup.add(mainFood);

    // Sauce drizzle (curved tube)
    const sauceCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.4, 0.08, -0.2),
      new THREE.Vector3(-0.1, 0.06, 0),
      new THREE.Vector3(0.15, 0.07, 0.1),
      new THREE.Vector3(0.4, 0.06, -0.1),
    ]);
    const sauceGeo = new THREE.TubeGeometry(sauceCurve, 32, 0.015, 8, false);
    const sauceMat = new THREE.MeshPhysicalMaterial({
      color: 0x3d1c02,
      roughness: 0.2,
      metalness: 0.0,
      clearcoat: 1.0,
    });
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    foodGroup.add(sauce);

    // Micro greens
    const greenPositions: Array<[number, number, number]> = [
      [0.1, 0.28, 0.05],
      [-0.05, 0.26, -0.08],
      [0.08, 0.25, -0.04],
    ];
    const greenMat = new THREE.MeshStandardMaterial({
      color: 0x2d5a27,
      roughness: 0.7,
    });

    greenPositions.forEach(([x, y, z]) => {
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 8, 8),
        greenMat
      );
      leaf.position.set(x, y, z);
      leaf.scale.set(1.5, 0.5, 1);
      leaf.rotation.z = Math.random() * Math.PI;
      foodGroup.add(leaf);
    });

    // Small garnish dots
    const dotPositions: Array<[number, number, number]> = [
      [0.3, 0.07, 0.2],
      [-0.3, 0.07, 0.15],
      [0.25, 0.07, -0.25],
      [-0.2, 0.07, -0.3],
      [0.35, 0.07, -0.1],
    ];
    const dotMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      roughness: 0.3,
      metalness: 0.5,
    });

    dotPositions.forEach(([x, y, z]) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 8, 8),
        dotMat
      );
      dot.position.set(x, y, z);
      foodGroup.add(dot);
    });

    this.plateGroup.add(foodGroup);

    this.plateGroup.position.y = -0.3;
    this.scene.add(this.plateGroup);
  }

  private createLighting(): void {
    // Ambient
    const ambient = new THREE.AmbientLight(0xffd699, 0.4);
    this.scene.add(ambient);

    // Key light
    const keyLight = new THREE.DirectionalLight(0xfff0e0, 1.5);
    keyLight.position.set(3, 5, 3);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xc9a84c, 0.6);
    fillLight.position.set(-3, 3, -2);
    this.scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 2, -5);
    this.scene.add(rimLight);
  }

  private onResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();
    this.animate();
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private animate(): void {
    if (!this.isRunning) return;
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    const elapsed = this.clock.getElapsedTime();

    // Rotate plate
    this.plateGroup.rotation.y = elapsed * 0.3;

    // Subtle tilt
    this.plateGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.05;
    this.plateGroup.rotation.z = Math.cos(elapsed * 0.3) * 0.03;

    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.stop();
    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
