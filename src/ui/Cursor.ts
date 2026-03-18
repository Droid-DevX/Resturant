import gsap from 'gsap';

export class Cursor {
  private element: HTMLElement;
  private label: HTMLElement;
  private dot: HTMLElement;
  private xTo!: gsap.QuickToFunc;
 private yTo!: gsap.QuickToFunc;

  constructor() {
    this.element = document.getElementById('cursor') as HTMLElement;
    this.label = this.element.querySelector('.cursor__label') as HTMLElement;
    this.dot = this.element.querySelector('.cursor__dot') as HTMLElement;

    if (!this.element || !this.label || !this.dot) return;

    // Use GSAP quickTo for smooth performant tracking
    this.xTo = gsap.quickTo(this.element, "x", { duration: 0.4, ease: "power3" });
    this.yTo = gsap.quickTo(this.element, "y", { duration: 0.4, ease: "power3" });

    this.initEvents();
  }

  private initEvents(): void {
    window.addEventListener('mousemove', (e) => {
      // Center the cursor dot on the mouse
      this.xTo(e.clientX);
      this.yTo(e.clientY);
    });

    const hoverables = document.querySelectorAll('a, button, .cursor-pointer, .btn--magnetic, .event-card');
    
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.element.classList.add('hover');
        const text = el.getAttribute('data-cursor-text') || 'Click';
        this.label.innerText = text;
      });

      el.addEventListener('mouseleave', () => {
        this.element.classList.remove('hover');
        this.label.innerText = '';
      });
    });

    // Handle magnetic buttons
    const magnetics = document.querySelectorAll('.btn--magnetic');
    magnetics.forEach(btn => {
      const htmlBtn = btn as HTMLElement;
      // Mouse move event for magnetic effect
      htmlBtn.addEventListener('mousemove', (e) => {
        const rect = htmlBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(htmlBtn, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      htmlBtn.addEventListener('mouseleave', () => {
        gsap.to(htmlBtn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  }
}
