import React, { useState, useCallback } from "react";

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
  // --- OPTIMIZATION 1: Consolidate all filter inputs into a single state object ---
  const [filters, setFilters] = useState({
    searchTerm: "",
    categoryFilter: "All",
    stateFilter: "All",
    age: "",
    caste: "All",
    profession: "All",
    gender: "All",
  });

  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // --- OPTIMIZATION 2: Create a single handler for all filter changes ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // --- OPTIMIZATION 3: Use useCallback to memoize the search function ---
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!showResults) setShowResults(true);

    try {
      // The frontend only needs to know its own backend's address
      const backendUrl = "http://localhost:3010/api/schemes";

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the consolidated filters object as the body
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        // Get more detailed error from backend if available
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
  }, [filters, showResults]); // Dependency array ensures the function is recreated only when filters change

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
    "Farmer",
    "Student",
    "Unorganized Worker",
    "Entrepreneur",
  ];
  const castes = ["All", "General", "OBC", "SC", "ST"];
  const genders = ["All", "Male", "Female"];

  return (
    <div
      className={`container mx-auto px-6 py-16 transition-all duration-500 ${
        !showResults
          ? "flex items-center justify-center min-h-[calc(100vh-200px)]"
          : ""
      }`}
    >
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Find Your Schemes with AI
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
            Fill in your details below, and our AI will find the most relevant
            government schemes for you.
          </p>
        </div>

        {/* Filter and Search Form */}
        <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <label
              htmlFor="searchTerm"
              className="block mb-2 font-semibold text-gray-700"
            >
              Search by Name
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="e.g., Ayushman Bharat"
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.searchTerm}
              onChange={handleFilterChange}
            />
          </div>
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
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.age}
              onChange={handleFilterChange}
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
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.gender}
              onChange={handleFilterChange}
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
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.profession}
              onChange={handleFilterChange}
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
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.caste}
              onChange={handleFilterChange}
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
              htmlFor="categoryFilter"
              className="block mb-2 font-semibold text-gray-700"
            >
              Scheme Category
            </label>
            <select
              id="categoryFilter"
              name="categoryFilter"
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.categoryFilter}
              onChange={handleFilterChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
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
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.stateFilter}
              onChange={handleFilterChange}
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Searching with AI..."
                : showResults
                ? "Update Results"
                : "Find Schemes"}
            </button>
          </div>
        </div>

        {/* Conditionally Rendered Schemes Grid */}
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
                      <strong>Eligibility:</strong> {scheme.eligibility_summary}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      <strong>Department:</strong> {scheme.department}
                    </p>
                    <a
                      href="#"
                      className="font-bold text-blue-500 hover:text-blue-700 transition"
                    >
                      Learn More &rarr;
                    </a>
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
  );
};

export default Schemes;
