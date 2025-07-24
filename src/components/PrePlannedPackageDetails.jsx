// src/components/PrePlannedPackageDetails.jsx
import React from 'react';
import { Link, useParams } from "react-router-dom";
// Ensure all necessary Lucide icons are imported here
import { Check, Heart, Camera, Music, Utensils, MapPin, Cake, Star, Diamond, Sparkles } from "lucide-react";



// Import the new CSS file
import './PrePlannedPackageDetails.css'; // This CSS file name is correct for this component

// Define data for different pre-planned packages
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
    heroImage: "https://images.pexels.com/photos/17668392/pexels-photo-17668392/free-photo-of-man-in-white-suit-and-woman-in-white-dress-walking-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
  luxury: {
    title: "Luxury Dream Wedding",
    description: "Indulge in an opulent and grand celebration where every detail exudes sophistication. An unforgettable, stress-free, and truly magnificent event.",
    startingPrice: "$15,000",
    rating: 5.0,
    features: [
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
    ],
    pricingBreakdown: [
      { item: "Exclusive Venue & Grand Decor", value: "$5,000" },
      { item: "Elite Photo & Videography", value: "$3,500" },
      { item: "Gourmet Catering & Premium Open Bar (100 guests)", value: "$4,000" },
      { item: "Live Orchestra / Renowned DJ", value: "$1,500" },
      { item: "Bespoke Designer Wedding Cake", value: "$1,000" },
    ],
    totalPrice: "$15,000",
    specialOfferText: "Confirm your booking today and receive a complimentary pre-wedding photoshoot or a luxury honeymoon travel credit!",
    heroImage: "https://images.pexels.com/photos/1032824/pexels-photo-1032824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    testimonials: [
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
    ],
  },
  // Add other packages here as needed (e.g., premium, custom, etc.)
};


const PrePlannedPackageDetails = () => {
  const { packageId } = useParams(); // Get the packageId from the URL (e.g., 'budget', 'luxury')
  const packageData = packagesData[packageId]; // Retrieve data based on packageId

  // If packageData is not found (e.g., invalid URL), render a loading/error state
  if (!packageData) {
    return (
      <div className="budget-package-details-page"> {/* Reusing the page class */}
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
            <span className="badge badge-popular">
              Most Popular {/* Or make this dynamic based on packageId */}
            </span>
            <h1 className="hero-title">
              {packageData.title}
            </h1>
            <p className="hero-description">
              {packageData.description}
            </p>
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
              <button className="btn btn-elegant btn-lg">
                Book Now
              </button>
              <button className="btn btn-romantic btn-lg">
                Get Custom Quote
              </button>
            </div>
          </div>
          <div className="hero-image-container">
            <img
              src={packageData.heroImage}
              alt={`${packageData.title} Image`}
              className="hero-image"
            />
            <div className="hero-image-overlay" />
          </div>
        </div>
      </section>

      {/* Package Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              What's Included
            </h2>
            <p className="section-description">
              Everything you need for your perfect wedding day
            </p>
          </div>

          <div className="features-grid">
            {packageData.features.map((feature, index) => (
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
              Pricing Breakdown
            </h2>
            <p className="section-description">
              Transparent pricing with no hidden fees
            </p>
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
                    {index < packageData.pricingBreakdown.length - 1 && (
                      <hr className="pricing-separator" />
                    )}
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
                <p className="special-offer-text">
                  {packageData.specialOfferText}
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
              What Our Couples Say
            </h2>
            <p className="section-description">
              Real stories from real couples
            </p>
          </div>

          <div className="testimonials-grid">
            {packageData.testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon-small" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "{testimonial.text}"
                </p>
                <p className="testimonial-author">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-container">
          <h2 className="section-title">
            Ready to Start Planning?
          </h2>
          <p className="section-description">
            Let's make your dream wedding a reality. Contact us today for a free consultation.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-elegant btn-lg">
              Book This Package
            </button>
            <button className="btn btn-romantic btn-lg">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrePlannedPackageDetails;