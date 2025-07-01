import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPackages from "./pages/EventPackages";
import WeddingDashboard from "./pages/WeddingDashboard"; // <--- NEW IMPORT for the Dashboard!

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-packages" element={<EventPackages />} />
        <Route path="/dashboard" element={<WeddingDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;