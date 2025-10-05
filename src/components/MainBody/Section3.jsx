import { useLanguage } from "../../utils/i18n.jsx";

// SVG Icon Components
const IconForm = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const IconSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const IconBenefit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0 1v.01M12 18v-1m0-1v-1m0-1V4m0 16v-1m0-1v-1m0-1V4m0 16v-1"
    />
  </svg>
);

const Section3 = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <IconForm />,
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      icon: <IconSearch />,
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      icon: <IconBenefit />,
      title: t('step3Title'),
      description: t('step3Description'),
    },
  ];

  return (
    <section className="relative z-[100] py-16 lg:py-24 bg-amber-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4">
            {t('howItWorks')}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              3
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-600">
              {t('simpleSteps')}
            </h3>
          </div>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Steps Container */}
        <div className="relative flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center max-w-sm"
            >
              <div className="flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 px-4">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;