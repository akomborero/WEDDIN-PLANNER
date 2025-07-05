import React from 'react';
import { Link } from 'react-router-dom';
import './EventPackages.css';

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

  const renderPackageSection = (pkg, index, isAlternate = false) => (
    <section
      key={pkg.id}
      className={`single-package-section
                  ${isAlternate ? 'alternate-background' : ''}
                  ${index === 0 ? 'basic-planner-section' : ''}
                  ${index === 1 ? 'budget-package-section' : ''}
                  ${index === 2 ? 'luxury-package-section' : ''}`}
      style={{
        backgroundColor: index === 0 ? '#f9f2f5' : 
                        index === 1 ? '#f5f0f9' : 
                        '#f0f5f9'
      }}
    >
      <div className="content-wrapper">
        <h2 
          className="section-title"
          style={{
            fontFamily: '"Playfair Display", serif',
            color: '#8b5a2b',
            fontWeight: 600
          }}
        >
          {pkg.name}
        </h2>
        <div className={`package-display-layout`}>
          <div className="package-card-container">
            <div className="package-card">
              <div className="package-image-container">
                <img src={pkg.image} alt={pkg.name} />
                <span 
                  className="package-category"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    backgroundColor: index === 0 ? '#d4af37' :
                                      index === 1 ? '#a2836e' :
                                      '#8b5a2b',
                    color: 'white'
                  }}
                >
                  {pkg.category}
                </span>
              </div>
              <div 
                className="package-details"
                style={{
                  fontFamily: '"Raleway", sans-serif'
                }}
              >
                <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#5d3a1a' }}>
                  {pkg.name}
                </h3>
                <p 
                  className="package-description"
                  style={{ color: '#666', lineHeight: '1.6' }}
                >
                  {pkg.description}
                </p>
                <ul 
                  className="package-features"
                  style={{ color: '#5d3a1a' }}
                >
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <i 
                        className="fas fa-check-circle" 
                        style={{ color: '#d4af37' }}
                      ></i> {feature}
                    </li>
                  ))}
                </ul>
                <div className="package-footer">
                  <span 
                    className="package-price"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#8b5a2b',
                      fontSize: '1.2rem'
                    }}
                  >
                    {pkg.price}
                  </span>
                  <Link 
                    to={pkg.link} 
                    className="btn secondary-btn"
                    style={{
                      backgroundColor: '#d4af37',
                      color: 'white',
                      fontFamily: '"Montserrat", sans-serif'
                    }}
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
  return (
    <div className="event-packages-page">
      {/* --- DASHBOARD HERO SECTION --- */}
      <section className="dashboard-hero-section new-hero-wedding">
        {/* The video element positioned behind everything else */}
        <video className="hero-video-background" autoPlay loop muted playsInline>
  <source src="https://videos.pexels.com/video-files/27979649/12279936_1920_1080_25fps.mp4" type="video/mp4" />
  {/* It's highly recommended to use a *different* video file for the .webm source if possible.
      Not all browsers that support MP4 also support MP4 when served as WebM.
      If you can't get a .webm version, you might stick to just the MP4 for now,
      but understand some browsers might not play it. */}
  <source src="https://videos.pexels.com/video-files/3122106/3122106-hd_1920_1080_25fps.webm" type="video/webm" /> 
  {/* If Pexels doesn't provide a .webm, remove this second source tag. 
      You can also add a poster image for a better fallback: */}
  <img src="https://images.pexels.com/photos/3122106/pexels-photo-3122106.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Wedding couple" />
  Your browser does not support the video tag.
</video>

        <div className="hero-bg-overlay"></div>
        <div className="hero-content-wrapper">
          <h1 className="hero-main-title">
            Welcome, <span className="hero-names">Mr. Kayden & Mrs. Kayden!</span>
          </h1>
          <div className="hero-divider"></div>
          <h2 className="hero-inspire">
            Your journey as **future newlyweds** begins here.
          </h2>
          <p className="hero-subtext">
            Explore our tailored packages, designed to bring your unique wedding vision to life,
            from essential planning tools to all-inclusive celebrations.
          </p>
        </div>
      </section>

      {/* Spacing between hero and packages */}
      <br />
      <br />

      {/* --- PACKAGES SECTION --- */}
      {packages.map((pkg, index) => (
        renderPackageSection(pkg, index, index % 2 !== 0)
      ))}
    </div>
  );
}

export default EventPackages;