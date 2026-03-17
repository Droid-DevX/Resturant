export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-crown"></span>
              <span className="footer__logo-text">MAHARAJA</span>
            </div>
            <b>Where Every Meal is a Royal Feast</b>
            <p className="footer__address">
              Beside Taj Function Hall, Hagarga Cross Ring Rd, Gulbarga
            </p>
          </div>
          {/* <div className="footer__nav">
            <h4>Quick Links</h4>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#popular">Specials</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Find Us</a>
          </div> */}
          <div className="footer__social">
            <h4>Follow Us</h4>
            <div className="footer__social-icons">
              <a href="#" aria-label="Instagram">
                <i className="fa-brands fa-instagram" />
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="#" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp" />
              </a>
              <a href="#" aria-label="Google">
                <i className="fa-brands fa-google" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2025 Maharaja Family Restaurant. All rights reserved.</p>
          <p>Gulbarga (Kalaburagi), Karnataka, India</p>
        </div>
      </div>
    </footer>
  );
}
