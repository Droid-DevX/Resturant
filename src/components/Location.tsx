export default function Location() {
  return (
    <section id="location" className="section location" data-reveal>
      <div className="container">
        <span className="section__label">Visit Us</span>
        <h2 className="section__title">
          Where to <strong className="highlight">Find Us</strong>
        </h2>
        <div className="location__grid">
          <div className="location__info">
            <div className="location__detail">
              <div className="location__icon">
                <i className="fa-solid fa-location-dot" />
              </div>
              <div>
                <h4>Address</h4>
                <p>
                  Beside Taj Function Hall, Hagarga Cross, Ring Rd,
                  <br />
                  Kalaburagi, Karnataka 585104
                </p>
              </div>
            </div>
            <div className="location__detail">
              <div className="location__icon">
                <i className="fa-solid fa-clock" />
              </div>
              <div>
                <h4>Hours</h4>
                <p>Open Daily: 8:00 PM – 11:00 PM</p>
                <p className="location__closed">Closed during daytime</p>
              </div>
            </div>
            <div className="location__detail">
              <div className="location__icon">
                <i className="fa-solid fa-phone" />
              </div>
              <div>
                <h4>Contact</h4>
                <p>Call us for reservations or inquiries</p>
              </div>
            </div>
            <div className="location__detail">
              <div className="location__icon">
                <i className="fa-solid fa-indian-rupee-sign" />
              </div>
              <div>
                <h4>Price Range</h4>
                <p>₹200 – ₹400 per person</p>
              </div>
            </div>
          </div>
          <div className="location__map-wrapper">
            <div className="location__map-frame">
              <iframe
                id="google-map"
                src="https://maps.google.com/maps?q=Beside%20Taj%20Function%20Hall,%20Hagarga%20Cross,%20Ring%20Rd,%20Kalaburagi,%20Karnataka%20585104&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maharaja Family Restaurant Location"
              />
              <div className="location__map-pin">
                <div className="location__map-pin-pulse" />
                <i className="fa-solid fa-location-dot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
