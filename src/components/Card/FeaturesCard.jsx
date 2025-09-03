import React from "react";

// --- SVG Icon Components ---
// It's good practice to keep icons as separate components.

const IconSimplified = () => (
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
      d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6-14v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 14h6m-6-14h6"
    />
  </svg>
);

const IconPersonalized = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const IconDatabase = () => (
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
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7l8-4 8 4m-8 4v10"
    />
  </svg>
);

const IconTime = () => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- The Main FeaturesCard Component ---
const FeaturesCard = () => {
  const features = [
    {
      icon: <IconSimplified />,
      title: "Simplified Search",
      description:
        "We translate complex government jargon into simple, clear information for you.",
    },
    {
      icon: <IconPersonalized />,
      title: "Personalized For You",
      description:
        "Our platform filters schemes to show only what you’re eligible for.",
    },
    {
      icon: <IconDatabase />,
      title: "All Schemes in One Place",
      description:
        "We consolidate schemes from all departments so you don’t have to search elsewhere.",
    },
    {
      icon: <IconTime />,
      title: "Save Time & Effort",
      description:
        "Stop wasting hours on confusing websites. Find exactly what you need in minutes.",
    },
  ];

  return (
    <section className="h-screen w-full bg-amber-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl p-8 sm:p-10 bg-transparent rounded-2xl ">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Our Core Features
        </h2>
        {/* Responsive Grid for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCard;
