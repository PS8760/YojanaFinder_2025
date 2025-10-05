import { useLanguage } from '../utils/i18n.jsx';
import { processSchemeForDisplay, formatSchemeBenefits, getSchemeLastUpdated } from '../utils/schemeProcessor.js';

const SchemeCard = ({
  scheme,
  onViewDetails,
  onApply,
  showFullDetails = true,
  compact = false,
  gradient = null
}) => {
  const { t, currentLanguage } = useLanguage();

  // Process scheme data for proper multilingual display
  const processedScheme = processSchemeForDisplay(scheme, currentLanguage);

  if (!processedScheme) return null;

  const cardClasses = compact
    ? "bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    : "bg-white p-8 rounded-2xl shadow-lg flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300";

  return (
    <div className={cardClasses}>
      {/* Gradient Header for compact cards */}
      {compact && gradient && (
        <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      )}

      <div className={compact ? "p-6" : ""}>
        {/* Category Badge for compact cards */}
        {compact && (
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
            {processedScheme.category}
          </div>
        )}

        {/* Scheme Name */}
        <h2 className={`font-bold text-blue-500 mb-3 ${compact ? 'text-lg group-hover:text-blue-600 transition-colors duration-300' : 'text-2xl'}`}>
          {processedScheme.name}
        </h2>

        {/* Description */}
        <p className={`text-gray-600 mb-4 ${compact ? 'text-sm' : 'flex-grow'}`}>
          {processedScheme.description}
        </p>

        {/* Scheme Details */}
        {showFullDetails && (
          <div className={`${compact ? '' : 'mt-auto pt-4 border-t border-gray-200'}`}>
            {/* Category for full cards */}
            {!compact && (
              <p className="text-sm text-gray-500 mb-2">
                <strong>{t('category')}:</strong> {processedScheme.category}
              </p>
            )}

            {/* Target Group for compact cards */}
            {compact && processedScheme.targetGroup && (
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">{t('for')}:</span> {processedScheme.targetGroup}
              </p>
            )}

            {/* Benefits for compact cards */}
            {compact && processedScheme.benefits && (
              <p className="text-sm text-green-600 font-medium mb-3">
                💰 {formatSchemeBenefits(processedScheme.benefits, currentLanguage)}
              </p>
            )}

            {/* Deadline for compact cards */}
            {compact && processedScheme.deadline && (
              <p className="text-xs text-orange-600 mb-4">
                ⏰ {t('deadline')}: {processedScheme.deadline}
              </p>
            )}

            {/* Eligibility for full cards */}
            {!compact && processedScheme.eligibility_summary && (
              <p className="text-sm text-gray-500 mb-2">
                <strong>{t('eligibility')}:</strong> {processedScheme.eligibility_summary}
              </p>
            )}

            {/* Department */}
            {!compact && processedScheme.department && (
              <p className="text-sm text-gray-500 mb-2">
                <strong>{t('department')}:</strong> {processedScheme.department}
              </p>
            )}

            {/* Launch Year for full cards */}
            {!compact && processedScheme.launchYear && (
              <p className="text-sm text-gray-500 mb-2">
                <strong>{t('launchYear')}:</strong> {processedScheme.launchYear}
              </p>
            )}

            {/* Last Updated for full cards */}
            {!compact && (
              <p className="text-xs text-gray-400 mb-3">
                {t('lastUpdated')}: {getSchemeLastUpdated(processedScheme, currentLanguage)}
              </p>
            )}

            {/* Action Buttons */}
            <div className={`flex gap-2 sm:gap-3 ${compact ? 'flex-col' : 'flex-col sm:flex-row'}`}>
              {/* View Details Button */}
              <button
                onClick={() => onViewDetails && onViewDetails(processedScheme)}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium whitespace-nowrap ${compact
                  ? 'w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105'
                  : 'flex-1 sm:flex-none'
                  }`}
              >
                {t('viewDetails')}
              </button>

              {/* Apply Now Button */}
              {processedScheme.url && onApply && (
                <button
                  onClick={() => onApply(processedScheme.url)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium flex-1 sm:flex-none whitespace-nowrap text-center"
                >
                  {t('applyNow')}
                </button>
              )}

              {/* Direct Link for schemes with URL but no onApply handler */}
              {processedScheme.url && !onApply && (
                <a
                  href={processedScheme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium flex-1 sm:flex-none whitespace-nowrap text-center"
                >
                  {t('applyNow')}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Simple button for compact cards without full details */}
        {!showFullDetails && compact && (
          <button
            onClick={() => onViewDetails && onViewDetails(processedScheme)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            {t('viewDetails')}
          </button>
        )}
      </div>

      {/* Hover Effect Overlay for compact cards */}
      {compact && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
    </div>
  );
};

export default SchemeCard;