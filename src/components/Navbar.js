import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useState } from "react";
import "./Navbar.css"; // For custom styling

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility
  const location = useLocation(); // Get the current location object

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Replace with your logo file path and alt text */}
        <img src="/your-logo.png" alt="Company Logo" height="40" />
      </div>

      {/* Hamburger Menu Icon (will be visible on small screens) */}
      {/* Conditionally add 'open' class to hamburger for animation */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Links - conditionally apply 'open' class */}
      {/* We'll reorder these for mobile in CSS */}
      <div className={`navbar-content-wrapper ${isOpen ? "open" : ""}`}>
        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={toggleMenu} className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/event-packages" onClick={toggleMenu} className={location.pathname === "/event-packages" ? "active" : ""}>
              Event Packages
            </Link>
          </li>
          <li>
            <Link to="/our-story" onClick={toggleMenu} className={location.pathname === "/our-story" ? "active" : ""}>
              Our Story
            </Link>
          </li>
          <li>
            <Link to="/testimonials" onClick={toggleMenu} className={location.pathname === "/testimonials" ? "active" : ""}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={toggleMenu} className={location.pathname === "/services" ? "active" : ""}>
              Services
            </Link>
          </li>
        </ul>

        {/* Book Now button within the content wrapper */}
        <div className="navbar-book">
          <Link to="/event-packages" className="book-now-btn" onClick={toggleMenu}>Book Now</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;