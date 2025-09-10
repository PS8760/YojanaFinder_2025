import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// --- Firebase Imports ---
import { auth } from "../../firebase/firebaseConfig"; // Import the auth instance from your firebase.js
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the login function
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook for redirection after successful login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    setIsLoading(true); // Start loading state

    try {
      // Use the imported Firebase function to sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("Successfully logged in user:", user.uid);

      alert("Login successful! Redirecting to the schemes page...");
      navigate("/schemes"); // Redirect user to the schemes page on success
    } catch (firebaseError) {
      console.error(
        "Firebase login error:",
        firebaseError.code,
        firebaseError.message
      );
      // Provide a user-friendly error message
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          {/* Left Side: Welcome & Branding */}
          <div className="md:w-1/2 p-10 bg-gray-900 text-white flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-gray-400 mb-8">
              Log in to access your dashboard and discover schemes tailored just
              for you.
            </p>
            <div className="text-3xl text-blue-500 font-light">
              <span className="font-stretch-125%">Yojana Finder</span>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yojana@example.com"
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Display Firebase errors here */}
              {error && (
                <p className="text-red-500 text-sm text-center -my-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
