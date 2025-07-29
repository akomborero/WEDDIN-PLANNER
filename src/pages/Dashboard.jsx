// src/pages/Dashboard.jsx

import React from 'react';
import AIChatAssistant from '../components/AIChatAssistant'; // Adjust path if your components folder is structured differently
import './Dashboard.css'; // Assuming you have a CSS file for your Dashboard page

function Dashboard() {
  return (
    <div className="dashboard-page-container">
      <h1>Your Personalized Wedding Dashboard</h1>
      <p>Welcome to your Basic Planner! Here are your essential tools and your new AI assistant.</p>

      {/* Existing Dashboard content can go here */}
      <div className="dashboard-sections">
        <div className="checklist-section">
          <h2>My Checklist</h2>
          <ul>
            <li>✔ Set wedding date</li>
            <li>✔ Choose wedding theme</li>
            <li>⬜ Create guest list (up to 50)</li>
            <li>⬜ Research local vendors</li>
            <li>⬜ Set initial budget</li>
            {/* Add more basic planner features here */}
          </ul>
        </div>

        {/* This is where the AI Chat Assistant is integrated */}
        <div className="ai-assistant-section">
          <AIChatAssistant />
        </div>

        {/* You can add more dashboard features or sections here */}
      </div>

      <p style={{marginTop: '30px', textAlign: 'center'}}>
        Explore our premium packages for advanced features and full wedding planning services!
      </p>
    </div>
  );
}

export default Dashboard;