import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// --- SVG Icon Components ---
const IconMail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-blue-500 mr-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const IconPhone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-blue-500 mr-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const IconLocation = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-blue-500 mr-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8091/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to submit form. Try again later.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-stretch-125% font-light text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          {/* Left Side: Contact Information */}
          <div className="md:w-1/2 p-10 bg-gray-900">
            <h2 className="text-3xl font-stretch-125% mb-6 text-white">
              Contact Information
            </h2>
            <p className="mb-10 text-gray-400">
              Fill up the form and our team will get back to you within 24
              hours.
            </p>

            <ul className="space-y-8">
              <li className="flex items-center">
                <IconPhone />
                <span className="text-gray-300">+91 9004677177</span>
              </li>
              <li className="flex items-center">
                <IconMail />
                <span className="text-gray-300">23104115@apsit.edu.in</span>
              </li>
              <li className="flex items-center">
                <IconLocation />
                <span className="text-gray-300">
                  {" "}
                  Mumbai, Maharashtra, India
                </span>
              </li>
            </ul>
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:w-1/2 p-10">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Abhishek Jamdade"
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
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
                  placeholder="yojana@example.com"
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your message..."
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-lg shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
