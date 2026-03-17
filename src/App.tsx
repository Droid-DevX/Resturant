import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import ParticlesCanvas from './components/ParticlesCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Popular from './components/Popular';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    // Scroll reveal
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));

    // Tilt cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    const handlers = new Map<Element, { move: (e: Event) => void; leave: () => void; enter: () => void }>();

    tiltCards.forEach((card) => {
      const el = card as HTMLElement;
      const move = (e: Event) => {
        const me = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const x = me.clientX - rect.left;
        const y = me.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      };
      const leave = () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        el.style.transition = 'transform 0.5s ease';
      };
      const enter = () => {
        el.style.transition = 'none';
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      el.addEventListener('mouseenter', enter);
      handlers.set(card, { move, leave, enter });
    });

    // Parallax
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroBg = document.querySelector('.hero__bg-img') as HTMLElement;
          const crown = document.getElementById('hero-crown');
          if (heroBg && scrollY < window.innerHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
          }
          if (crown && scrollY < window.innerHeight) {
            crown.style.transform = `translateY(${scrollY * -0.15}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      tiltCards.forEach((card) => {
        const el = card as HTMLElement;
        const h = handlers.get(card);
        if (h) {
          el.removeEventListener('mousemove', h.move);
          el.removeEventListener('mouseleave', h.leave);
          el.removeEventListener('mouseenter', h.enter);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <ParticlesCanvas />
      <Navbar />

      <main>
        <Hero />
        <About />
        <MenuSection />
        <Popular />
        <Reviews />
        <Location />
      </main>

      <Footer />
    </>
  );
}
