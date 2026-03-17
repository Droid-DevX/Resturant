import { useState, useEffect, useRef } from 'react';
import { menuData } from '../data/menu';

export default function MenuSection() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showFullMenu, setShowFullMenu] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categoriesToRender = showFullMenu ? menuData : menuData.slice(0, 3);

  // Animate categories on change
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.menu-category-group');
    items.forEach((item, i) => {
      const el = item as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 100);
    });
  }, [currentFilter]);

  return (
    <section id="menu" className="section menu-section" data-reveal>
      <div className="container">
        <span className="section__label">À La Carte</span>
        <h2 className="section__title">
          Our Royal <strong className="highlight">Menu</strong>
        </h2>

        {/* Sticky Filter Bar */}
        <div className="menu__filters" id="menu-filters">
          <div className="menu__filter-group">
            {(['all', 'veg', 'non-veg'] as const).map((filter) => (
              <button
                key={filter}
                className={`menu__filter-btn ${currentFilter === filter ? 'active' : ''}`}
                data-filter={filter}
                onClick={() => setCurrentFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
              </button>
            ))}
          </div>
        </div>
        <div className="menu__content" ref={gridRef}>

          {categoriesToRender.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: 'var(--text-dim)', fontSize: '1rem' }}>
                No items in this category.
              </p>
            </div>
          ) : (
            categoriesToRender.map((category) => {
              let items = category.items;
              if (currentFilter === 'veg') items = items.filter((i) => i.type === 'veg');
              if (currentFilter === 'non-veg') items = items.filter((i) => i.type === 'non-veg');

              if (items.length === 0) return null;

              return (
                <div key={category.slug} className="menu-category-group">
                  <h3 className="menu-category-title">
                    <span className="menu-category-line"></span>
                    {category.name}
                    <span className="menu-category-line"></span>
                  </h3>
                  <ul className="menu-item-list">
                    {items.map((item) => (
                      <li key={item.name} className="menu-list-item">
                        <div className="menu-list-item-header">
                          <div className="menu-list-item-name">
                            <span className="menu-list-item-veg">
                              {item.type === 'veg' ? '🟢' : '🔴'}
                            </span>
                            {item.name}
                          </div>
                          <div className="menu-list-item-dots"></div>
                          <div className="menu-list-item-price">₹{item.price}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        {/* View Full Menu Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button 
            className="btn btn--gold" 
            onClick={() => {
              if (showFullMenu) {
                const el = document.getElementById('menu');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
              setShowFullMenu(!showFullMenu);
            }}
          >
            {showFullMenu ? 'View Less' : 'View Full Menu'}
          </button>
        </div>
      </div>
    </section>
  );
}
