import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./utils/i18n.jsx";
import AboutUs from "./Navbar_Pages/AboutUs";
import Contact from "./Navbar_Pages/Contact";
import Schemes from "./Navbar_Pages/Schemes";
import Login from "./Navbar_Pages/Login";
import Home from "./Home";
import Register from "./Navbar_Pages/Register";
import Profile from "./Navbar_Pages/Profile";
import ProfileEdit from "./Navbar_Pages/ProfileEdit";
import AuthCheck from "./Navbar_Pages/AuthCheck";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen w-full bg-amber-50">
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
            <Route
              path="/profile"
              element={
                <AuthCheck>
                  <Profile />
                </AuthCheck>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <AuthCheck>
                  <ProfileEdit />
                </AuthCheck>
              }
            />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
