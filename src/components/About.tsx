export default function About() {
  return (
    <section id="about" className="section about" data-reveal>
      <div className="container">
        <span className="section__label">Our Story</span>
        <h2 className="section__title">
          Royal Flavors, <strong className="highlight">Family Tradition</strong>
        </h2>
        <div className="about__grid">
          <div className="about__text">
            <p>
              Nestled in the heart of Gulbarga (Kalaburagi), Karnataka,{' '}
              <strong>Maharaja Family Restaurant</strong> is where Mughal-era
              grandeur meets soulful South Indian hospitality. Our kitchen brings
              together the finest recipes — from slow-cooked biryanis and rich
              mutton gravies to smoky kebabs and authentic Arabian mandiis.
            </p>
            <p>
              Every dish is prepared with hand-ground spices, premium ingredients,
              and a dash of royal heritage. Whether you're celebrating a family
              occasion or craving an indulgent dinner, Maharaja welcomes you with
              warmth, flavor, and unmatched quality.
            </p>
            <div className="about__badge">
              <div className="about__rating">
                <span className="about__stars">⭐ 4.0</span>
                <span className="about__review-count">1,002 Google Reviews</span>
              </div>
              <div className="about__price-range">
                <i className="fa-solid fa-tag" />
                <span>₹200 – ₹400</span>
              </div>
            </div>
          </div>
          <div className="about__highlights">
            <div className="about__highlight-card tilt-card" data-tilt>
              <div className="about__highlight-icon"></div>
              <h4>Mutton Specialists</h4>
              <p>Signature mutton biryanis, gravies &amp; ghee roast.</p>
            </div>
            <div className="about__highlight-card tilt-card" data-tilt>
              <div className="about__highlight-icon"></div>
              <h4>Live Tandoor</h4>
              <p>     Freshly fired kebabs, naans &amp; rotis.</p>
            </div>
            <div className="about__highlight-card tilt-card" data-tilt>
              <div className="about__highlight-icon"></div>
              <h4>Family Dining</h4>
              <p>Comfortable, spacious setting for all occasions.</p>
            </div>
          </div>
        </div>

        {/* Review Highlights */}
        <div className="about__review-highlights">
          <div className="review-mini tilt-card" data-tilt>
            <div className="review-mini__stars">★★★★☆</div>
            <p>"Tasty food, reasonable prices, quick service"</p>
            <small>— Google Review</small>
          </div>
          <div className="review-mini tilt-card" data-tilt>
            <div className="review-mini__stars">★★★★★</div>
            <p>"Best biryani in Gulbarga, loved the mutton!"</p>
            <small>— Google Review</small>
          </div>
          <div className="review-mini tilt-card" data-tilt>
            <div className="review-mini__stars">★★★★☆</div>
            <p>"Great ambiance, perfect for family dinners"</p>
            <small>— Google Review</small>
          </div>
        </div>
      </div>
    </section>
  );
}
