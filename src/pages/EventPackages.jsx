// src/pages/EventPackages.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './EventPackages.css';
import ImageCarousel from '../components/ImageCarousel'; // Make sure this path is correct

function EventPackages() {
  const packages = [
    {
      id: 1,
      name: 'Basic Planner',
      category: 'Free Tier',
      image: 'https://i.pinimg.com/736x/32/87/6b/32876b475a665985b0b0e9ccd076a329.jpg',
      description: 'Kickstart your wedding planning with essential, easy-to-use tools.',
      features: [
        'Personalized Checklist',
        'Timeline to "I Do"',
        'Budget Tracker',
        'Guest List Manager (up to 50)',
        'Local Vendor Directory'
      ],
      price: 'FREE',
      link: '/dashboard'
    },
    {
      id: 2,
      name: 'Budget Wedding Package',
      category: 'Pre-Planned',
      image: 'https://i.pinimg.com/736x/0c/f8/97/0cf897915b071d22df1a936594ceb949.jpg',
      description: 'Affordable elegance and convenience, all taken care of for you.',
      features: [
        'Venue & Custom Decor',
        'Professional Photography',
        'Catering (100 guests)',
        'Music & Sound Setup',
        'Classic Wedding Cake'
      ],
      price: 'FROM $1,500',
      link: '/pre-planned/budget'
    },
    {
      id: 3,
      name: 'Luxury Dream Wedding',
      category: 'Pre-Planned',
      image: 'https://i.pinimg.com/736x/f5/a0/a4/f5a0a447bcbd34d7901953534f54e540.jpg',
      description: 'Luxury, elegance, and every detail taken care of for you.',
      features: [
        'Premium Venue & Custom Decor',
        'Elite Photo & Video Team',
        'Gourmet Catering & Open Bar',
        'Live Music or DJ',
        'Designer Wedding Cake'
      ],
      price: 'FROM $15,000',
      link: '/pre-planned/luxury'
    }
  ];

  const carouselImages = [
    // Weddings
    'https://images.pexels.com/photos/9721886/pexels-photo-9721886.jpeg',
    'https://i.pinimg.com/736x/a8/c9/2b/a8c92b383488b8744286860b79ea6540.jpg',
    'https://i.pinimg.com/736x/1f/e4/ae/1fe4aee121a3092e2fb45cff592aa1fb.jpg',

    // Birthdays/Parties
    'https://i.pinimg.com/736x/9f/73/6f/9f736fa79e1990b2e8909bd2abedb0c0.jpg',
    'https://i.pinimg.com/736x/2a/b3/7a/2ab37aa63666fcdd817050fbb7087369.jpg'
  ];

  const getPackageStyles = (index) => {
    const styles = {
      backgroundColor: index === 0 ? '#f9f2f5' :
                        index === 1 ? '#f5f0f9' :
                        '#f0f5f9',
      categoryBgColor: index === 0 ? '#d4af37' : // Gold for Basic
                           index === 1 ? '#a2836e' : // Muted brown for Budget
                           '#8b5a2b' // Darker brown for Luxury
    };
    return styles;
  };

  const renderPackageSection = (pkg, index, isAlternate = false) => {
    const styles = getPackageStyles(index);

    return (
      <section
        key={pkg.id}
        className={`single-package-section
                    ${isAlternate ? 'alternate-background' : ''}
                    ${index === 0 ? 'basic-planner-section' : ''}
                    ${index === 1 ? 'budget-package-section' : ''}
                    ${index === 2 ? 'luxury-package-section' : ''}`}
        style={{ backgroundColor: styles.backgroundColor }}
      >
        <div className="content-wrapper">
          <h2 className="section-title">
            {pkg.name}
          </h2>
          <div className={`package-display-layout`}>
            <div className="package-card-container">
              <div className="package-card">
                <div className="package-image-container">
                  <img src={pkg.image} alt={pkg.name} loading="lazy" />
                  <span
                    className="package-category"
                    style={{
                      backgroundColor: styles.categoryBgColor
                    }}
                  >
                    {pkg.category}
                  </span>
                </div>
                <div className="package-details">
                  <h3>{pkg.name}</h3>
                  <p className="package-description">
                    {pkg.description}
                  </p>
                  <ul className="package-features">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle"></i> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="package-footer">
                    <span className="package-price">
                      {pkg.price}
                    </span>
                    <Link
                      to={pkg.link}
                      className="btn secondary-btn"
                    >
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
  };

  return (
    <div className="event-packages-page">
      {/* NEW: General Hero Section for Event Packages Page */}
      <section className="event-packages-hero-section">
          <div className="hero-content-wrapper">
              <h1 className="hero-main-title">Find Your Perfect Event Package</h1>
              <p className="hero-subtext">
                  From intimate gatherings to grand celebrations, we have a package tailored for every dream.
              </p>
              <div className="hero-cta-buttons">
                  <Link to="#packages" className="btn primary-btn">Explore Packages</Link>
                  <Link to="/contact" className="btn secondary-btn">Custom Quote</Link>
              </div>
          </div>
      </section>

      {/* Spacing between hero and packages */}
      <div className="section-spacer"></div>

      {/* Packages Section */}
      <div id="packages"> {/* Add an ID for scroll-to-section if desired */}
        {packages.map((pkg, index) => (
          renderPackageSection(pkg, index, index % 2 !== 0)
        ))}
      </div>

      {/* Spacing between sections */}
      <div className="section-spacer"></div>

      {/* Carousel Background Section */}
      <section className="carousel-background-section">
        <div className="carousel-background-container">
          <ImageCarousel
            images={carouselImages}
            isBackground={false}
            autoPlay={true}
            interval={6000}
            visibleItems={3}
          />
          <div className="carousel-content-overlay">
            <div className="centered-content-card">
              <h1 className="carousel-title">Thoughtfully Curated for Every Celebration</h1>
              <p className="carousel-description">
                At Jesah Events, we understand that no two celebrations are the same. Whether you're planning a romantic wedding,
                a lavish birthday, a baby shower, or a sophisticated corporate gathering, we offer flexible packages designed
                to suit your vision, needs, and budget.
              </p>
              <div className="carousel-cta-buttons">
                <Link to="/weddings" className="btn primary-btn">
                  Wedding Packages
                </Link>
                <Link to="/events" className="btn secondary-btn">
                  All Event Types
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventPackages;