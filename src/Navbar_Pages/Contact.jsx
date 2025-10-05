import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { submitContactForm } from "../utils/api";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import { useLanguage } from "../utils/i18n.jsx";

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
  const { t } = useLanguage();
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const data = await submitContactForm(formData);
      setSubmitStatus("success");
      setStatusMessage(data.message || t('contactSuccess'));
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(error.message || t('errorOccurred'));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-amber-50">
        <Navbar />
      </div>
      <div className="bg-amber-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-stretch-125% font-light text-gray-900">
              {t('contactTitle')}
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              {t('contactDescription')}
            </p>
          </div>

          {/* Main Content Area */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
            {/* Left Side: Contact Information */}
            <div className="md:w-1/2 p-6 md:p-8 bg-gray-900">
              <h2 className="text-2xl md:text-3xl font-stretch-125% mb-4 text-white">
                {t('contactInfo')}
              </h2>
              <p className="mb-8 text-gray-400 text-sm md:text-base">
                {t('contactSubtitle')}
              </p>

              <ul className="space-y-6">
                <li className="flex items-center">
                  <IconPhone />
                  <span className="text-gray-300 text-sm md:text-base">+91 9004677177</span>
                </li>
                <li className="flex items-center">
                  <IconMail />
                  <span className="text-gray-300 text-sm md:text-base">23104115@apsit.edu.in</span>
                </li>
                <li className="flex items-center">
                  <IconLocation />
                  <span className="text-gray-300 text-sm md:text-base">
                    Mumbai, Maharashtra, India
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Side: Contact Form */}
            <div className="md:w-1/2 p-6 md:p-8">
              {submitStatus === "success" && (
                <div className="mb-6">
                  <SuccessMessage
                    message={statusMessage}
                    onClose={() => setSubmitStatus(null)}
                  />
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-6">
                  <ErrorMessage
                    message={statusMessage}
                    onRetry={() => setSubmitStatus(null)}
                  />
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Abhishek Jamdade"
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yojana@example.com"
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your message..."
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 text-sm md:text-base shadow-md hover:shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('loading') : t('sendMessage')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;