// src/pages/OurStory.js
import React from 'react';
import './OurStory.css';

const OurStoryPage = () => {
    return (
        <>
            {/* --- OUR STORY SECTION --- */}
            <section className="our-story-passion-origin">
                <div className="container">
                    <div className="story-content-wrapper">
                        <div className="story-text-column">
                            <h2>Where Every Moment Begins <br /><span className="allura-font">with Passion</span></h2>
                            <p>
                                At Jesah Events, we believe that life’s most beautiful moments deserve to be celebrated in unforgettable ways. Our journey began with a simple love for creating joy — turning everyday dreams into elegant realities. What started as a small passion project has grown into a trusted brand known for creativity, precision, and heartfelt service. From weddings and birthdays to baby showers and corporate gatherings, we pour our hearts into every detail to ensure that your celebration reflects who you are and what you cherish most. We meticulously craft every experience, ensuring seamless execution and memories that last a lifetime. Let us transform your vision into an exquisite reality.
                            </p>
                        </div>
                        <div className="story-images-column">
                            {/* UPDATED: Added specific classes story-img-1 and story-img-2 */}
                            <img src="https://i.pinimg.com/1200x/44/86/1a/44861aad69cf6168035bc3b7721e0415.jpg" alt="Random Image 1" className="story-thumbnail story-img-1" />
                            <img src="https://i.pinimg.com/736x/ff/6b/69/ff6b696d1c9e309081edf4e849433a81.jpg" alt="Random Image 2" className="story-thumbnail story-img-2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR MISSION SECTION --- */}
            <section className="our-mission-section">
                <div className="container">
                    <h2 className="mission-main-heading">Our Mission</h2>
                </div>
                {/* Images for Our Mission section - IDs added for specific positioning */}
                <div className="mission-full-width-images">
                    <img id="mission-img-1" src="https://i.pinimg.com/736x/03/a2/d8/03a2d8c07baf910e3f868e76fa91c29d.jpg" alt="Mission Image 1" className="mission-img-full-width" />
                    <img id="mission-img-2" src="https://i.pinimg.com/736x/63/de/3a/63de3a93ad459acf7e6d9ee0d5102aac.jpg" alt="Mission Image 2" className="mission-img-full-width" />
                    <img id="mission-img-3" src="https://i.pinimg.com/736x/b1/41/13/b1411349a6ad7dba8fdc98a1a3e260e5.jpg" alt="Mission Image 3" className="mission-img-full-width" />
                </div>
                <p className="mission-statement-text">
                    At Jesah Events, our mission is to transform your most cherished moments into meticulously crafted, unforgettable celebrations. We are dedicated to providing unparalleled planning and execution, ensuring every detail reflects your unique vision and personality.
                </p>
            </section>

            {/* --- WHY WE DO WHAT WE DO SECTION --- */}
            <section className="why-we-do-section">
                <div className="container">
                    <div className="why-content-wrapper">
                        <div className="why-text-column">
                            <h2>Why We Do What We Do</h2>
                            <p>
                                Behind every event is a story waiting to be told — of love, milestones, growth, and togetherness. We are more than event planners; we are memory makers, dream builders, as well as your biggest cheerleaders. Your joy is our purpose.
                            </p>
                            <button className="view-more-btn">View More</button>
                        </div>
                        <div className="why-images-column">
                            <img src="https://i.pinimg.com/736x/cc/fa/d5/ccfad55fa13f3126131e479f260c2c2a.jpg" alt="Why We Do Image 1" className="why-img why-img-1" />
                            <img src="https://i.pinimg.com/736x/84/9c/d5/849cd544d34f7bcc49c09c3fa7bcacb0.jpg" alt="Why We Do Image 2" className="why-img why-img-2" />
                            <img src="https://i.pinimg.com/736x/04/f5/60/04f5605ac68011c59980d5f5942b8b1b.jpg" alt="Why We Do Image 3" className="why-img why-img-3" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR PROMISE TO YOU SECTION --- */}
            <section className="our-promise-section">
                <div className="container">
                    <div className="promise-content-wrapper">
                        <div className="promise-text-column">
                            <h2>Our Promise to You</h2>
                            <p>When you choose Jesah Events, you’re not just booking a service. You’re gaining a committed partner who listens, understands, and brings your vision to life with style, elegance, and care.</p>
                        </div>
                        <div className="promise-image-column">
                            {/* Placeholder image. REMEMBER TO REPLACE THIS WITH YOUR ACTUAL IMAGE PATH. */}
                            <img src="https://i.pinimg.com/1200x/04/f5/60/04f5605ac68011c59980d5f5942b8b1b.jpg" alt="Our Promise" className="promise-img" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurStoryPage;