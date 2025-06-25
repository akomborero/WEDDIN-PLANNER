import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPackages from "./pages/EventPackages"; // <--- ADDED THIS IMPORT

function App() {
  return (
    <Router>
      <Navbar /> {/* Your Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-packages" element={<EventPackages />} /> {/* <--- ADDED THIS ROUTE */}
        {/* Add other routes for other pages (e.g., /our-story, /contact, /our-testimonials) */}
      </Routes>
      {/* If your footer is a separate component, it would typically be rendered here, outside <Routes> */}
    </Router>
  );
}

export default App;