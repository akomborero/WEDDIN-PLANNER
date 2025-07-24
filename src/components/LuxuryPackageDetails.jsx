// src/components/LuxuryPackageDetails.jsx

import React from 'react';
import { Link } from "react-router-dom";
import {
  Check, Heart, Camera, Music, Utensils, MapPin, Cake, Star, Diamond, Sparkles,
  Briefcase,
  Flower
} from "lucide-react";

import './LuxuryPackageDetails.css';

const LuxuryPackageDetails = () => {
  const packageFeatures = [
    {
      icon: <Diamond className="feature-icon" />,
      title: "Exclusive Grand Venue",
      description: "Access to elite, sought-after venues with breathtaking aesthetics and ample space for a grand celebration."
    },
    {
      icon: <Camera className="feature-icon" />,
      title: "Elite Photo & Videography Team",
      description: "Full-day coverage by a premier photo and videography team, including drone footage and a cinematic highlight reel."
    },
    {
      icon: <Utensils className="feature-icon" />,
      title: "Gourmet Catering & Open Bar",
      description: "Bespoke menu crafted by a renowned chef, featuring premium ingredients. Includes a full open bar with top-shelf beverages."
    },
    {
      icon: <Music className="feature-icon" />,
      title: "Live Orchestra or Renowned DJ",
      description: "Choose between a captivating live orchestra or a famous DJ to set the perfect ambiance for your reception."
    },
    {
      icon: <Cake className="feature-icon" />,
      title: "Bespoke Designer Wedding Cake",
      description: "A multi-tiered, custom-designed wedding cake by a top patissier, a true centerpiece of your celebration."
    },
    {
        icon: <Briefcase className="feature-icon" />,
        title: "Dedicated Wedding Planner",
        description: "A dedicated senior wedding planner to meticulously oversee every detail from concept to execution."
    },
    {
        icon: <Flower className="feature-icon" />,
        title: "Exquisite Floral Design",
        description: "Lavish floral arrangements and decor designed by a master florist, transforming your venue into a dream."
    },
    {
      icon: <Sparkles className="feature-icon" />, // This seems like a duplicate, consider removing if not distinct
      title: "Luxury Amenities & Support",
      description: "From luxury transportation to on-site support, every detail is handled with precision and care."
    },
  ];

  const testimonials = [
    {
      name: "Eleanor & James",
      text: "Our luxury wedding was truly a dream come true. Every detail was flawlessly executed, exceeding all our expectations!",
      rating: 5
    },
    {
      name: "Isabella & William",
      text: "The planner was phenomenal, and the bespoke catering was simply divine. An unparalleled experience from start to finish.",
      rating: 5
    },
    {
      name: "Sophia & Lucas",
      text: "From the stunning venue to the incredible music, our luxury package delivered an unforgettable celebration for us and our guests.",
      rating: 5
    }
  ];

  // This userLastName would typically come from your authentication context/state
  const userLastName = "Kayden"; // Placeholder for demonstration

  return (
    <div className="luxury-package-details-page">
      {/* Header */}
      <div className="header-section">
        <div className="container header-content">
          <Link to="/event-packages" className="back-link">
            ← Back to Packages
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-text-content">
            <span className="badge badge-premium">
              Signature Offering
            </span>
            <h1 className="hero-title">
              Luxury Dream Wedding
            </h1>
            <p className="hero-description">
              Indulge in an opulent and grand celebration where every detail exudes sophistication. An unforgettable, stress-free, and truly magnificent event.
            </p>
            <div className="price-rating-wrapper">
              <div>
                <div className="price-label">Starting from</div>
                <div className="hero-price">$15,000</div>
              </div>
              <div className="rating-stars-wrapper">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" />
                ))}
                <span className="rating-text">(5.0/5)</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link
                to={{
                  pathname: "/dashboard",
                  state: {
                    bookedLuxury: true, // Flag to indicate a luxury booking
                    packageName: "Luxury Dream Wedding",
                    lastName: userLastName // Pass the user's last name for personalization
                  }
                }}
                className="btn btn-luxury btn-lg"
              >
                Book Elite Package
              </Link>
              <button className="btn btn-bespoke btn-lg">
                Design Your Dream
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Package Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Exquisite Inclusions
            </h2>
            <p className="section-description">
              Every detail meticulously crafted for perfection
            </p>
          </div>

          <div className="features-grid">
            {packageFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-card-header">
                  <div className="feature-icon-wrapper">
                    {feature.icon}
                  </div>
                  <h3 className="feature-card-title">{feature.title}</h3>
                </div>
                <div className="feature-card-content">
                  <p className="feature-card-description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Breakdown */}
      <section className="pricing-section">
        <div className="container pricing-container">
          <div className="section-header">
            <h2 className="section-title">
              Investment Details
            </h2>
            <p className="section-description">
              Transparent pricing for an unparalleled experience
            </p>
          </div>

          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="pricing-card-title">Luxury Dream Wedding</h3>
            </div>
            <div className="pricing-card-content">
              <div className="pricing-list-items">
                <div className="pricing-item">
                  <span>Exclusive Venue & Grand Decor</span>
                  <span className="pricing-item-value">$5,000</span>
                </div>
                <hr className="pricing-separator" />
                <div className="pricing-item">
                  <span>Elite Photo & Videography</span>
                  <span className="pricing-item-value">$3,500</span>
                </div>
                <hr className="pricing-separator" />
                <div className="pricing-item">
                  <span>Gourmet Catering & Premium Open Bar (100 guests)</span>
                  <span className="pricing-item-value">$4,000</span>
                </div>
                <hr className="pricing-separator" />
                <div className="pricing-item">
                  <span>Live Orchestra / Renowned DJ</span>
                  <span className="pricing-item-value">$1,500</span>
                </div>
                <hr className="pricing-separator" />
                <div className="pricing-item">
                  <span>Bespoke Designer Wedding Cake</span>
                  <span className="pricing-item-value">$1,000</span>
                </div>
                <hr className="pricing-separator" />
                <div className="pricing-item">
                  <span>Dedicated Wedding Planner & Concierge</span>
                  <span className="pricing-item-value">$1,000</span>
                </div>
                <hr className="pricing-separator" />
                <div className="pricing-item">
                  <span>Exquisite Floral Design</span>
                  <span className="pricing-item-value">$1,000</span>
                </div>
                <hr className="pricing-separator-total" />
                <div className="pricing-total">
                  <span>Total Package Investment</span>
                  <span>$17,000</span>
                </div>
              </div>

              <div className="special-offer-box special-offer-luxury">
                <div className="special-offer-header">
                  <Sparkles className="special-offer-icon" />
                  <span className="special-offer-title">Exclusive Bridal Gift</span>
                </div>
                <p className="special-offer-text">
                  Confirm your booking today and receive a complimentary pre-wedding photoshoot or a luxury honeymoon travel credit!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Hear From Our Elite Couples
            </h2>
            <p className="section-description">
              Unforgettable moments from our satisfied clients
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon-small" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxuryPackageDetails;