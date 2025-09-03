import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// --- SVG Icon Components ---
const IconMission = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
    />
  </svg>
);

const IconVision = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const AboutUs = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900">
            About{" "}
            <span className="text-blue-500 font-stretch-125% font-light">
              Yojana Finder
            </span>
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
            Empowering every Indian citizen by making information about
            government welfare schemes accessible, understandable, and
            actionable.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Our Mission Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <IconMission />
            <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To simplify the discovery and application process for government
              schemes, ensuring that every eligible citizen can easily access
              the benefits they are entitled to. We aim to bridge the
              information gap with a user-friendly and transparent platform.
            </p>
          </div>

          {/* Our Vision Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <IconVision />
            <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To be the most trusted and comprehensive digital resource for
              public welfare information in India, fostering a future where
              technology empowers financial inclusion, social security, and
              upward mobility for all citizens.
            </p>
          </div>
        </div>

        {/* Team Section Placeholder */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are a passionate team of developers and public policy enthusiasts
            dedicated to making a difference.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
