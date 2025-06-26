import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPackages from "./pages/EventPackages";
import WeddingDashboard from "./pages/WeddingDashboard"; // <--- NEW IMPORT for the Dashboard!
// Import other pages as you create them:
// import OurStory from "./pages/OurStory";
// import Testimonials from "./pages/Testimonials";
// import Services from "./pages/Services";
// import BookNow from "./pages/BookNow";

function App() {
  return (
    <Router>
      <Navbar /> {/* Your Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-packages" element={<EventPackages />} />
        <Route path="/dashboard" element={<WeddingDashboard />} /> {/* <--- NEW ROUTE for the Dashboard! */}

        {/* Add other routes for other pages: */}
        {/* <Route path="/our-story" element={<OurStory />} /> */}
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/book-now" element={<BookNow />} /> */}
      </Routes>
      {/* If your footer is a separate component, it would typically be rendered here, outside <Routes> */}
    </Router>
  );
}

export default App;