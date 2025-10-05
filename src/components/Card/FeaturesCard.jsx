import { useLanguage } from "../../utils/i18n.jsx";

// SVG Icon Components
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

const FeaturesCard = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <IconSimplified />,
      title: t('aiPowered'),
      description: t('aiDescription'),
    },
    {
      icon: <IconPersonalized />,
      title: t('personalized'),
      description: t('personalizedDescription'),
    },
    {
      icon: <IconDatabase />,
      title: t('comprehensive'),
      description: t('comprehensiveDescription'),
    },
    {
      icon: <IconTime />,
      title: t('realtime'),
      description: t('realtimeDescription'),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 lg:mb-10 text-gray-800">
        {t('ourCoreFeatures')}
      </h2>
      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-5">{feature.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCard;