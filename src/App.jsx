// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPackages from "./pages/EventPackages";
import Dashboard from "./pages/Dashboard"; // Make sure this is 'Dashboard'
import OurStory from "./pages/OurStory";
import Testimonials from "./pages/Testimonials";
import PrePlannedPackageDetails from "./components/PrePlannedPackageDetails";
import LuxuryPackageDetails from './components/LuxuryPackageDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/event-packages" element={<EventPackages />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* This route points to your new Dashboard */}
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/testimonials" element={<Testimonials />} />

        {/* IMPORTANT: Place the more specific LuxuryPackageDetails route FIRST */}
        <Route path="/pre-planned/luxury" element={<LuxuryPackageDetails />} />

        {/* Then, place the more general, dynamic route */}
        <Route path="/pre-planned/:packageId" element={<PrePlannedPackageDetails />} />

        {/* Optional: A catch-all route for 404 Not Found pages */}
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;