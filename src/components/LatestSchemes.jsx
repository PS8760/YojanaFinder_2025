import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/i18n.jsx';
import SchemeCard from './SchemeCard.jsx';

const LatestSchemes = () => {
  const { t, currentLanguage } = useLanguage();
  const [latestSchemes, setLatestSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-pink-500 to-purple-600",
    "from-yellow-500 to-orange-600",
    "from-green-500 to-teal-600",
    "from-purple-500 to-pink-600",
    "from-indigo-500 to-blue-600"
  ];

  // Comprehensive multilingual fallback schemes
  const getFallbackSchemes = (language) => {
    const schemes = {
      en: [
        {
          id: 1,
          name: "PM Vishwakarma Yojana 2024",
          category: "Skill Development",
          targetGroup: "Traditional Artisans & Craftspeople",
          benefits: "₹10,000 toolkit + ₹1 lakh loan at 5% interest",
          deadline: "31 March 2025",
          gradient: "from-blue-500 to-indigo-600"
        },
        {
          id: 2,
          name: "Lakhpati Didi Scheme",
          category: "Women Empowerment",
          targetGroup: "Rural Women in Self Help Groups",
          benefits: "₹1 lakh annual income through skill development",
          deadline: "Ongoing",
          gradient: "from-pink-500 to-purple-600"
        },
        {
          id: 3,
          name: "PM Surya Ghar Muft Bijli Yojana",
          category: "Energy & Environment",
          targetGroup: "Residential Households",
          benefits: "Free solar panels + ₹78,000 subsidy",
          deadline: "31 December 2024",
          gradient: "from-yellow-500 to-orange-600"
        }
      ],
      hi: [
        {
          id: 1,
          name: "प्रधानमंत्री विश्वकर्मा योजना 2024",
          category: "कौशल विकास",
          targetGroup: "पारंपरिक कारीगर और शिल्पकार",
          benefits: "₹10,000 टूलकिट + ₹1 लाख ऋण 5% ब्याज पर",
          deadline: "31 मार्च 2025",
          gradient: "from-blue-500 to-indigo-600"
        },
        {
          id: 2,
          name: "लखपति दीदी योजना",
          category: "महिला सशक्तिकरण",
          targetGroup: "स्वयं सहायता समूह की ग्रामीण महिलाएं",
          benefits: "कौशल विकास के माध्यम से ₹1 लाख वार्षिक आय",
          deadline: "चालू",
          gradient: "from-pink-500 to-purple-600"
        },
        {
          id: 3,
          name: "प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना",
          category: "ऊर्जा और पर्यावरण",
          targetGroup: "आवासीय परिवार",
          benefits: "मुफ्त सोलर पैनल + ₹78,000 सब्सिडी",
          deadline: "31 दिसंबर 2024",
          gradient: "from-yellow-500 to-orange-600"
        }
      ],
      mr: [
        {
          id: 1,
          name: "पंतप्रधान विश्वकर्मा योजना 2024",
          category: "कौशल्य विकास",
          targetGroup: "पारंपरिक कारागीर आणि हस्तकलाकार",
          benefits: "₹10,000 टूलकिट + ₹1 लाख कर्ज 5% व्याजावर",
          deadline: "31 मार्च 2025",
          gradient: "from-blue-500 to-indigo-600"
        },
        {
          id: 2,
          name: "लखपती दीदी योजना",
          category: "महिला सक्षमीकरण",
          targetGroup: "स्वयंसहाय्यता गटातील ग्रामीण महिला",
          benefits: "कौशल्य विकासाद्वारे ₹1 लाख वार्षिक उत्पन्न",
          deadline: "सुरू",
          gradient: "from-pink-500 to-purple-600"
        },
        {
          id: 3,
          name: "पंतप्रधान सूर्य घर मोफत वीज योजना",
          category: "ऊर्जा आणि पर्यावरण",
          targetGroup: "निवासी कुटुंबे",
          benefits: "मोफत सोलर पॅनेल + ₹78,000 अनुदान",
          deadline: "31 डिसेंबर 2024",
          gradient: "from-yellow-500 to-orange-600"
        }
      ]
    };
    return schemes[language] || schemes.en;
  };

  useEffect(() => {
    const fetchLatestSchemes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/latest-schemes?language=${currentLanguage}`);
        if (response.ok) {
          const schemes = await response.json();
          const schemesWithGradients = schemes.map((scheme, index) => ({
            ...scheme,
            id: index + 1,
            gradient: gradients[index % gradients.length]
          }));
          setLatestSchemes(schemesWithGradients);
        }
      } catch (error) {
        console.error('Error fetching latest schemes:', error);
        // Multilingual fallback schemes
        setLatestSchemes(getFallbackSchemes(currentLanguage));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestSchemes();
  }, [currentLanguage]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {t('latestSchemes')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('latestSchemesDescription')}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('loadingLatestSchemes')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestSchemes.map((scheme) => (
              <div key={scheme.id} className="group relative">
                <SchemeCard
                  scheme={scheme}
                  compact={true}
                  showFullDetails={false}
                  gradient={scheme.gradient}
                  onViewDetails={(scheme) => {
                    // Handle view details - could open modal or navigate
                    console.log('View details for:', scheme.name);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            {t('viewAllSchemes')} →
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestSchemes;