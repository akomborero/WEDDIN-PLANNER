import React from 'react';
import './Testimonials.css'; // Make sure this CSS file exists for styling

function Testimonials() {
  return (
    <div className="testimonials-page">
      {/* --- NEW: INTRODUCTORY TEXT SECTION FOR TESTIMONIALS --- */}
   <section className="testimonials-intro-text-section">
  <div className="testimonials-grid">
    {/* Left: Intro Text */}
    <div className="testimonials-intro-left">
      <p className="testimonials-intro-line-1">Jesah Events is for you.</p>
      <p className="testimonials-intro-line-2">Trusted by thousands of people all across the globe.</p>
      <p className="testimonials-intro-line-3">
        Since its launch, we have been dedicated to transforming ordinary moments into extraordinary memories, meticulously crafting every detail to ensure your celebration is as unique and beautiful as your story. Our commitment to excellence shines through in every event we orchestrate.
      </p>
      <div className="join-now-button-wrapper">
        <button className="join-now-button">
          Join Now <span className="arrow">→</span>
        </button>
      </div>
    </div>

    {/* Right: Testimonial Cards */}
  <div className="testimonials-intro-right">
  <div className="testimonial-card-row">
    <div className="testimonial-card">
      <p className="testimonial-text">"Jesah Events made our day magical! Everything was flawless."</p>
       <img
      src="https://i.pinimg.com/1200x/4f/d2/e5/4fd2e597215127a81398f5e79732a7eb.jpg" // Replace with real photo URL
      alt="Mike & Liza"
      className="author-photo"
    />
      <p className="testimonial-author"> Sarah & Tawanda</p>
      
    </div>
    <div className="testimonial-card">
      <p className="testimonial-text">"Professional, elegant, and stress-free planning. Highly recommended!"</p>
       <img
      src="https://i.pinimg.com/736x/83/be/c9/83bec9c8ae37548427d0fcf29740ca3d.jpg" // Replace with real photo URL
      alt="Mike & Liza"
      className="author-photo"
    />
      <p className="testimonial-author">Thandiwe N.</p>
    </div>
   <div className="testimonial-card highlight-card">
  
  <p className="testimonial-text">"Incredible attention to detail. Truly unforgettable!"</p>
  <div className="testimonial-author-section">
    <img
      src="https://i.pinimg.com/736x/99/0c/9f/990c9f0baaf0501f0132abbd9cc9a16d.jpg" // Replace with real photo URL
      alt="Mike & Liza"
      className="author-photo"
    />
    <p className="testimonial-author">Mike & Liza</p>
  </div>
</div>

    <div className="testimonial-card">
      <p className="testimonial-text">"Jesah turned our vision into a dream come true."</p>
       <img
      src="https://i.pinimg.com/736x/e4/d1/44/e4d144088829d544a9a1ee7ff1c6f8ac.jpg" // Replace with real photo URL
      alt="Mike & Liza"
      className="author-photo"
    />
      <p className="testimonial-author">Rudo M.</p>
    </div>
  </div>
</div>

  </div>
</section>



<section className="stats-section">
  <div className="container stats-container">
    <div className="stat-item">
      <span className="stat-number">10K</span>
      <span className="stat-label">users active in a month</span>
      <div className="stat-dot blue-dot"></div>
    </div>
    <div className="stat-item">
      <span className="stat-number">#1</span>
      <span className="stat-label">product of the day on Product Hunt</span>
      <div className="stat-dot yellow-dot"></div>
    </div>
    <div className="stat-item">
      <span className="stat-number">$25M</span>
      <span className="stat-label">total value deal</span>
      <div className="stat-dot green-dot"></div>
    </div>
  </div>
</section>


<section className="goal-section">
  <div className="container goal-container">
    <p className="section-label">Testimonials</p>
    <h1 className="section-heading">What is our goal</h1>

    <div className="goal-cards">
      <div className="goal-card">
        <img src="https://i.pinimg.com/736x/e4/d1/44/e4d144088829d544a9a1ee7ff1c6f8ac.jpg" alt="Funding" className="goal-icon" />
       
        <p>
          We've successfully secured funding to scale Jesah Events, improve our platform, and reach a wider audience across the globe.
        </p>
      </div>
      <div className="goal-card">
        <img src="https://i.pinimg.com/736x/e4/d1/44/e4d144088829d544a9a1ee7ff1c6f8ac.jpg" alt="Partnership" className="goal-icon" />
       
        <p>
          We aim to build strong partnerships with venues, vendors, and creatives to provide a seamless experience for our clients.
        </p>
      </div>
      <div className="goal-card">
        <img src="https://i.pinimg.com/736x/e4/d1/44/e4d144088829d544a9a1ee7ff1c6f8ac.jpg" alt="Expansion" className="goal-icon" />
       
        <p>
          Our goal is to expand our services worldwide, bringing Jesah's touch of elegance to events in every corner of the globe.
        </p>
      </div>
    </div>
  </div>
</section>





      {/* More sections for Testimonials will go here, like the grid of testimonials */}

    </div>
  );
}

export default Testimonials;