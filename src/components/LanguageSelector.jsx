import { useState } from 'react';
import { useLanguage } from '../utils/i18n.jsx';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-blue-500 hover:text-blue-700 transition-colors duration-300 rounded-lg hover:bg-blue-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="text-sm font-medium">{languages[currentLanguage]}</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                changeLanguage(code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors duration-200 ${currentLanguage === code ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;