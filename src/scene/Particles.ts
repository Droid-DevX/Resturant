import * as THREE from 'three';

export interface ParticleSystemConfig {
  count: number;
  areaSize: THREE.Vector3;
  areaOffset: THREE.Vector3;
  color: number;
  size: number;
  opacity: number;
}

export class ParticleSystem {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private velocities: Float32Array;
  private config: ParticleSystemConfig;

  constructor(config: ParticleSystemConfig) {
    this.config = config;

    const { count, areaSize, areaOffset } = config;

    // Create geometry
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    this.velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random position within area
      positions[i3] = (Math.random() - 0.5) * areaSize.x + areaOffset.x;
      positions[i3 + 1] = (Math.random() - 0.5) * areaSize.y + areaOffset.y;
      positions[i3 + 2] = (Math.random() - 0.5) * areaSize.z + areaOffset.z;

      // Random size
      sizes[i] = config.size * (0.5 + Math.random() * 1.0);

      // Random alpha
      alphas[i] = 0.3 + Math.random() * 0.7;

      // Slow upward drift with random horizontal movement
      this.velocities[i3] = (Math.random() - 0.5) * 0.002;
      this.velocities[i3 + 1] = 0.001 + Math.random() * 0.003;
      this.velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

    // Custom shader material for sparkle effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(config.color) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;
          
          // Twinkle effect
          float twinkle = sin(uTime * 2.0 + position.x * 5.0 + position.y * 3.0) * 0.5 + 0.5;
          vAlpha = aAlpha * (0.4 + twinkle * 0.6);
          
          gl_PointSize = aSize * uPixelRatio * (200.0 / -viewPosition.z);
          gl_PointSize = max(gl_PointSize, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        
        void main() {
          // Circular point with soft edge
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
          
          // Warm glow
          vec3 finalColor = uColor + vec3(0.1, 0.05, 0.0) * (1.0 - dist * 2.0);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, material);
  }

  update(elapsed: number): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const { count, areaSize, areaOffset } = this.config;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Move particles
      positions[i3] += this.velocities[i3];
      positions[i3 + 1] += this.velocities[i3 + 1];
      positions[i3 + 2] += this.velocities[i3 + 2];

      // Wrap around when out of bounds
      const halfX = areaSize.x / 2;
      const halfY = areaSize.y / 2;
      const halfZ = areaSize.z / 2;

      if (positions[i3 + 1] > areaOffset.y + halfY) {
        positions[i3 + 1] = areaOffset.y - halfY;
        positions[i3] = (Math.random() - 0.5) * areaSize.x + areaOffset.x;
        positions[i3 + 2] = (Math.random() - 0.5) * areaSize.z + areaOffset.z;
      }

      if (positions[i3] > areaOffset.x + halfX) positions[i3] = areaOffset.x - halfX;
      if (positions[i3] < areaOffset.x - halfX) positions[i3] = areaOffset.x + halfX;
      if (positions[i3 + 2] > areaOffset.z + halfZ) positions[i3 + 2] = areaOffset.z - halfZ;
      if (positions[i3 + 2] < areaOffset.z - halfZ) positions[i3 + 2] = areaOffset.z + halfZ;

      // Add gentle wave motion
      positions[i3] += Math.sin(elapsed * 0.5 + i * 0.1) * 0.0005;
    }

    this.geometry.attributes.position.needsUpdate = true;

    // Update time uniform
    const material = this.points.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = elapsed;
  }

  dispose(): void {
    this.geometry.dispose();
    (this.points.material as THREE.ShaderMaterial).dispose();
  }
}

export function createDustMotes(scene: THREE.Scene): ParticleSystem {
  const particles = new ParticleSystem({
    count: 200,
    areaSize: new THREE.Vector3(25, 15, 20),
    areaOffset: new THREE.Vector3(0, 5, 0),
    color: 0xffd699,
    size: 3,
    opacity: 0.6,
  });

  scene.add(particles.points);
  return particles;
}

export function createSparkles(scene: THREE.Scene): ParticleSystem {
  const sparkles = new ParticleSystem({
    count: 80,
    areaSize: new THREE.Vector3(20, 10, 15),
    areaOffset: new THREE.Vector3(0, 4, 0),
    color: 0xc9a84c,
    size: 5,
    opacity: 0.8,
  });

  scene.add(sparkles.points);
  return sparkles;
}
