import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// --- Firebase Imports ---
import { auth } from "../../../firebase/firebaseConfig"; // Adjust this path to your firebase.js config file
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  // State to hold the current user's authentication status
  const [user, setUser] = useState(null);

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // If user is logged in, currentUser is an object; otherwise, it's null
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // GSAP animation for link underlines
  useEffect(() => {
    if (window.gsap && navRef.current) {
      const gsap = window.gsap;
      // We select only the links, not the logout button
      const links = gsap.utils.toArray(".nav-link", navRef.current);

      links.forEach((link) => {
        const underline = link.querySelector(".underline");
        // ... (GSAP animation code remains the same)
        link.addEventListener("mouseenter", () => {
          gsap.to(underline, {
            width: "100%",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(underline, {
            width: "0%",
            duration: 0.3,
            ease: "power2.inOut",
          });
        });
      });
    }
  }, [user]); // Re-run GSAP setup if the user logs in/out, to correctly target links

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="relative top-4 h-20 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-2xl shadow-lg">
        {/* Logo / Brand Name */}
        <div className="font-stretch-125% text-3xl text-blue-500">
          <Link
            to="/"
            className=" hover:text-blue-700 transition-colors duration-300"
          >
            Yojana Finder
          </Link>
        </div>

        {/* Navigation Links */}
        <nav
          ref={navRef}
          className="flex items-center font-stretch-125% text-xl space-x-12"
        >
          <Link
            to="/"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            Home
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700"></span>
          </Link>
          <Link
            to="/schemes"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            Schemes
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700"></span>
          </Link>
          <Link
            to="/aboutus"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            About Us
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700"></span>
          </Link>
          <Link
            to="/contact"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            Contact
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700"></span>
          </Link>

          {/* --- Conditional Auth Link/Button --- */}
          {user ? (
            // If a user is logged in, show the Logout button
            <button
              onClick={handleLogout}
              className="relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            // If no user is logged in, show the Login/Register link
            <Link
              to="/login"
              className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              Login/Register
              <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700"></span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
