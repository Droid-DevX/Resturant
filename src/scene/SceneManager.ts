import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';

export interface SceneManagerConfig {
  canvas: HTMLCanvasElement;
  antialias?: boolean;
  alpha?: boolean;
}

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public composer: EffectComposer;

  private clock: THREE.Clock;
  private updateCallbacks: Array<(delta: number, elapsed: number) => void> = [];
  private resizeCallbacks: Array<() => void> = [];
  private animationFrameId: number = 0;
  private isRunning: boolean = false;
  private bokehPass: BokehPass;

  constructor(config: SceneManagerConfig) {
    // Scene
    this.scene = new THREE.Scene();
    // Warm amber volumetric fog
    this.scene.fog = new THREE.FogExp2(0x1a120c, 0.025);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 12);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: config.canvas,
      antialias: config.antialias ?? true,
      alpha: config.alpha ?? true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // High dynamic range tonemapping for bloom
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // PMREM Generator for realistic reflections
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    // Here we would ideally load an HDRI, for now we will generate a subtle environment map
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0a0502);
    const pmremCube = pmremGenerator.fromScene(envScene).texture;
    this.scene.environment = pmremCube;
    pmremGenerator.dispose();

    // Effect Composer (Post-processing Pipeline)
    this.composer = new EffectComposer(this.renderer);
    
    // Render Pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Unreal Bloom Pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,   // strength
      0.4,   // radius
      0.85   // threshold
    );
    this.composer.addPass(bloomPass);

    // Film Grain Pass
    const filmPass = new FilmPass(
      0.35,  // noise intensity
      0.025, // scanline intensity
      648,   // scanline count
      false  // grayscale
    );
    this.composer.addPass(filmPass);

    // Cinematic Depth of Field (BokehPass)
    this.bokehPass = new BokehPass(this.scene, this.camera, {
      focus: 10.0,
      aperture: 0.0001,
      maxblur: 0.015,
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.composer.addPass(this.bokehPass);

    // Vignette Pass
    const vignettePass = new ShaderPass(VignetteShader);
    vignettePass.uniforms['offset'].value = 0.95;
    vignettePass.uniforms['darkness'].value = 1.6;
    this.composer.addPass(vignettePass);

    // Clock
    this.clock = new THREE.Clock();

    // Resize handler
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onUpdate(callback: (delta: number, elapsed: number) => void): void {
    this.updateCallbacks.push(callback);
  }

  onResizeEvent(callback: () => void): void {
    this.resizeCallbacks.push(callback);
  }

  public updateFocus(distance: number): void {
     // Optional helper to dynamically tune DoF based on sections
     (this.bokehPass.uniforms['focus'].value as number) = distance;
  }

  private onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);

    this.resizeCallbacks.forEach((cb) => cb());
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

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // Run update callbacks
    for (const cb of this.updateCallbacks) {
      cb(delta, elapsed);
    }

    // Render through Composer instead of standard renderer
    this.composer.render();
  }

  dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize.bind(this));
    this.renderer.dispose();
    this.composer.dispose();
  }
}
