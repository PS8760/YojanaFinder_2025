import { Component } from "react";
import { translations } from "../utils/i18n.jsx";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Get current language from localStorage
      const currentLanguage = localStorage.getItem('yojanaFinder_language') || 'en';
      const t = (key) => translations[currentLanguage]?.[key] || translations.en[key] || key;

      return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {t('somethingWentWrong')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('pleaseTryAgain')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {t('reload')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;