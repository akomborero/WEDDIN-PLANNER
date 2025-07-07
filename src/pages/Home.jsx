import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import Slider component
import "slick-carousel/slick/slick.css"; // Default slick styles
import "slick-carousel/slick/slick-theme.css"; // Default slick theme styles
import "./Home.css"; // Your custom CSS for styling

function Home() {
  // Define settings for your carousel
  const carouselSettings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the carousel endlessly
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 3, // Display three slides at a time (one big center, two smaller sides)
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto-play the carousel
    autoplaySpeed: 3000, // Time between slides in autoplay
    fade: false, // Important: Set to false to see multiple slides and the sliding effect
    cssEase: "ease-in-out", // Smoother transition effect for sliding and scaling
    
    centerMode: true, 
    centerPadding: '1px', // As per your preference, very minimal space around the center image
                                
    responsive: [
      {
        breakpoint: 992, // Settings for screens smaller than 992px (tablets)
        settings: {
          slidesToShow: 1, // Show only one slide at a time on smaller screens
          slidesToScroll: 1,
          dots: true,
          arrows: false, // Hide arrows on smaller screens
          centerMode: false, // Turn off center mode for simpler mobile layout
        }
      },
      {
        breakpoint: 576, // Settings for screens smaller than 576px (mobile phones)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          centerMode: false,
        }
      }
    ]
  };

  // Array of image URLs for your carousel
                     const carouselImages = [
    'https://i.pinimg.com/736x/85/31/77/85317732e7d0f6f88b705396be5e0da1.jpg',
    'https://i.pinimg.com/736x/0a/55/99/0a5599c5bedffef217ae15c5b0a4da7e.jpg',
    'https://i.pinimg.com/736x/e0/6d/e9/e06de99e77877aa76466745643e38528.jpg',
    'https://i.pinimg.com/736x/1f/e3/9d/1fe39d0dfda5f3bc84026700fef1149d.jpg',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="content-wrapper">
          <div className="hero-content">
            <h1>
              CAPTURE STORIES <br/> THAT LAST A <span className="lifetime-text">LIFETIME</span>
            </h1>
            <p className="mission-statement">
              Jesah Events aims to enhance brand visibility, generate quality leads, and position itself as a premier event planning company in Zimbabwe.
            </p>
            <div className="button-container">
              <Link to="/our-story" className="btn primary-btn">
                View Our Story
              </Link>
            </div>
          </div>
          <div className="hero-carousel-container">
            <Slider {...carouselSettings}>
              {carouselImages.map((image, index) => (
                <div key={index} className="carousel-slide-item">
                  <img src={image} alt={`Event ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section> {/* End of Hero Section */}

      {/* START OF NEW SECTION: Image-Content-Image Layout */}
      <section className="image-content-section">
          <div className="content-wrapper"> {/* Reusing content-wrapper for consistent max-width and padding */}
              <div className="image-content-left">
                  <img 
                      src="https://i.pinimg.com/736x/25/f6/a6/25f6a6421d955c53950c8b82c04a536b.jpg" 
                      alt="" 

                  />
              </div>

              <div className="image-content-center">
                  <h2>A passion for Story Telling</h2> 
                  <h1>
                      Through the Lens as the harder
                  </h1>
                  <p>
                      We believe your wedding should be a reflection of who you are – beautiful, personal, and unforgettable. 
                      With a passion for detail and a love for celebrations, Jesah Events offers full-service wedding planning 
                      designed to make your journey stress-free and magical from “Yes” to “I Do.”
                  </p>
                  {/* START NEW BUTTON */}
                  <div className="button-container-center">
                      <Link to="/our-testimonials" className="btn primary-btn">
                          View All
                      </Link>
                  </div>
                  {/* END NEW BUTTON */}
              </div>

              <div className="image-content-right">
                  <img 
                       src="https://i.pinimg.com/736x/42/cf/f9/42cff9280cff541c4a6e06f1d9dbe6ef.jpg" 
                      alt=" " 
                  />
              </div>
          </div>
      </section> {/* END OF NEW SECTION */}

      {/* START OF NEW SECTION: Call to Action */}
      <section className="cta-section">
        <div className="content-wrapper"> {/* Reusing content-wrapper for consistent max-width */}
          <div className="cta-content">
            <h2>Let's plan your dream Event</h2>
            <p>
                Imagine your wedding day, flawlessly designed and perfectly tailored to you, without the stress. We'll guide you from your very first idea to a breathtaking execution, handling every intricate detail so you can simply savor every magical moment.
            </p>
            <Link to="/event-packages" className="btn primary-btn">
              Plan your Wedding
            </Link>
          </div>
        </div>
      </section>

    </> 
  );
} 

export default Home;



 


   