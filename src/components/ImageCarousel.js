import React, { useRef } from 'react'; // Only useRef is needed now
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const carouselRef = useRef(null); // Still need this to attach to the scroll container

  // We no longer need:
  // - useState for currentIndex
  // - useEffect for auto-sliding
  // - useEffect for scrolling to currentIndex
  // - slideIntervalRef
  // - userInteractedRef
  // - scrollToSlide useCallback
  // - handleDotClick

  // The dots will still show, but won't control scrolling directly from JS.
  // Their active state will implicitly depend on scroll position (handled by CSS scroll-snap)
  // For a purely manual scroll with dots, you might consider an Intersection Observer
  // to detect which slide is visible and update the active dot, but for now,
  // we'll remove dot logic as auto-scroll is gone.

  return (
    <div className="image-carousel-container" ref={carouselRef}>
      <div className="carousel-images-wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-image-slide"
            style={{ backgroundImage: `url(${image})` }}
            data-slide-index={index} // Keep this, useful for future enhancements
            tabIndex={0} // Good for accessibility even with manual scroll
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
          ></div>
        ))}
      </div>
      {/*
        Removing carousel dots as their JS logic was tied to auto-scroll
        and managing their active state with purely manual scroll would require
        additional logic (e.g., Intersection Observer), which is outside the scope
        of simply enabling swipe. If you still want dots that reflect position,
        we can add that logic back with an Intersection Observer.
      */}
      {/* <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === 0 ? 'active' : ''}`} // Placeholder active, will not dynamically update
            // onClick handler removed
            aria-label={`Go to slide ${index + 1}`}
            role="button"
            tabIndex={0}
            // onKeyDown handler removed
          ></span>
        ))}
      </div> */}
    </div>
  );
};

export default ImageCarousel;