import { useLanguage } from "../../utils/i18n.jsx";
import FeaturesCard from "../Card/FeaturesCard";

const Section2 = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Title */}
          <div className="text-center lg:text-left relative">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[150px] font-light text-gray-800 leading-none relative z-10">
              {t('whyTitle')}
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-stretch-125% text-blue-500 hover:text-blue-700 transition-colors duration-300 mt-4 relative z-10">
              {t('whySubtitle')}
            </h2>

            {/* Question Mark */}
            <div className="absolute -top-4 sm:-top-8 md:-top-12 lg:-top-16 right-0 lg:right-[-30px] xl:right-[-50px] z-0">
              <span className="text-6xl sm:text-7xl md:text-[120px] lg:text-[150px] xl:text-[200px] font-light text-gray-300 select-none opacity-50">
                ?
              </span>
            </div>
          </div>

          {/* Right Side - Features */}
          <div>
            <FeaturesCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;