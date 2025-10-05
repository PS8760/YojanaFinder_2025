import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/i18n.jsx';
import SchemeCard from './SchemeCard.jsx';
import SchemeDetailsModal from './SchemeDetailsModal.jsx';

const LatestSchemes = () => {
  const { t, currentLanguage } = useLanguage();
  const [latestSchemes, setLatestSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          gradient: "from-blue-500 to-indigo-600",
          description: "The PM Vishwakarma Yojana is a comprehensive scheme designed to empower traditional artisans and craftspeople across India. This initiative provides skill enhancement training, modern toolkit support worth ₹10,000, and easy access to credit facilities up to ₹1 lakh at subsidized interest rates. The scheme covers 18 traditional trades including carpentry, tailoring, blacksmithing, pottery, weaving, and other heritage crafts. It aims to preserve traditional skills while integrating modern techniques and market linkages to ensure sustainable livelihoods for artisan communities.",
          department: "Ministry of Micro, Small and Medium Enterprises",
          eligibility_summary: "Traditional artisans engaged in 18 specified trades, minimum age 18 years, registered in official records",
          url: "https://pmvishwakarma.gov.in",
          lastUpdated: "2024-02-15",
          launchYear: "2023"
        },
        {
          id: 2,
          name: "Lakhpati Didi Scheme",
          category: "Women Empowerment",
          targetGroup: "Rural Women in Self Help Groups",
          benefits: "₹1 lakh annual income through skill development",
          deadline: "Ongoing",
          gradient: "from-pink-500 to-purple-600",
          description: "The Lakhpati Didi Scheme is an ambitious initiative under the National Rural Livelihood Mission aimed at empowering rural women to achieve annual income of ₹1 lakh through skill development, entrepreneurship training, and market linkage support. The scheme focuses on enhancing the economic capabilities of women in Self Help Groups (SHGs) by providing them with advanced training in various income-generating activities, access to modern technology, and direct market connections to ensure sustainable and profitable enterprises.",
          department: "Ministry of Rural Development",
          eligibility_summary: "Rural women members of Self Help Groups (SHGs), active participation in group activities",
          url: "https://nrlm.gov.in"
        },
        {
          id: 3,
          name: "PM Surya Ghar Muft Bijli Yojana",
          category: "Energy & Environment",
          targetGroup: "Residential Households",
          benefits: "Free solar panels + ₹78,000 subsidy",
          deadline: "31 December 2024",
          gradient: "from-yellow-500 to-orange-600",
          description: "The PM Surya Ghar Muft Bijli Yojana is a revolutionary initiative to provide free electricity to 1 crore households through rooftop solar installations. The scheme offers substantial subsidies up to ₹78,000 for solar panel installation, along with easy financing options and technical support. This initiative aims to promote renewable energy adoption, reduce electricity bills for households, and contribute to India's commitment to clean energy and carbon neutrality goals.",
          department: "Ministry of New and Renewable Energy",
          eligibility_summary: "Residential households with own roof space, valid electricity connection",
          url: "https://pmsuryaghar.gov.in"
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
          gradient: "from-blue-500 to-indigo-600",
          description: "प्रधानमंत्री विश्वकर्मा योजना भारत के पारंपरिक कारीगरों और शिल्पकारों को सशक्त बनाने के लिए एक व्यापक पहल है। यह योजना कौशल संवर्धन प्रशिक्षण, ₹10,000 मूल्य का आधुनिक टूलकिट समर्थन, और सब्सिडी वाली ब्याज दरों पर ₹1 लाख तक की आसान ऋण सुविधा प्रदान करती है। इस योजना में बढ़ईगिरी, दर्जी, लुहारी, कुम्हारी, बुनाई और अन्य विरासती शिल्प सहित 18 पारंपरिक व्यापार शामिल हैं। इसका उद्देश्य पारंपरिक कौशल को संरक्षित करते हुए आधुनिक तकनीकों और बाजार संपर्कों को एकीकृत करना है।",
          department: "सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय",
          eligibility_summary: "18 निर्दिष्ट व्यापारों में लगे पारंपरिक कारीगर, न्यूनतम आयु 18 वर्ष, आधिकारिक रिकॉर्ड में पंजीकृत",
          url: "https://pmvishwakarma.gov.in"
        },
        {
          id: 2,
          name: "लखपति दीदी योजना",
          category: "महिला सशक्तिकरण",
          targetGroup: "स्वयं सहायता समूह की ग्रामीण महिलाएं",
          benefits: "कौशल विकास के माध्यम से ₹1 लाख वार्षिक आय",
          deadline: "चालू",
          gradient: "from-pink-500 to-purple-600",
          description: "लखपति दीदी योजना राष्ट्रीय ग्रामीण आजीविका मिशन के तहत एक महत्वाकांक्षी पहल है जिसका उद्देश्य ग्रामीण महिलाओं को कौशल विकास, उद्यमिता प्रशिक्षण और बाजार संपर्क सहायता के माध्यम से ₹1 लाख की वार्षिक आय प्राप्त करने के लिए सशक्त बनाना है। यह योजना स्वयं सहायता समूहों (SHG) की महिलाओं की आर्थिक क्षमताओं को बढ़ाने पर केंद्रित है।",
          department: "ग्रामीण विकास मंत्रालय",
          eligibility_summary: "स्वयं सहायता समूह (SHG) की ग्रामीण महिला सदस्य, समूह गतिविधियों में सक्रिय भागीदारी",
          url: "https://nrlm.gov.in"
        },
        {
          id: 3,
          name: "प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना",
          category: "ऊर्जा और पर्यावरण",
          targetGroup: "आवासीय परिवार",
          benefits: "मुफ्त सोलर पैनल + ₹78,000 सब्सिडी",
          deadline: "31 दिसंबर 2024",
          gradient: "from-yellow-500 to-orange-600",
          description: "प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना छत पर सोलर इंस्टॉलेशन के माध्यम से 1 करोड़ परिवारों को मुफ्त बिजली प्रदान करने की एक क्रांतिकारी पहल है। यह योजना सोलर पैनल इंस्टॉलेशन के लिए ₹78,000 तक की पर्याप्त सब्सिडी, आसान वित्तपोषण विकल्प और तकनीकी सहायता प्रदान करती है।",
          department: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
          eligibility_summary: "अपनी छत वाले आवासीय परिवार, वैध बिजली कनेक्शन",
          url: "https://pmsuryaghar.gov.in"
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
          gradient: "from-blue-500 to-indigo-600",
          description: "पंतप्रधान विश्वकर्मा योजना ही भारतातील पारंपरिक कारागीर आणि हस्तकलाकारांना सक्षम करण्यासाठी एक व्यापक उपक्रम आहे. ही योजना कौशल्य संवर्धन प्रशिक्षण, ₹10,000 मूल्याचे आधुनिक टूलकिट समर्थन, आणि अनुदानित व्याज दरांवर ₹1 लाख पर्यंत सहज कर्ज सुविधा प्रदान करते. या योजनेत सुतारकाम, शिवणकाम, लोहारकाम, कुंभारकाम, विणकाम आणि इतर वारसा हस्तकला यासह 18 पारंपरिक व्यापार समाविष्ट आहेत.",
          department: "सूक्ष्म, लघु आणि मध्यम उद्योग मंत्रालय",
          eligibility_summary: "18 निर्दिष्ट व्यापारांमध्ये गुंतलेले पारंपरिक कारागीर, किमान वय 18 वर्षे, अधिकृत नोंदीमध्ये नोंदणीकृत",
          url: "https://pmvishwakarma.gov.in"
        },
        {
          id: 2,
          name: "लखपती दीदी योजना",
          category: "महिला सक्षमीकरण",
          targetGroup: "स्वयंसहाय्यता गटातील ग्रामीण महिला",
          benefits: "कौशल्य विकासाद्वारे ₹1 लाख वार्षिक उत्पन्न",
          deadline: "सुरू",
          gradient: "from-pink-500 to-purple-600",
          description: "लखपती दीदी योजना ही राष्ट्रीय ग्रामीण आजीविका मिशन अंतर्गत एक महत्त्वाकांक्षी उपक्रम आहे ज्याचा उद्देश ग्रामीण महिलांना कौशल्य विकास, उद्योजकता प्रशिक्षण आणि बाजार संपर्क सहाय्याद्वारे ₹1 लाख वार्षिक उत्पन्न मिळवण्यासाठी सक्षम करणे आहे. ही योजना स्वयंसहाय्यता गटातील (SHG) महिलांच्या आर्थिक क्षमता वाढवण्यावर केंद्रित आहे.",
          department: "ग्रामीण विकास मंत्रालय",
          eligibility_summary: "स्वयंसहाय्यता गट (SHG) च्या ग्रामीण महिला सदस्य, गट क्रियाकलापांमध्ये सक्रिय सहभाग",
          url: "https://nrlm.gov.in"
        },
        {
          id: 3,
          name: "पंतप्रधान सूर्य घर मोफत वीज योजना",
          category: "ऊर्जा आणि पर्यावरण",
          targetGroup: "निवासी कुटुंबे",
          benefits: "मोफत सोलर पॅनेल + ₹78,000 अनुदान",
          deadline: "31 डिसेंबर 2024",
          gradient: "from-yellow-500 to-orange-600",
          description: "पंतप्रधान सूर्य घर मोफत वीज योजना ही छतावरील सोलर इन्स्टॉलेशनद्वारे 1 कोटी कुटुंबांना मोफत वीज पुरवठा करण्याची एक क्रांतिकारी उपक्रम आहे. ही योजना सोलर पॅनेल इन्स्टॉलेशनसाठी ₹78,000 पर्यंत भरीव अनुदान, सहज वित्तपुरवठा पर्याय आणि तांत्रिक सहाय्य प्रदान करते.",
          department: "नवीन आणि नवीकरणीय ऊर्जा मंत्रालय",
          eligibility_summary: "स्वतःची छत असलेली निवासी कुटुंबे, वैध वीज जोडणी",
          url: "https://pmsuryaghar.gov.in"
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
                    setSelectedScheme(scheme);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/schemes"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-decoration-none"
          >
            {t('viewAllSchemes')} →
          </a>
        </div>
      </div>

      {/* Scheme Details Modal */}
      <SchemeDetailsModal
        scheme={selectedScheme}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedScheme(null);
        }}
      />
    </section>
  );
};

export default LatestSchemes;