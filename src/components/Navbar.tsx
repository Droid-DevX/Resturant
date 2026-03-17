import { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
  { href: '#hero', label: 'Home', section: 'hero' },
  { href: '#about', label: 'About', section: 'about' },
  { href: '#menu', label: 'Menu', section: 'menu' },
  { href: '#popular', label: 'Specials', section: 'popular' },
  { href: '#reviews', label: 'Reviews', section: 'reviews' },
  { href: '#location', label: 'Find Us', section: 'location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const updateActive = useCallback(() => {
    const sections = document.querySelectorAll('.section, .hero');
    let current = 'hero';
    sections.forEach((section) => {
      const el = section as HTMLElement;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
        current = el.id;
      }
    });
    setActiveSection(current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      updateActive();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateActive]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href) as HTMLElement;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <>
      <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar__container">
          <a
            href="#hero"
            className="navbar__logo"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <span className="navbar__logo-text">MAHARAJA</span>
          </a>

          <div className="navbar__links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.section}
                href={item.href}
                className={`navbar__link ${activeSection === item.section ? 'active' : ''}`}
                data-section={item.section}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className={`navbar__toggle ${mobileOpen ? 'open' : ''}`}
            onClick={toggleMobile}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav__inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.section}
              href={item.href}
              className="mobile-nav__link"
              data-section={item.section}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
