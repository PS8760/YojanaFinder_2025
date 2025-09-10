import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"; // Import auth from your Firebase config
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

/**
 * A component that wraps content and only displays it if a user is authenticated.
 * If the user is not logged in, it shows a prompt to log in or register.
 */
const AuthCheck = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // Firebase's listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthenticating(false); // Authentication check is complete
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Display a loading message while Firebase checks the auth status
  if (isAuthenticating) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // If the user is logged in, render the protected content
  if (user) {
    return <>{children}</>;
  }

  // If no user is logged in, display the login prompt
  return (
    <>
      <Navbar />
      <div className="container mx-auto text-center py-20">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            You must be logged in to view and search for schemes. Please log in
            or create an account to continue.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthCheck;
