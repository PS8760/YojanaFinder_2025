import React, { useState, useCallback } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// --- SVG Loading Spinner ---
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-10 w-10 text-blue-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const Schemes = () => {
  // Consolidate all filter inputs into a single state object
  const [filters, setFilters] = useState({
    searchTerm: "",
    userDescription: "", // New state for the description box
    categoryFilter: "All",
    stateFilter: "All",
    age: "",
    caste: "All",
    profession: "All",
    gender: "All",
    standard: "All",
  });

  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // A single handler for all filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      if (name === "profession") {
        if (value !== "Entrepreneur") newFilters.categoryFilter = "All";
        if (value !== "Student") newFilters.standard = "All";
      }
      return newFilters;
    });
  };

  // Memoized search function to call the backend
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!showResults) setShowResults(true);

    try {
      const backendUrl = "http://localhost:8091/api/schemes";
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSchemes(data);
    } catch (err) {
      console.error("API call failed:", err);
      setError(
        err.message ||
          "Failed to fetch schemes. Please check your connection and try again."
      );
      setSchemes([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, showResults]);

  // Determine which input sections should be disabled for a better UX
  const isDescriptionActive = filters.userDescription.trim() !== "";
  const isSearchTermActive = filters.searchTerm.trim() !== "";
  const areFiltersActive =
    filters.age ||
    filters.gender !== "All" ||
    filters.profession !== "All" ||
    filters.caste !== "All" ||
    filters.stateFilter !== "All" ||
    filters.standard !== "All" ||
    filters.categoryFilter !== "All";

  // Static options for dropdowns
  const categories = [
    "All",
    "Agriculture",
    "Health",
    "Education",
    "Business",
    "Social Welfare",
  ];
  const states = [
    "All",
    "Central",
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
  ];
  const professions = [
    "All",
    "Student",
    "Entrepreneur",
    "Farmer",
    "Unorganized Worker",
  ];
  const castes = ["All", "General", "OBC", "SC", "ST"];
  const genders = ["All", "Male", "Female"];
  const standards = [
    "All",
    "Nursery",
    "School",
    "High School",
    "Undergraduation",
    "Postgraduation",
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Find Your Schemes with AI
            </h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
              Use one of the methods below to find relevant government schemes.
            </p>
          </div>

          {/* --- NEW: Description Textarea Section --- */}
          <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg">
            <label
              htmlFor="userDescription"
              className="block mb-2 font-semibold text-gray-700"
            >
              1. Describe Your Needs
            </label>
            <textarea
              id="userDescription"
              name="userDescription"
              rows="4"
              placeholder="e.g., 'I am a farmer in Maharashtra looking for a loan to buy a new tractor.'"
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
              value={filters.userDescription}
              onChange={handleFilterChange}
              disabled={isSearchTermActive || areFiltersActive}
            />
          </div>

          <p className="text-center text-gray-500 font-semibold my-6">OR</p>

          {/* Search by Name Section */}
          <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg">
            <label
              htmlFor="searchTerm"
              className="block mb-2 font-semibold text-gray-700"
            >
              2. Search by Name
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="e.g., Ayushman Bharat"
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              disabled={isDescriptionActive || areFiltersActive}
            />
          </div>

          <p className="text-center text-gray-500 font-semibold my-6">OR</p>

          {/* Filter Options Section */}
          <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              3. Filter by Criteria
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Your Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="e.g., 25"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.age}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="profession"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Profession
                </label>
                <select
                  id="profession"
                  name="profession"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.profession}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {professions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="caste"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Caste
                </label>
                <select
                  id="caste"
                  name="caste"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.caste}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {castes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="stateFilter"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  State/Central
                </label>
                <select
                  id="stateFilter"
                  name="stateFilter"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.stateFilter}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {states.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
              {filters.profession === "Entrepreneur" && (
                <div className="transition-opacity duration-300">
                  <label
                    htmlFor="categoryFilter"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Business Category
                  </label>
                  <select
                    id="categoryFilter"
                    name="categoryFilter"
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                    value={filters.categoryFilter}
                    onChange={handleFilterChange}
                    disabled={isDescriptionActive || isSearchTermActive}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {filters.profession === "Student" && (
                <div className="transition-opacity duration-300">
                  <label
                    htmlFor="standard"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Standard
                  </label>
                  <select
                    id="standard"
                    name="standard"
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                    value={filters.standard}
                    onChange={handleFilterChange}
                    disabled={isDescriptionActive || isSearchTermActive}
                  >
                    {standards.map((std) => (
                      <option key={std} value={std}>
                        {std}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="mb-12 text-center">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching with AI..." : "Find Schemes"}
            </button>
          </div>

          {showResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-lg">
                  <LoadingSpinner />
                  <p className="mt-4 text-gray-600 text-lg">
                    Our AI is finding the best schemes for you...
                  </p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12 bg-red-50 border border-red-200 rounded-2xl shadow-lg">
                  <p className="text-red-600 text-lg">{error}</p>
                </div>
              ) : schemes.length > 0 ? (
                schemes.map((scheme, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <h2 className="text-2xl font-bold text-blue-500 mb-3">
                      {scheme.name}
                    </h2>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {scheme.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>Category:</strong> {scheme.category}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>Eligibility:</strong>{" "}
                        {scheme.eligibility_summary}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>Department:</strong> {scheme.department}
                      </p>
                      {scheme.website_url && (
                        <a
                          href={scheme.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-500 hover:text-blue-700 transition"
                        >
                          Learn More &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-lg">
                  <p className="text-gray-600 text-lg">
                    No schemes found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Schemes;
