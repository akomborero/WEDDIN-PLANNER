import { Link } from "react-router-dom";
import "./Navbar.css"; // For custom styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Replace with your logo file path and alt text */}
        <img src="/logo.png" alt=" Company Logo" height="40" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/event-packages">Event Packages</Link></li>
        <li><Link to="/our-story">Our Story</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
      <div className="navbar-book">
        <Link to="/book-now" className="book-now-btn">Book Now</Link>
      </div>
    </nav>
  );
}

export default Navbar;