import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// --- Firebase Imports ---
import { auth, db } from "../../firebase/firebaseConfig"; // Import auth and firestore from your config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import functions to write to Firestore
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Step 2: Save the additional user details to your Firestore database
      // A new document is created in the "users" collection with the user's UID as the ID.
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        location: formData.location,
        gender: formData.gender,
        createdAt: new Date(), // Add a timestamp for when the account was created
      });

      console.log("Successfully created user and saved data to Firestore");
      alert("Account created successfully! Please proceed to log in.");
      navigate("/login"); // Redirect the user to the login page on success
    } catch (firebaseError) {
      console.error(
        "Firebase registration error:",
        firebaseError.code,
        firebaseError.message
      );
      // Provide user-friendly error messages based on the error code
      if (firebaseError.code === "auth/email-already-in-use") {
        setError(
          "This email address is already registered. Please log in or use a different email."
        );
      } else {
        setError(
          "Failed to create an account. Please check your details and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          {/* Left Side: Welcome & Branding */}
          <div className="md:w-1/2 p-10 bg-gray-900 text-white flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Create Your Account</h1>
            <p className="text-gray-400 mb-8">
              Join us to easily find and apply for government schemes that can
              help you succeed.
            </p>
            <div className="text-3xl text-blue-500 font-light">
              <span className="font-stretch-125%">Yojana Finder</span>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Register
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 font-semibold text-gray-800"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Abhishek"
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 font-semibold text-gray-800"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Jamdade"
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
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
                  placeholder="you@example.com"
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
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Mumbai, Maharashtra"
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

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
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
