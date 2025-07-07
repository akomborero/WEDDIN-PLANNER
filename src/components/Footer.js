import React from 'react';
import { Link } from 'react-router-dom';
// You might need to import your font-awesome or other icon libraries if you use them directly here
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Example if you use FontAwesome

import './Footer.css'; // Create this new CSS file for footer-specific styles

function Footer() {
  return (
    <footer className="footer-section">
      <div className="content-wrapper footer-grid"> {/* Apply footer-grid for layout */}
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-info">
          <Link to="/" className="footer-logo">
            <img src="https://i.pinimg.com/736x/1f/e3/9d/1fe39d0dfda5f3bc84026700fef1149d.jpg" alt="Jesah Events Logo" />
          </Link>
          <p className="brand-slogan">Crafting unforgettable moments, from vision to breathtaking reality.</p>
          <p className="copyright">&copy; {new Date().getFullYear()} Jesah Events. All rights reserved.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/our-story">Our Story</Link></li>
            <li><Link to="/event-packages">Event Packages</Link></li>
            <li><Link to="/our-testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Explore Services */}
        <div className="footer-col explore-services">
          <h3>Explore Services</h3>
          <ul>
            <li><Link to="/services/wedding-planning">Wedding Planning</Link></li>
            <li><Link to="/services/corporate-events">Corporate Events</Link></li>
            <li><Link to="/services/parties">Birthday & Parties</Link></li>
            <li><Link to="/services/photography">Photography & Videography</Link></li>
            <li><Link to="/services/decor">Decor & Styling</Link></li>
          </ul>
        </div>

        {/* Column 4: Connect & Contact */}
        <div className="footer-col connect-us">
          <h3>Connect With Us</h3>
          <p>Email: <a href="mailto:makomborerichidzviva@gmail.com">makomborerichidzviva@gmail.com</a></p>
          <p>Phone: <a href="tel:+263718305005">+263 71 830 5005</a></p>
          <p>Harare, Zimbabwe</p>
          <div className="social-links">
            <a href="https://facebook.com/jesahevents" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com/jesahevents" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://pinterest.com/jesahevents" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest"></i></a>
            {/* Add more social links as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;