import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPackages from "./pages/EventPackages";
import WeddingDashboard from "./pages/WeddingDashboard";
import OurStory from "./pages/OurStory";
import Testimonials from "./pages/Testimonials"; // <--- NEW: Import your Testimonials component
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/event-packages" element={<EventPackages />} />
        <Route path="/dashboard" element={<WeddingDashboard />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/testimonials" element={<Testimonials />} /> {/* <--- NEW: Add the route for Testimonials */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;