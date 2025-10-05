import { useLanguage } from '../utils/i18n.jsx';

const SuccessMessage = ({ message, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-green-800 mb-2">{t('success')}</h3>
      <p className="text-green-600 mb-4">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          {t('close')}
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;