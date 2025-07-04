import React from 'react';
import { Link } from 'react-router-dom';
import './EventPackages.css';

function EventPackages() {
  const packages = [
    {
      id: 1,
      name: 'Basic Planner',
      category: 'Free Tier',
      image: 'https://images.pexels.com/photos/10755717/pexels-photo-10755717.jpeg', // Placeholder image
      description: 'Start your wedding planning journey from "zero to hero" with our essential, easy-to-use tools. Perfectly designed to give you a strong foundation.',
      features: [
        'Personalized Planning Checklist',
        'Step-by-step timeline from engagement to "I Do"',
        "Smart Budget Tracker: Manage finances with custom categories & payment reminders",
        'Guest List & RSVP Manager: Easily organize guests (up to 50) and track RSVPs',
        'Zimbabwe-Focused Vendor Directory: Access a curated list of vetted local wedding professionals',
        'Interactive Idea Board: Collect inspiration and define your wedding style with a digital mood board',
      ],
      price: 'Free',
      link: '/dashboard'
    },
    {
      id: 2, // This is the low budget package
      name: 'Budget Wedding Package',
      category: 'Pre-Planned',
      image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg',
      description: 'A simple, elegant celebration — without the high costs. Perfect for couples who want ease and charm on a tight budget.',
      features: [
        'Venue & Basic Decor',
        'Photographer Included',
        'Catering (Up to 100 guests)',
        'Playlist & Sound Setup',
        'Simple Wedding Cake',
      ],
      price: 'From $1,500',
      link: '/pre-planned/budget'
    },
    {
      id: 3, // This is the high budget package
      name: 'Luxury Dream Wedding',
      category: 'Pre-Planned',
      image: 'https://images.pexels.com/photos/3889895/pexels-photo-3889895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // High-end image
      description: 'Experience unparalleled elegance and bespoke service. Our luxury package handles every exquisite detail for an unforgettable celebration.',
      features: [
        'Premium Venue Selection & Custom Decor',
        'Elite Photography & Videography Team',
        'Gourmet Catering & Open Bar (Unlimited Guests)',
        'Live Band or DJ & Professional Sound',
        'Multi-Tiered Designer Wedding Cake',
        'Dedicated On-Site Wedding Coordinator',
        'Bridal Styling & Glam Team',
        'Luxury Transport & Accommodation Assistance'
      ],
      price: 'Starting from $15,000',
      link: '/pre-planned/luxury'
    }
  ];

  // Helper function to render a single package card within its section
  const renderPackageSection = (pkg, index, isAlternate = false) => (
    <section
      key={pkg.id}
      className={`single-package-section
                  ${isAlternate ? 'alternate-background' : ''}
                  ${index === 0 ? 'basic-planner-section' : ''}
                  ${index === 1 ? 'budget-package-section' : ''}
                  ${index === 2 ? 'luxury-package-section' : ''}`}>
      <div className="content-wrapper">
        <h2 className="section-title">{pkg.name}</h2>
        <div className={`package-display-layout`}>
          <div className="package-card-container">
            <div className="package-card">
              <div className="package-image-container">
                <img src={pkg.image} alt={pkg.name} />
                <span className="package-category">{pkg.category}</span>
              </div>
              <div className="package-details">
                <h3>{pkg.name}</h3>
                <p className="package-description">{pkg.description}</p>
                <ul className="package-features">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check-circle"></i> {feature}
                    </li>
                  ))}
                </ul>
                <div className="package-footer">
                  <span className="package-price">{pkg.price}</span>
                  <Link to={pkg.link} className="btn secondary-btn">
                    {pkg.category === 'Free Tier' ? 'Get Started' : 'View Details'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="event-packages-page">
      {/* Hero Section */}
      <section className="packages-hero-section">
        <div className="content-wrapper">
          
        </div>
      </section>
<br/>
<br/>
      {/* Render each package in its own section */}
      {packages.map((pkg, index) => (
        renderPackageSection(pkg, index, index % 2 !== 0)
      ))}

    </div>
  );
}

export default EventPackages;