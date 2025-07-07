import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPackages from "./pages/EventPackages";
import WeddingDashboard from "./pages/WeddingDashboard";
import OurStory from "./pages/OurStory"; // <--- NEW: Import your OurStory component
// ... (imports)
import Footer from './components/Footer'; // Don't forget to import it!

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
      </Routes>
      <Footer /> {/* Add the Footer component here */}
    </Router>
  );
}

export default App;