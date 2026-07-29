import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow glow-one"></div>
      <div className="footer-glow glow-two"></div>

      <div className="footer-container">
        <div className="footer-section brand-section">
          <div className="brand-mark">N</div>
          <h2>Ngenos Electronics</h2>
          <p>
            Kenya’s trusted electronics marketplace for new, refurbished, and
            second-hand devices at honest prices.
          </p>

          <div className="footer-highlights">
            <span>✓ M-Pesa</span>
            <span>✓ Cash on Delivery</span>
            <span>✓ Secure Checkout</span>
            <span>✓ Verified Products</span>
          </div>

          <div className="footer-cta">
            <p>Need help choosing the right device?</p>
            <Link to="/products" className="footer-btn">
              Explore Products
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <Link to="/products">New Electronics</Link>
          <Link to="/products">Refurbished</Link>
          <Link to="/products">Second Hand</Link>
          <Link to="/products">Featured Deals</Link>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <Link to="/products">Laptops</Link>
          <Link to="/products">Smartphones</Link>
          <Link to="/products">Tablets</Link>
          <Link to="/products">TVs</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            <span>Location</span>Kabarnet, Kenya
          </p>
          <p>
            <span>Phone</span>+254 101 678 078
          </p>
          <p>
            <span>Email</span>ngenoelectronics@gmail.com
          </p>
          <p>
            <span>Hours</span>Mon–Sat • 8:00 AM – 8:00 PM
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Ngenos Electronics. All Rights Reserved.</p>
        <p>Powered by Ngeno Industries</p>
      </div>
    </footer>
  );
}

export default Footer;