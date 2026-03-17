import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import * as THREE from 'three';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export class ScrollController {
  private camera: THREE.PerspectiveCamera;
  private cameraWrapper: THREE.Group;
  private lenis: Lenis;

  constructor(camera: THREE.PerspectiveCamera, scene: THREE.Scene) {
    this.camera = camera;

    // Wrapper for parallax tracking
    this.cameraWrapper = new THREE.Group();
    this.cameraWrapper.position.copy(camera.position);
    this.cameraWrapper.rotation.copy(camera.rotation);
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, -Math.PI / 2, 0); // initial look direction
    this.cameraWrapper.add(camera);
    scene.add(this.cameraWrapper);

    // Initialize Lenis Smooth Scroll
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000); // gsapticker provides seconds, lenis expects ms
    });
    gsap.ticker.lagSmoothing(0);

    // Initial setup
    this.initTextSplits();
    this.initCameraPath();
    this.initUIAnimations();
    this.initParallax();
  }

  private initTextSplits(): void {
    // Split all `.split-text` elements
    const splitElements = document.querySelectorAll('.split-text');
    splitElements.forEach(el => {
      new SplitType(el as HTMLElement, { types: 'lines, words, chars', tagName: 'span' });
    });
  }

  private initCameraPath(): void {
    // Define a sweeping, cinematic camera path using CatmullRomCurve3
    const curvePoints = [
      new THREE.Vector3(0, 3, 14),     // Hero View
      new THREE.Vector3(2, 4, 8),      // About Transition
      new THREE.Vector3(5, 5, 2),      // Chef's Table
      new THREE.Vector3(8, 4, -5),     // Tasting Menu
      new THREE.Vector3(0, 8, -12),    // Menu Top Down
      new THREE.Vector3(-6, 3, -10),   // Wine Cellar
      new THREE.Vector3(-8, 3, -2),    // Gallery
      new THREE.Vector3(-4, 2, 5),     // Testimonials/Ambiance
      new THREE.Vector3(0, 3, 12),     // Reservations (Back to startish)
    ];

    const lookAtCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2, 0),      // Hero Look
      new THREE.Vector3(0, 2, 0),      // About
      new THREE.Vector3(0, 0, 0),      // Chef Look
      new THREE.Vector3(0, 0, -4),     // Tasting
      new THREE.Vector3(0, 0, -12),    // Menu Look down
      new THREE.Vector3(-2, 1, -12),   // Cellar Look
      new THREE.Vector3(0, 2, 0),      // Rest Look Back
      new THREE.Vector3(0, 2, 0),
      new THREE.Vector3(0, 2, 0)
    ]);

    const pathCurve = new THREE.CatmullRomCurve3(curvePoints);

    // Set height to entire scrollable document size
    const duration = document.body.scrollHeight;

    // Use ScrollTrigger mapped back to curve progression (0 to 1)
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Get path position
        const pos = pathCurve.getPointAt(progress);
        const target = lookAtCurve.getPointAt(progress);

        gsap.to(this.cameraWrapper.position, {
          x: pos.x, y: pos.y, z: pos.z,
          duration: 0.1, ease: 'none'
        });

        // Compute rotation wrapper to look at target seamlessly
        const dummy = new THREE.Object3D();
        dummy.position.copy(pos);
        dummy.lookAt(target);

        // Smoothly interpolate rotation to avoid snapping
        // Note: For perfect smooth rotation Quaternions are better, 
        // but for a gentle spline curve smooth gsaping rotation properties works fine.
        gsap.to(this.cameraWrapper.quaternion, {
          x: dummy.quaternion.x,
          y: dummy.quaternion.y,
          z: dummy.quaternion.z,
          w: dummy.quaternion.w,
          duration: 0.2, ease: 'none'
        });
      }
    });
  }

  private initUIAnimations(): void {
    // Top scroll progress indicator
    gsap.to('#scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    // Hero GSAP animations with split text
    const tlHero = gsap.timeline();
    tlHero.from('.hero__badge', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })
          .from('.hero__title-line .char', { 
            y: 50, opacity: 0, scale: 1.2, rotateX: -90, 
            duration: 1, ease: 'back.out(2)', stagger: 0.05 
          }, '-=0.5')
          .from('.hero__title-sub .char', {
            opacity: 0, x: -20, duration: 0.8, ease: 'power2.out', stagger: 0.02
          }, '-=0.6')
          .from('.hero__description', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
          .from('.hero__cta .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' }, '-=0.4');

    // Section Titles Reveal
    const sectionTitles = document.querySelectorAll('.section-title.split-text');
    sectionTitles.forEach(title => {
      gsap.from(title.querySelectorAll('.char'), {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        rotateX: -90,
        transformOrigin: "bottom center",
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.5)'
      });
    });

    // About Blob Morphing Path
    const path = document.getElementById('blob-path');
    if (path) {
      gsap.to(path, {
        attr: { d: "M42.2,-68.8C54,-61.8,62.2,-47.4,69.5,-32.1C76.8,-16.8,83.2,-0.6,81,14.2C78.8,29.1,68.1,42.7,55,52.8C42,62.9,26.6,69.5,10.6,73.5C-5.5,77.5,-22.1,78.9,-36.4,72C-50.7,65,-62.8,49.8,-70.5,33.2C-78.2,16.6,-81.4,-1.4,-77.8,-18.1C-74.2,-34.8,-63.7,-50.2,-49.9,-57.4C-36.1,-64.6,-19.1,-63.6,-1.7,-61.1C15.7,-58.5,30.4,-75.8,42.2,-68.8Z" },
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Awards Marquee
    const track = document.getElementById('awards-track');
    if (track) {
      gsap.to(track, {
        xPercent: -50,
        duration: 20,
        ease: 'none',
        repeat: -1
      });
    }

    // Horizontal Scroll Menu Container
    const menuContainer = document.getElementById('menu-scroll-container');
    const menuWrapper = document.querySelector('.menu-horizontal-wrapper');
    if (menuContainer && menuWrapper) {
      const getScrollAmount = () => -(menuContainer.scrollWidth - window.innerWidth + 100); // 100px padding Right
      
      const tween = gsap.to(menuContainer, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: ".menu-section",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }

    // Live Tasting Timeline Reveal
    const tastingSteps = document.querySelectorAll('.tasting-step');
    const tastingLine = document.getElementById('tasting-progress');
    
    // Animate progress line
    gsap.to(tastingLine, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.tasting-timeline',
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    });

    // Reveal steps
    tastingSteps.forEach((step, i) => {
      gsap.to(step, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 70%',
        }
      });
    });

    // Wine Cellar Horizontal
    const wineScroll = document.querySelector('.wine-list-scroll');
    if (wineScroll) {
      gsap.from(wineScroll.children, {
        x: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.wine-cellar',
          start: 'top 60%'
        }
      });
    }

    // Stats Counters
    const stats = gsap.utils.toArray('.about__stat-number') as HTMLElement[];
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count') || '0', 10);
      ScrollTrigger.create({
        trigger: stat,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(stat, {
            innerHTML: target,
            duration: 2.5,
            snap: { innerHTML: 1 },
            ease: "power2.out",
            onUpdate: function() {
              stat.innerHTML = Math.round(parseFloat(stat.innerHTML)).toString();
            }
          });
        }
      });
    });
  }

  private initParallax(): void {
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Subtly offset the nested camera for mouse-look
    gsap.ticker.add(() => {
      target.x += (mouse.x * 0.2 - target.x) * 0.05;
      target.y += (mouse.y * 0.2 - target.y) * 0.05;

      this.camera.position.x = target.x;
      this.camera.position.y = target.y;
      this.camera.lookAt(new THREE.Vector3(target.x * 2, target.y * 2, -10));
    });
  }

  // Allow passing navigation controls
  public scrollTo(hash: string): void {
    this.lenis.scrollTo(hash, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  }
}
