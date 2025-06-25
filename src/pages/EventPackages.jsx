import React from 'react';
import { Link } from 'react-router-dom';
import './EventPackages.css'; 

function EventPackages() {
  const toolPackages = [
    {
      id: 1,
      name: 'Basic Planner',
      category: 'Free Tier',
      image: 'https://i.pinimg.com/564x/a4/09/b8/a409b85c1860d5b4d7f7634f19b05777.jpg', // Placeholder image
      description: 'Start your wedding planning journey from "zero to hero" with our essential, easy-to-use tools. Perfectly designed to give you a strong foundation.',
      features: [
        'Personalized Planning Checklist.',
        'Step-by-step timeline from engagement to "I Do"',
        "Smart Budget Tracker",
        'Manage finances with custom categories & payment reminders',
        'Guest List & RSVP Manager: .',
        'Easily organize guests (up to 50) and track RSVPs',
        'Zimbabwe-Focused Vendor Directory.',
        'Access a curated list of vetted local wedding professionals',
        'Interactive Idea Board.',
        'Collect inspiration and define your wedding style with a digital mood board',
      ],
      price: 'Free'
    }
  ];

  return (
    <div className="event-packages-page">
      {/* Hero Section for Event Packages */}
      <section className="packages-hero-section">
        <div className="content-wrapper">
          <h1>Your Dream Wedding, Simplified. Anywhere You Say 'I Do'.</h1>
          <p>
            Navigating wedding planning can be overwhelming, but it doesn't have to be. 
            Jesah Events offers seamless, end-to-end planning solutions, bringing your perfect day to life 
            whether you're celebrating in the heart of Zimbabwe or anywhere across the globe.
          </p>
          <Link to="/contact" className="btn primary-btn packages-hero-btn">
            Choose Your Plan Today
          </Link>
        </div>
      </section>

      {/* Main Packages Grid Section - Now displaying only the free tier */}
      <section className="packages-grid-section">
        <div className="content-wrapper">
          <h2>Select Your Planning Journey</h2>
          <div className="packages-grid">
            {toolPackages.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="package-image-container">
                    <img src={pkg.image} alt={pkg.name} />
                    <span className="package-category">{pkg.category}</span>
                </div>
                <div className="package-details">
                  <h3>{pkg.name}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <ul className="package-features">
                    {pkg.features.map((feature, index) => (
                      <li key={index}><i className="fas fa-check-circle"></i> {feature}</li>
                    ))}
                  </ul>
                  <div className="package-footer">
                      <span className="package-price">{pkg.price}</span>
                      <Link to="/contact" className="btn secondary-btn">
                          Get Started
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventPackages;