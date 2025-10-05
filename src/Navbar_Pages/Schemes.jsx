import { useState, useCallback } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { searchSchemes } from "../utils/api";
import SchemeDetailsModal from "../components/SchemeDetailsModal";
import SchemeCard from "../components/SchemeCard.jsx";
import { useLanguage } from "../utils/i18n.jsx";
import { processSchemesForDisplay } from "../utils/schemeProcessor.js";

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
  const { t, currentLanguage } = useLanguage();

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
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      // Add language to filters for multilingual support
      const filtersWithLanguage = { ...filters, language: currentLanguage };
      const data = await searchSchemes(filtersWithLanguage);

      // Process schemes for proper multilingual display
      const processedSchemes = processSchemesForDisplay(data, currentLanguage);
      setSchemes(processedSchemes);
    } catch (err) {
      console.error("API call failed:", err);
      setError(
        err.message ||
        t('errorOccurred') ||
        "Failed to fetch schemes. Please check your connection and try again."
      );
      setSchemes([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, showResults, currentLanguage, t]);

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

  // Multilingual options for dropdowns
  const getDropdownOptions = () => {
    return {
      categories: [
        { value: "All", label: t('all') },
        { value: "Agriculture", label: t('agriculture') },
        { value: "Health", label: t('health') },
        { value: "Education", label: t('education') },
        { value: "Business", label: t('business') },
        { value: "Social Welfare", label: t('socialWelfare') },
      ],
      states: [
        { value: "All", label: t('all') },
        { value: "Central", label: t('central') },
        { value: "Maharashtra", label: t('maharashtra') },
        { value: "Delhi", label: t('delhi') },
        { value: "Karnataka", label: t('karnataka') },
        { value: "Tamil Nadu", label: t('tamilNadu') },
      ],
      professions: [
        { value: "All", label: t('all') },
        { value: "Student", label: t('student') },
        { value: "Entrepreneur", label: t('entrepreneur') },
        { value: "Farmer", label: t('farmer') },
        { value: "Unorganized Worker", label: t('unorganizedWorker') },
      ],
      castes: [
        { value: "All", label: t('all') },
        { value: "General", label: t('general') },
        { value: "OBC", label: t('obc') },
        { value: "SC", label: t('sc') },
        { value: "ST", label: t('st') },
      ],
      genders: [
        { value: "All", label: t('all') },
        { value: "Male", label: t('male') },
        { value: "Female", label: t('female') },
      ],
      standards: [
        { value: "All", label: t('all') },
        { value: "Nursery", label: t('nursery') },
        { value: "School", label: t('school') },
        { value: "High School", label: t('highSchool') },
        { value: "Undergraduation", label: t('undergraduation') },
        { value: "Postgraduation", label: t('postgraduation') },
      ]
    };
  };

  const dropdownOptions = getDropdownOptions();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t('findSchemesAI')}
            </h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
              {t('schemesPageSubtitle')}
            </p>
          </div>

          {/* Enhanced Description Section */}
          <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                1
              </div>
              <label
                htmlFor="userDescription"
                className="text-lg font-semibold text-gray-700"
              >
                {t('describeNeeds')}
              </label>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t('describeNeedsHelp')}
            </p>
            <textarea
              id="userDescription"
              name="userDescription"
              rows="5"
              placeholder={t('describeNeedsPlaceholder')}
              className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
              value={filters.userDescription}
              onChange={handleFilterChange}
              disabled={isSearchTermActive || areFiltersActive}
            />
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('describeNeedsTip')}
            </div>
          </div>

          <p className="text-center text-gray-500 font-semibold my-6">{t('or')}</p>

          {/* Search by Name Section */}
          <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg">
            <label
              htmlFor="searchTerm"
              className="block mb-2 font-semibold text-gray-700"
            >
              2. {t('searchByName')}
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder={t('searchPlaceholderExample')}
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              disabled={isDescriptionActive || areFiltersActive}
            />
          </div>

          <p className="text-center text-gray-500 font-semibold my-6">{t('or')}</p>

          {/* Filter Options Section */}
          <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              3. {t('filterByCriteria')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  {t('yourAge')}
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder={t('agePlaceholder')}
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
                  {t('gender')}
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {dropdownOptions.genders.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="profession"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  {t('profession')}
                </label>
                <select
                  id="profession"
                  name="profession"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.profession}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {dropdownOptions.professions.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="caste"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  {t('caste')}
                </label>
                <select
                  id="caste"
                  name="caste"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.caste}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {dropdownOptions.castes.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="stateFilter"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  {t('state')}
                </label>
                <select
                  id="stateFilter"
                  name="stateFilter"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                  value={filters.stateFilter}
                  onChange={handleFilterChange}
                  disabled={isDescriptionActive || isSearchTermActive}
                >
                  {dropdownOptions.states.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
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
                    {t('businessCategory')}
                  </label>
                  <select
                    id="categoryFilter"
                    name="categoryFilter"
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                    value={filters.categoryFilter}
                    onChange={handleFilterChange}
                    disabled={isDescriptionActive || isSearchTermActive}
                  >
                    {dropdownOptions.categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
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
                    {t('standard')}
                  </label>
                  <select
                    id="standard"
                    name="standard"
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
                    value={filters.standard}
                    onChange={handleFilterChange}
                    disabled={isDescriptionActive || isSearchTermActive}
                  >
                    {dropdownOptions.standards.map((std) => (
                      <option key={std.value} value={std.value}>
                        {std.label}
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
              {isLoading ? t('searchingWithAI') : t('findSchemes')}
            </button>
          </div>

          {showResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-lg">
                  <LoadingSpinner />
                  <p className="mt-4 text-gray-600 text-lg">
                    {t('aiSearching')}
                  </p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12 bg-red-50 border border-red-200 rounded-2xl shadow-lg">
                  <p className="text-red-600 text-lg">{error}</p>
                </div>
              ) : schemes.length > 0 ? (
                schemes.map((scheme, index) => (
                  <SchemeCard
                    key={index}
                    scheme={scheme}
                    compact={false}
                    showFullDetails={true}
                    onViewDetails={(scheme) => {
                      setSelectedScheme(scheme);
                      setIsModalOpen(true);
                    }}
                    onApply={(url) => {
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-lg">
                  <p className="text-gray-600 text-lg">
                    {t('noSchemesFound')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scheme Details Modal */}
      <SchemeDetailsModal
        scheme={selectedScheme}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedScheme(null);
        }}
      />

      <Footer />
    </>
  );
};

export default Schemes;
