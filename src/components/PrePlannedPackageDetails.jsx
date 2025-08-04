import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Check, Heart, Camera, Music, Utensils, MapPin, Cake, Star, Diamond, Sparkles, X } from "lucide-react";
import './PrePlannedPackageDetails.css';

const packagesData = {
  budget: {
    title: "Budget Wedding Package",
    description: "Affordable elegance and convenience, all taken care of for you. Create magical memories without compromising on quality.",
    startingPrice: "$1,500",
    rating: 4.9,
    features: [
      {
        icon: <MapPin className="feature-icon" />,
        title: "Venue & Custom Decor",
        description: "Beautiful venue setup with custom decorations tailored to your theme. Includes table linens, centerpieces, and ambient lighting."
      },
      {
        icon: <Camera className="feature-icon" />,
        title: "Professional Photography",
        description: "6-hour professional photography coverage including ceremony, reception, and couple portraits. 200+ edited high-resolution photos."
      },
      {
        icon: <Utensils className="feature-icon" />,
        title: "Catering for 100 Guests",
        description: "Delicious three-course meal with appetizers, main course, and dessert. Dietary restrictions accommodated."
      },
      {
        icon: <Music className="feature-icon" />,
        title: "Music & Sound Setup",
        description: "Professional DJ service with sound system for ceremony and reception. Includes microphones and music coordination."
      },
      {
        icon: <Cake className="feature-icon" />,
        title: "Classic Wedding Cake",
        description: "Beautiful two-tier wedding cake designed to match your theme. Choice of flavors and elegant decoration."
      }
    ],
    pricingBreakdown: [
      { item: "Venue & Decor Setup", value: "$500" },
      { item: "Professional Photography (6 hours)", value: "$400" },
      { item: "Catering for 100 guests", value: "$400" },
      { item: "DJ & Sound System", value: "$150" },
      { item: "Wedding Cake", value: "$50" },
    ],
    totalPrice: "$1,500",
    specialOfferText: "Book within the next 30 days and save $200! Final price: $1,300",
    heroImage: "https://i.pinimg.com/736x/6c/ae/f9/6caef9dd8fae6216ff47e4cdfab7f254.jpg",
    testimonials: [
      {
        name: "Sarah & Michael",
        text: "The budget package exceeded our expectations! Everything was perfect and we stayed within our budget.",
        rating: 5
      },
      {
        name: "Emma & David",
        text: "Professional service and beautiful execution. Our guests are still talking about how amazing everything was!",
        rating: 5
      }
    ],
  },
};

const PrePlannedPackageDetails = () => {
  const { packageId } = useParams();
  const packageData = packagesData[packageId];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!packageData) {
    return (
      <div className="budget-package-details-page">
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Package Not Found</h2>
          <p>The package you are looking for does not exist. Please check the URL or go back to packages.</p>
          <Link to="/event-packages" className="back-link" style={{ marginTop: '20px', display: 'inline-block' }}>
            ← Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="budget-package-details-page">
      <div className="header-section">
        <div className="container header-content">
          <Link to="/event-packages" className="back-link">
            ← Back to Packages
          </Link>
        </div>
      </div>

      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-text-content">
            <span className="badge badge-popular">Most Popular</span>
            <h1 className="hero-title">{packageData.title}</h1>
            <p className="hero-description">{packageData.description}</p>
            <div className="price-rating-wrapper">
              <div>
                <div className="price-label">Starting from</div>
                <div className="hero-price">{packageData.startingPrice}</div>
              </div>
              <div className="rating-stars-wrapper">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" />
                ))}
                <span className="rating-text">({packageData.rating}/5)</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button className="btn btn-elegant btn-lg" onClick={() => setIsModalOpen(true)}>
                Book Now
              </button>
              <button className="btn btn-romantic btn-lg">Get Custom Quote</button>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={packageData.heroImage} alt={`${packageData.title} Image`} className="hero-image" />
            <div className="hero-image-overlay" />
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What's Included</h2>
            <p className="section-description">Everything you need for your perfect wedding day</p>
          </div>

          <div className="features-grid">
            {packageData.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-card-header">
                  <div className="feature-icon-wrapper">{feature.icon}</div>
                  <h3 className="feature-card-title">{feature.title}</h3>
                </div>
                <div className="feature-card-content">
                  <p className="feature-card-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container pricing-container">
          <div className="section-header">
            <h2 className="section-title">Pricing Breakdown</h2>
            <p className="section-description">Transparent pricing with no hidden fees</p>
          </div>

          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="pricing-card-title">{packageData.title}</h3>
            </div>
            <div className="pricing-card-content">
              <div className="pricing-list-items">
                {packageData.pricingBreakdown.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="pricing-item">
                      <span>{item.item}</span>
                      <span className="pricing-item-value">{item.value}</span>
                    </div>
                    {index < packageData.pricingBreakdown.length - 1 && <hr className="pricing-separator" />}
                  </React.Fragment>
                ))}
                <hr className="pricing-separator-total" />
                <div className="pricing-total">
                  <span>Total Package Price</span>
                  <span>{packageData.totalPrice}</span>
                </div>
              </div>

              <div className="special-offer-box">
                <div className="special-offer-header">
                  <Heart className="special-offer-icon" />
                  <span className="special-offer-title">Special Offer</span>
                </div>
                <p className="special-offer-text">{packageData.specialOfferText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Couples Say</h2>
            <p className="section-description">Real stories from real couples</p>
          </div>

          <div className="testimonials-grid">
            {packageData.testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon-small" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X />
            </button>
            <h2>Book Your Wedding Package</h2>
            <form>
              <label>Name:</label>
              <input type="text" placeholder="Your full name" required />

              <label>Email:</label>
              <input type="email" placeholder="Your email" required />

              <label>Phone Number:</label>
              <input type="tel" placeholder="Your phone number" required />

              <label>Preferred Date:</label>
              <input type="date" required />

              <label>Additional Notes:</label>
              <textarea placeholder="Any special requests?" rows={4}></textarea>

              <button type="submit" className="btn btn-elegant btn-lg">Submit Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrePlannedPackageDetails;
