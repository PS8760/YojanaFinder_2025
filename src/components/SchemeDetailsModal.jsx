import { useState } from 'react';
import { useLanguage } from '../utils/i18n.jsx';
import { processSchemeForDisplay, getSchemeLastUpdated } from '../utils/schemeProcessor.js';

const SchemeDetailsModal = ({ scheme, isOpen, onClose }) => {
  const { t, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !scheme) return null;

  // Process scheme for multilingual display
  const processedScheme = processSchemeForDisplay(scheme, currentLanguage);

  // Get formatted last updated date using utility function
  const getLastUpdatedDate = (scheme) => {
    return getSchemeLastUpdated(scheme, currentLanguage);
  };

  const tabs = [
    { id: 'overview', label: t('overview'), icon: '📋' },
    { id: 'eligibility', label: t('eligibility'), icon: '✅' },
    { id: 'application', label: t('applicationProcess'), icon: '📝' },
    { id: 'documents', label: t('documentation'), icon: '📄' },
    { id: 'benefits', label: t('benefits'), icon: '💰' }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{t('schemeOverview')}</h3>
            <p className="text-gray-600 leading-relaxed">{processedScheme.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">{t('department')}</h4>
                <p className="text-blue-600">{processedScheme.department}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">{t('category')}</h4>
                <p className="text-green-600">{processedScheme.category}</p>
              </div>
            </div>
          </div>
        );

      case 'eligibility':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{t('eligibilityCriteria')}</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-green-800">{processedScheme.eligibility_summary}</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">{t('generalRequirements')}:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('mustBeIndianCitizen')}</li>
                <li>{t('ageCriteriaAsSpecified')}</li>
                <li>{t('incomeCriteriaIfApplicable')}</li>
                <li>{t('categorySpecificRequirements')}</li>
              </ul>
            </div>
          </div>
        );

      case 'application':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{t('applicationProcess')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-700">{t('visitOfficialWebsite')}</h4>
                  <p className="text-gray-600">{t('goToOfficialPortal')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-700">{t('registerLogin')}</h4>
                  <p className="text-gray-600">{t('createAccountOrLogin')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-700">{t('fillApplicationForm')}</h4>
                  <p className="text-gray-600">{t('completeApplicationForm')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-700">{t('submitDocuments')}</h4>
                  <p className="text-gray-600">{t('uploadRequiredDocuments')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-gray-700">{t('submitAndTrack')}</h4>
                  <p className="text-gray-600">{t('submitApplicationAndTrack')}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{t('requiredDocuments')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">{t('identityDocuments')}:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>{t('aadhaarCard')}</li>
                  <li>{t('panCard')}</li>
                  <li>{t('voterID')}</li>
                  <li>{t('passportIfApplicable')}</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">{t('addressProof')}:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>{t('utilityBills')}</li>
                  <li>{t('bankStatement')}</li>
                  <li>{t('rentAgreement')}</li>
                  <li>{t('propertyDocuments')}</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">{t('incomeDocuments')}:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>{t('incomeCertificate')}</li>
                  <li>{t('salarySlips')}</li>
                  <li>{t('itrDocuments')}</li>
                  <li>{t('bankStatements')}</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">{t('categoryCertificates')}:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>{t('casteCertificate')}</li>
                  <li>{t('ewsCertificate')}</li>
                  <li>{t('disabilityCertificate')}</li>
                  <li>{t('otherRelevantCertificates')}</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{t('schemeBenefits')}</h3>

            {/* Show actual scheme benefits if available */}
            {processedScheme.benefits && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-4">
                <h4 className="font-semibold text-green-800 mb-3">{t('keyBenefits')}</h4>
                <p className="text-green-700 text-lg font-medium">💰 {processedScheme.benefits}</p>
              </div>
            )}

            {/* Show target group if available */}
            {processedScheme.targetGroup && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">{t('targetGroup')}</h4>
                <p className="text-blue-700">{processedScheme.targetGroup}</p>
              </div>
            )}

            {/* Show deadline if available */}
            {processedScheme.deadline && (
              <div className="bg-orange-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-orange-800 mb-2">{t('applicationDeadline')}</h4>
                <p className="text-orange-700">⏰ {processedScheme.deadline}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">{t('financialBenefits')}</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• {t('directCashTransfers')}</li>
                  <li>• {t('subsidiesAndGrants')}</li>
                  <li>• {t('lowInterestLoans')}</li>
                  <li>• {t('insuranceCoverage')}</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">{t('nonFinancialBenefits')}</h4>
                <ul className="space-y-2 text-purple-700">
                  <li>• {t('skillDevelopmentTraining')}</li>
                  <li>• {t('healthcareServices')}</li>
                  <li>• {t('educationalSupport')}</li>
                  <li>• {t('employmentOpportunities')}</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h4 className="font-semibold text-yellow-800">{t('importantNote')}:</h4>
              <p className="text-yellow-700 mt-2">{t('benefitsMayVary')}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{processedScheme.name}</h2>
              <p className="text-blue-100">{processedScheme.department}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          {getTabContent()}
        </div>

        {/* Footer - Fixed positioning */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              {t('lastUpdated')}: {getLastUpdatedDate(processedScheme)}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
              {processedScheme.url && (
                <a
                  href={processedScheme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center whitespace-nowrap"
                >
                  {t('visitOfficialWebsite')}
                </a>
              )}
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 whitespace-nowrap"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailsModal;