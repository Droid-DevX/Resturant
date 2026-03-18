import { popularDishes } from '../data/menu';

export default function Popular() {
  return (
    <section id="popular" className="section popular" data-reveal>
      <div className="container">
        <span className="section__label">Chef's Recommendations</span>
        <h2 className="section__title">
          Royal <strong className="highlight">Bestsellers</strong>
        </h2>
        <div className="popular__grid" id="popular-grid">
          {popularDishes.map((dish) => (
            <div key={dish.name} className="popular-card">
              <div className="popular-card__image-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}${dish.image.replace(/^\//, '')}`}
                  alt={dish.name}
                  className="popular-card__image"
                  loading="lazy"
                />
                <div className="popular-card__shimmer" />
                <span className="popular-card__badge">{dish.badge}</span>
              </div>
              <div className="popular-card__content">
                <h3 className="popular-card__name">{dish.name}</h3>
                <p className="popular-card__desc">{dish.description}</p>
                <span className="popular-card__price">₹{dish.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
