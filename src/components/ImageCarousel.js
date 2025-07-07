import React, { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images, isBackground = false, visibleItems = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  // Calculate item width based on container and visible items
  useEffect(() => {
    const updateItemWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculatedWidth = containerWidth / visibleItems;
        setItemWidth(calculatedWidth);
      }
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [visibleItems]);

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= images.length - visibleItems ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? images.length - visibleItems : prevIndex - 1
    );
  };

  return (
    <div 
      className={`carousel-container ${isBackground ? 'background-carousel' : ''}`}
      ref={containerRef}
    >
      <div 
        className="carousel-track"
        ref={carouselRef}
        style={{ 
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="carousel-slide"
            style={{ width: `${itemWidth}px` }}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`} 
              loading="lazy"
              className="carousel-image"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        className="carousel-arrow carousel-arrow-left" 
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button 
        className="carousel-arrow carousel-arrow-right" 
        onClick={goToNext}
        aria-label="Next slide"
      >
        &gt;
      </button>
    </div>
  );
};

export default ImageCarousel;