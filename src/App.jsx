import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./Navbar_Pages/AboutUs";
import Contact from "./Navbar_Pages/Contact";
import Schemes from "./Navbar_Pages/Schemes";
import Login from "./Navbar_Pages/Login";
import Home from "./Home";
import Register from "./Navbar_Pages/Register";
import AuthCheck from "./Navbar_Pages/AuthCheck";

const App = () => {
  return (
    <Router>
      <div className="h-screen w-screen bg-amber-50">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/schemes"
            element={
              <AuthCheck>
                <Schemes />
              </AuthCheck>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
