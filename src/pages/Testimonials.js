import React from 'react';
import './Testimonials.css'; // Make sure this CSS file exists for styling

function Testimonials() {
  return (
    <div className="testimonials-page">
      {/* --- NEW: INTRODUCTORY TEXT SECTION FOR TESTIMONIALS --- */}
      <section className="testimonials-intro-text-section">
        <div className="container">
          <p className="testimonials-intro-line-1">Jesah Events is for you.</p>
          <p className="testimonials-intro-line-2">Trusted by thousands of people all across the globe.</p>
          <p className="testimonials-intro-line-3">Since its launch, we have been dedicated to transforming ordinary moments into extraordinary memories, meticulously crafting every detail to ensure your celebration is as unique and beautiful as your story. Our commitment to excellence shines through in every event we orchestrate.</p>
        </div>
      </section>

      {/* More sections for Testimonials will go here, like the grid of testimonials */}

    </div>
  );
}

export default Testimonials;