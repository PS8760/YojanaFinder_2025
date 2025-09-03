import React, { useState, useEffect } from "react";

// --- Augmented Mock Data for Government Schemes ---
// In a real application, this data would come from an API.
const allSchemes = [
  {
    name: "Pradhan Mantri Kisan Samman Nidhi",
    category: "Agriculture",
    state: "Central",
    description:
      "Provides income support to all landholding farmer families in the country.",
    department: "Ministry of Agriculture & Farmers Welfare",
    minAge: 18,
    maxAge: 60,
    gender: "All",
    caste: "All",
    profession: "Farmer",
  },
  {
    name: "Ayushman Bharat PM-JAY",
    category: "Health",
    state: "Central",
    description: "Health insurance coverage for low-income earners in India.",
    department: "Ministry of Health and Family Welfare",
    minAge: 0,
    maxAge: 99,
    gender: "All",
    caste: "All",
    profession: "All",
  },
  {
    name: "National Education Policy Fellowship",
    category: "Education",
    state: "Central",
    description:
      "Scholarships for students pursuing higher education under the new policy guidelines.",
    department: "Ministry of Education",
    minAge: 17,
    maxAge: 25,
    gender: "All",
    caste: "All",
    profession: "Student",
  },
  {
    name: "Stand-Up India Scheme",
    category: "Business",
    state: "Central",
    description:
      "Promotes entrepreneurship among women and Scheduled Castes and Tribes.",
    department: "Ministry of Finance",
    minAge: 18,
    maxAge: 99,
    gender: "Female",
    caste: ["SC", "ST"],
    profession: "All",
  },
  {
    name: "Mazi Kanya Bhagyashree",
    category: "Social Welfare",
    state: "Maharashtra",
    description:
      "A scheme to improve the sex ratio and promote the education of girls.",
    department: "Government of Maharashtra",
    minAge: 0,
    maxAge: 18,
    gender: "Female",
    caste: "All",
    profession: "Student",
  },
  {
    name: "Pradhan Mantri Shram Yogi Maan-dhan",
    category: "Social Welfare",
    state: "Central",
    description:
      "A voluntary and contributory pension scheme for unorganized workers.",
    department: "Ministry of Labour & Employment",
    minAge: 18,
    maxAge: 40,
    gender: "All",
    caste: "All",
    profession: "Unorganized Worker",
  },
];

const Schemes = () => {
  const [schemes, setSchemes] = useState(allSchemes);
  // Existing filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  // New dynamic filters
  const [age, setAge] = useState("");
  const [caste, setCaste] = useState("All");
  const [profession, setProfession] = useState("All");
  const [gender, setGender] = useState("All");

  // Effect to filter schemes when any filter value changes
  useEffect(() => {
    let filtered = allSchemes;

    // Text search
    if (searchTerm) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Category dropdown
    if (categoryFilter !== "All") {
      filtered = filtered.filter((s) => s.category === categoryFilter);
    }
    // State dropdown
    if (stateFilter !== "All") {
      filtered = filtered.filter((s) => s.state === stateFilter);
    }
    // Age input
    if (age) {
      const numericAge = parseInt(age, 10);
      filtered = filtered.filter(
        (s) => numericAge >= s.minAge && numericAge <= s.maxAge
      );
    }
    // Caste dropdown
    if (caste !== "All") {
      filtered = filtered.filter(
        (s) => s.caste === "All" || s.caste.includes(caste)
      );
    }
    // Profession dropdown
    if (profession !== "All") {
      filtered = filtered.filter(
        (s) => s.profession === "All" || s.profession === profession
      );
    }
    // Gender dropdown
    if (gender !== "All") {
      filtered = filtered.filter(
        (s) => s.gender === "All" || s.gender === gender
      );
    }

    setSchemes(filtered);
  }, [searchTerm, categoryFilter, stateFilter, age, caste, profession, gender]);

  // Dynamically get unique options for dropdowns from the data
  const categories = ["All", ...new Set(allSchemes.map((s) => s.category))];
  const states = ["All", ...new Set(allSchemes.map((s) => s.state))];
  const professions = [
    "All",
    ...new Set(
      allSchemes.filter((s) => s.profession !== "All").map((s) => s.profession)
    ),
  ];
  const castes = ["All", "General", "OBC", "SC", "ST"]; // Static list for simplicity
  const genders = ["All", "Male", "Female"];

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Explore Government Schemes
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
          Use the filters below to find central and state-level schemes tailored
          to your needs.
        </p>
      </div>

      {/* Filter and Search Bar - Now a 2x2 grid on medium screens */}
      <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search by Name */}
        <div className="lg:col-span-2">
          <label
            htmlFor="search"
            className="block mb-2 font-semibold text-gray-700"
          >
            Search by Name
          </label>
          <input
            type="text"
            id="search"
            placeholder="e.g., Ayushman Bharat"
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Age */}
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
            placeholder="e.g., 25"
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block mb-2 font-semibold text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        {/* Profession */}
        <div>
          <label
            htmlFor="profession"
            className="block mb-2 font-semibold text-gray-700"
          >
            Profession
          </label>
          <select
            id="profession"
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          >
            {professions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        {/* Caste */}
        <div>
          <label
            htmlFor="caste"
            className="block mb-2 font-semibold text-gray-700"
          >
            Caste
          </label>
          <select
            id="caste"
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
          >
            {castes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 font-semibold text-gray-700"
          >
            Scheme Category
          </label>
          <select
            id="category"
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* State */}
        <div>
          <label
            htmlFor="state"
            className="block mb-2 font-semibold text-gray-700"
          >
            State/Central
          </label>
          <select
            id="state"
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.length > 0 ? (
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
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">
              No schemes found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
