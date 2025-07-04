import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPackages from "./pages/EventPackages";
import WeddingDashboard from "./pages/WeddingDashboard";
import OurStory from "./pages/OurStory"; // <--- NEW: Import your OurStory component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-packages" element={<EventPackages />} />
        <Route path="/dashboard" element={<WeddingDashboard />} />
        {/* NEW: Add a route for your OurStory page */}
        <Route path="/our-story" element={<OurStory />} />
      </Routes>
    </Router>
  );
}

export default App;