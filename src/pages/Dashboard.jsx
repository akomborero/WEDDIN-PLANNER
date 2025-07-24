// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Dashboard.css'; // Ensure this points to your Dashboard.css

// Mock components for demonstration. Replace these with your actual components.
const PlaceholderChecklist = () => (
    <div className="dashboard-tool-card">
        <h3>Wedding Checklist</h3>
        <p>Your step-by-step guide to planning. Start with venue tours, vendor selection, and guest list finalization!</p>
        <Link to="/checklist" className="tool-link">View Full Checklist &rarr;</Link>
    </div>
);
const PlaceholderBudgetTracker = () => (
    <div className="dashboard-tool-card">
        <h3>Budget Tracker</h3>
        <p>Keep track of all your wedding expenses and stay confidently within your financial plan.</p>
        <Link to="/budget" className="tool-link">Manage Budget &rarr;</Link>
    </div>
);
const PlaceholderGuestList = () => (
    <div className="dashboard-tool-card">
        <h3>Guest List Manager</h3>
        <p>Organize your guests, track RSVPs, manage dietary restrictions, and plan seating arrangements.</p>
        <Link to="/guests" className="tool-link">Manage Guests &rarr;</Link>
    </div>
);
const PlaceholderVendorManagement = () => (
    <div className="dashboard-tool-card">
        <h3>Vendor Management</h3>
        <p>Access your booked luxury vendors and discover new exclusive partners for your event.</p>
        <Link to="/vendors" className="tool-link">View Vendor List &rarr;</Link>
    </div>
);


const Dashboard = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("Future"); // Default if no login/data
  const [partnerName, setPartnerName] = useState("Kayden"); // Default if no login/data
  const [bookedWedding, setBookedWedding] = useState(null); // Stores booked package details

  useEffect(() => {
    // 1. Try to get user names from localStorage (simulated login/registration)
    // In a real app, this would come from an Auth Context or Redux store
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.isLoggedIn) {
      setUserName(storedUser.firstName || "Future");
      // Prioritize partnerLastName if available, otherwise fallback to lastName
      setPartnerName(storedUser.partnerLastName || storedUser.lastName || "Kayden");
    } else {
      // Fallback if no user is logged in, use default 'Mr. & Mrs. Kayden'
      setUserName("Mr.");
      setPartnerName("Kayden");
    }

    // 2. Check for newly booked wedding package from navigation state
    if (location.state && location.state.bookedLuxury) {
      const { packageName, lastName } = location.state;
      const newBookingDetails = {
        name: packageName,
        date: "To Be Scheduled", // Placeholder, user can update this later
        venue: "Your Elite Venue", // Placeholder
        status: "Booking Confirmed - Next: Consultation",
        coupleLastName: lastName || "Kayden" // Use last name from state or fallback
      };
      setBookedWedding(newBookingDetails);
      // Store in local storage for persistence across sessions
      localStorage.setItem('currentWeddingBooking', JSON.stringify(newBookingDetails));
      // Update partnerName with the last name from the booking for consistency
      if (lastName) setPartnerName(lastName);

    } else {
      // 3. If not new booking, try to load from local storage
      const savedBooking = localStorage.getItem('currentWeddingBooking');
      if (savedBooking) {
        setBookedWedding(JSON.parse(savedBooking));
      }
    }
  }, [location.state]); // Dependency array: re-run if navigation state changes

  const getCoupleNames = () => {
    // If a wedding is booked and has a specific coupleLastName
    if (bookedWedding && bookedWedding.coupleLastName && bookedWedding.coupleLastName !== "Kayden") {
      return `Mr. & Mrs. ${bookedWedding.coupleLastName}`;
    }
    // If user is logged in and we have distinct names
    if (userName && userName !== "Mr." && partnerName && partnerName !== "Kayden") {
        return `${userName} & ${partnerName}`;
    }
    // Default fallback
    return `Mr. & Mrs. ${partnerName}`;
  };


  return (
    <div className="wedding-dashboard-page">
      {/* --- START: Dynamic Dashboard Hero/Welcome Section --- */}
      <section className="dashboard-hero-section">
        {/* Using a video background or an elegant static image for the dashboard hero */}
        <video className="hero-video-background" autoPlay loop muted playsInline>
          <source src="https://videos.pexels.com/video-files/27979649/12279936_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3122106/3122106-hd_1920_1080_25fps.webm" type="video/webm" />
          {/* Fallback image for browsers that don't support video or slow connections */}
          <img src="https://images.pexels.com/photos/3122106/pexels-photo-3122106.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Wedding couple"
                loading="lazy" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-bg-overlay"></div>
        <div className="hero-content-wrapper">
          {bookedWedding ? (
            <>
              <h1 className="hero-main-title">
                Welcome, <span className="hero-names">{getCoupleNames()}!</span>
              </h1>
              <div className="hero-divider"></div>
              <h2 className="hero-inspire">
                Your **{bookedWedding.name}** is Confirmed!
              </h2>
              <p className="hero-subtext">
                **Status:** {bookedWedding.status} <br/>
                **Venue:** {bookedWedding.venue} <br/>
                **Date:** {bookedWedding.date}
              </p>
              <div className="hero-action-buttons">
                <Link to="/contact" className="btn primary-btn">Schedule Initial Consultation</Link>
                <Link to="/vendors" className="btn secondary-btn">Meet Your Vendors</Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="hero-main-title">
                Welcome, <span className="hero-names">{getCoupleNames()}!</span>
              </h1>
              <div className="hero-divider"></div>
              <h2 className="hero-inspire">
                Your journey as **future newlyweds** begins here.
              </h2>
              <p className="hero-subtext">
                Explore our tailored packages, designed to bring your unique wedding vision to life,
                from essential planning tools to all-inclusive celebrations.
              </p>
               <div className="hero-action-buttons">
                 <Link to="/event-packages" className="btn primary-btn">Explore Packages</Link>
               </div>
            </>
          )}
        </div>
      </section>
      {/* --- END: Dynamic Dashboard Hero/Welcome Section --- */}

      <div className="section-spacer"></div>

      {/* Other Dashboard Content - This will act as the planning tools */}
      <section className="dashboard-content-area">
        <div className="container">
          {bookedWedding ? (
            <>
              <h2 className="section-title">Your Wedding Planning Hub</h2>
              <p className="section-description">
                Here are the tools to help you plan your **{bookedWedding.name}**.
              </p>
              <div className="dashboard-tools-grid">
                <PlaceholderChecklist />
                <PlaceholderBudgetTracker />
                <PlaceholderGuestList />
                <PlaceholderVendorManagement />
                {/* Add more specific tools for booked weddings here */}
              </div>
            </>
          ) : (
            <>
              <h2 className="section-title">Start Your Planning Journey</h2>
              <p className="section-description">
                Ready to plan? Select a package to unlock your personalized planning tools.
              </p>
              <div className="dashboard-tools-grid">
                <PlaceholderChecklist /> {/* Show basic checklist even without a booked package */}
                {/* You might show limited features or samples if no package is booked */}
              </div>
              <div style={{textAlign: 'center', marginTop: '40px'}}>
                 <Link to="/event-packages" className="btn btn-luxury btn-lg">Browse All Packages</Link>
              </div>
            </>
          )}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;