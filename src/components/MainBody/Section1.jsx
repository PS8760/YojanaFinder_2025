import { Link } from "react-router-dom";
import { useLanguage } from "../../utils/i18n.jsx";

const Section1 = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full pt-0 px-4 sm:px-6 lg:px-8 bg-amber-50 flex items-center justify-center">
      <div className="text-center max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-blue-500 leading-tight mb-2">
          {t('heroTitle1')} {t('heroTitle2')} {t('heroTitle3')}
        </h1>
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-blue-500 leading-tight mb-6">
          {t('heroTitle4')}
        </div>
        <div className="inline-block max-w-3xl mx-auto px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition-transform duration-300 shadow-lg">
          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            to="/schemes"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span className="text-base sm:text-lg">{t('findSchemes')}</span>
          </Link>

          <Link
            to="/aboutus"
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 text-base sm:text-lg"
          >
            {t('learnMore')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section1;