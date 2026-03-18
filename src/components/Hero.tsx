export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg-layer">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Royal Indian cuisine"
          className="hero__bg-img"
          loading="eager"
        />
        <div className="hero__gradient-overlay" />
        <div className="hero__radial-glow" />
      </div>
      <div className="hero__content">
        <div className="hero__crown-3d" id="hero-crown">
          <span></span>
        </div>
        <p className="hero__tagline" data-animate="fade-up">
          ✦ A ROYAL DINING EXPERIENCE ✦
        </p>
        <h1 className="hero__title" data-animate="fade-up-delay">
          Where Every Meal is
          <br />
          <strong className="highlight">a Royal Feast</strong>
        </h1>
        <p className="hero__subtitle" data-animate="fade-up-delay2">
          Maharaja Family Restaurant, Gulbarga
        </p>
        <div className="hero__cta" data-animate="fade-up-delay3">
          <a href="#menu" className="btn btn--gold">
            Explore Menu
          </a>
          <a href="#location" className="btn btn--outline">
            Find Us
          </a>
        </div>
        {/* <div className="hero__scroll-hint">
          <span>Scroll to Discover</span>
          <div className="hero__scroll-line" /> */}
        {/* </div> */}
      </div>
    </section>
  );
}
