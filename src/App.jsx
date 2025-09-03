import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./Navbar_Pages/AboutUs";
import Contact from "./Navbar_Pages/Contact";
import Schemes from "./Navbar_Pages/Schemes";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <div className="h-screen w-screen bg-amber-50">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schemes" element={<Schemes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
