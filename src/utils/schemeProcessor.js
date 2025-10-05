// Utility functions for processing and displaying scheme data in multiple languages

/**
 * Processes scheme data to ensure proper multilingual display
 * @param {Object} scheme - The scheme object
 * @param {string} language - Target language (en, hi, mr)
 * @returns {Object} Processed scheme object
 */
export function processSchemeForDisplay(scheme, language = 'en') {
  if (!scheme) return null;

  // Scheme name translations for common government schemes
  const schemeNameTranslations = {
    hi: {
      'PM-KISAN Samman Nidhi': 'प्रधानमंत्री किसान सम्मान निधि',
      'PM Kisan Samman Nidhi': 'प्रधानमंत्री किसान सम्मान निधि',
      'Ayushman Bharat': 'आयुष्मान भारत योजना',
      'PM Awas Yojana': 'प्रधानमंत्री आवास योजना',
      'Startup India': 'स्टार्टअप इंडिया योजना',
      'Digital India': 'डिजिटल इंडिया योजना',
      'PM Vishwakarma Yojana': 'प्रधानमंत्री विश्वकर्मा योजना',
      'Lakhpati Didi Scheme': 'लखपति दीदी योजना',
      'PM Surya Ghar Muft Bijli Yojana': 'प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना',
      'MGNREGA': 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम',
      'Pradhan Mantri Mudra Yojana': 'प्रधानमंत्री मुद्रा योजना',
      'Stand Up India': 'स्टैंड अप इंडिया योजना'
    },
    mr: {
      'PM-KISAN Samman Nidhi': 'पंतप्रधान किसान सन्मान निधी',
      'PM Kisan Samman Nidhi': 'पंतप्रधान किसान सन्मान निधी',
      'Ayushman Bharat': 'आयुष्मान भारत योजना',
      'PM Awas Yojana': 'पंतप्रधान आवास योजना',
      'Startup India': 'स्टार्टअप इंडिया योजना',
      'Digital India': 'डिजिटल इंडिया योजना',
      'PM Vishwakarma Yojana': 'पंतप्रधान विश्वकर्मा योजना',
      'Lakhpati Didi Scheme': 'लखपती दीदी योजना',
      'PM Surya Ghar Muft Bijli Yojana': 'पंतप्रधान सूर्य घर मोफत वीज योजना',
      'MGNREGA': 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी कायदा',
      'Pradhan Mantri Mudra Yojana': 'पंतप्रधान मुद्रा योजना',
      'Stand Up India': 'स्टँड अप इंडिया योजना'
    }
  };

  // Category translations mapping
  const categoryTranslations = {
    en: {
      'Agriculture': 'Agriculture',
      'Health': 'Health',
      'Education': 'Education',
      'Business': 'Business',
      'Social Welfare': 'Social Welfare',
      'Skill Development': 'Skill Development',
      'Women Empowerment': 'Women Empowerment',
      'Energy & Environment': 'Energy & Environment',
      'Digital Governance': 'Digital Governance',
      'Agriculture Technology': 'Agriculture Technology',
      'Healthcare': 'Healthcare',
      'Employment': 'Employment',
      'Housing': 'Housing'
    },
    hi: {
      'Agriculture': 'कृषि',
      'Health': 'स्वास्थ्य',
      'Education': 'शिक्षा',
      'Business': 'व्यापार',
      'Social Welfare': 'सामाजिक कल्याण',
      'Skill Development': 'कौशल विकास',
      'Women Empowerment': 'महिला सशक्तिकरण',
      'Energy & Environment': 'ऊर्जा और पर्यावरण',
      'Digital Governance': 'डिजिटल गवर्नेंस',
      'Agriculture Technology': 'कृषि प्रौद्योगिकी',
      'Healthcare': 'स्वास्थ्य सेवा',
      'Employment': 'रोजगार',
      'Housing': 'आवास'
    },
    mr: {
      'Agriculture': 'कृषी',
      'Health': 'आरोग्य',
      'Education': 'शिक्षण',
      'Business': 'व्यापार',
      'Social Welfare': 'सामाजिक कल्याण',
      'Skill Development': 'कौशल्य विकास',
      'Women Empowerment': 'महिला सक्षमीकरण',
      'Energy & Environment': 'ऊर्जा आणि पर्यावरण',
      'Digital Governance': 'डिजिटल गव्हर्नन्स',
      'Agriculture Technology': 'कृषी तंत्रज्ञान',
      'Healthcare': 'आरोग्य सेवा',
      'Employment': 'रोजगार',
      'Housing': 'गृहनिर्माण'
    }
  };

  // Department translations mapping
  const departmentTranslations = {
    hi: {
      'Ministry of Agriculture & Farmers Welfare': 'कृषि एवं किसान कल्याण मंत्रालय',
      'Ministry of Health and Family Welfare': 'स्वास्थ्य और परिवार कल्याण मंत्रालय',
      'Ministry of Education': 'शिक्षा मंत्रालय',
      'Ministry of Micro, Small and Medium Enterprises': 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय',
      'Ministry of Rural Development': 'ग्रामीण विकास मंत्रालय',
      'Ministry of New and Renewable Energy': 'नवीन और नवीकरणीय ऊर्जा मंत्रालय',
      'Ministry of Women and Child Development': 'महिला एवं बाल विकास मंत्रालय',
      'Ministry of Labour and Employment': 'श्रम और रोजगार मंत्रालय',
      'Ministry of Housing and Urban Affairs': 'आवासन और शहरी कार्य मंत्रालय',
      'Department for Promotion of Industry and Internal Trade': 'उद्योग संवर्धन और आंतरिक व्यापार विभाग',
      'Government of India': 'भारत सरकार'
    },
    mr: {
      'Ministry of Agriculture & Farmers Welfare': 'कृषी आणि शेतकरी कल्याण मंत्रालय',
      'Ministry of Health and Family Welfare': 'आरोग्य आणि कुटुंब कल्याण मंत्रालय',
      'Ministry of Education': 'शिक्षण मंत्रालय',
      'Ministry of Micro, Small and Medium Enterprises': 'सूक्ष्म, लघु आणि मध्यम उद्योग मंत्रालय',
      'Ministry of Rural Development': 'ग्रामीण विकास मंत्रालय',
      'Ministry of New and Renewable Energy': 'नवीन आणि नवीकरणीय ऊर्जा मंत्रालय',
      'Ministry of Women and Child Development': 'महिला आणि बाल विकास मंत्रालय',
      'Ministry of Labour and Employment': 'श्रम आणि रोजगार मंत्रालय',
      'Ministry of Housing and Urban Affairs': 'गृहनिर्माण आणि शहरी व्यवहार मंत्रालय',
      'Department for Promotion of Industry and Internal Trade': 'उद्योग संवर्धन आणि अंतर्गत व्यापार विभाग',
      'Government of India': 'भारत सरकार'
    }
  };

  // Benefits translations for common terms
  const benefitsTranslations = {
    hi: {
      'toolkit': 'टूलकिट',
      'loan': 'ऋण',
      'subsidy': 'सब्सिडी',
      'training': 'प्रशिक्षण',
      'insurance': 'बीमा',
      'scholarship': 'छात्रवृत्ति',
      'pension': 'पेंशन',
      'grant': 'अनुदान',
      'financial support': 'वित्तीय सहायता',
      'skill development': 'कौशल विकास',
      'annual income': 'वार्षिक आय',
      'free': 'मुफ्त',
      'ongoing': 'चालू',
      'lakh': 'लाख',
      'crore': 'करोड़'
    },
    mr: {
      'toolkit': 'टूलकिट',
      'loan': 'कर्ज',
      'subsidy': 'अनुदान',
      'training': 'प्रशिक्षण',
      'insurance': 'विमा',
      'scholarship': 'शिष्यवृत्ती',
      'pension': 'निवृत्तीवेतन',
      'grant': 'देणगी',
      'financial support': 'आर्थिक सहाय्य',
      'skill development': 'कौशल्य विकास',
      'annual income': 'वार्षिक उत्पन्न',
      'free': 'मोफत',
      'ongoing': 'सुरू',
      'lakh': 'लाख',
      'crore': 'कोटी'
    }
  };

  // Eligibility translations for common terms
  const eligibilityTranslations = {
    hi: {
      'Indian citizen': 'भारतीय नागरिक',
      'age': 'आयु',
      'minimum age': 'न्यूनतम आयु',
      'years': 'वर्ष',
      'farmers': 'किसान',
      'women': 'महिलाएं',
      'students': 'छात्र',
      'entrepreneurs': 'उद्यमी',
      'artisans': 'कारीगर',
      'rural': 'ग्रामीण',
      'urban': 'शहरी',
      'registered': 'पंजीकृत',
      'income': 'आय',
      'below poverty line': 'गरीबी रेखा से नीचे',
      'self help groups': 'स्वयं सहायता समूह',
      'traditional': 'पारंपरिक'
    },
    mr: {
      'Indian citizen': 'भारतीय नागरिक',
      'age': 'वय',
      'minimum age': 'किमान वय',
      'years': 'वर्षे',
      'farmers': 'शेतकरी',
      'women': 'महिला',
      'students': 'विद्यार्थी',
      'entrepreneurs': 'उद्योजक',
      'artisans': 'कारागीर',
      'rural': 'ग्रामीण',
      'urban': 'शहरी',
      'registered': 'नोंदणीकृत',
      'income': 'उत्पन्न',
      'below poverty line': 'दारिद्र्य रेषेखाली',
      'self help groups': 'स्वयंसहाय्यता गट',
      'traditional': 'पारंपरिक'
    }
  };

  // Function to translate text content
  const translateContent = (text, translationMap, language) => {
    if (!text || language === 'en') return text;

    let translatedText = text;
    const translations = translationMap[language];

    if (translations) {
      Object.entries(translations).forEach(([english, translated]) => {
        const regex = new RegExp(english, 'gi');
        translatedText = translatedText.replace(regex, translated);
      });
    }

    return translatedText;
  };

  // Process the scheme
  const processedScheme = {
    ...scheme,
    // Translate scheme name if available in translation map
    name: schemeNameTranslations[language]?.[scheme.name] || scheme.name?.trim() || '',

    // Translate category if it's in English and target language is different
    category: categoryTranslations[language]?.[scheme.category] || scheme.category,

    // Translate department name
    department: departmentTranslations[language]?.[scheme.department] || scheme.department?.trim() || '',

    // Ensure all text fields are properly formatted and translated
    description: scheme.description?.trim() || '',

    // Translate eligibility summary
    eligibility_summary: translateContent(
      scheme.eligibility_summary?.trim() || scheme.eligibility?.trim() || '',
      eligibilityTranslations,
      language
    ),

    // Translate benefits if available
    benefits: translateContent(
      scheme.benefits?.trim() || '',
      benefitsTranslations,
      language
    ),

    // Translate target group if available
    targetGroup: translateContent(
      scheme.targetGroup?.trim() || '',
      eligibilityTranslations,
      language
    ),

    // Translate deadline terms
    deadline: translateContent(
      scheme.deadline?.trim() || '',
      benefitsTranslations,
      language
    ),

    // Ensure URL is valid
    url: scheme.url && scheme.url.startsWith('http') ? scheme.url : ''
  };

  // Enhance description if needed
  const enhancedScheme = enhanceSchemeDescription(processedScheme, language);

  return enhancedScheme;
}

/**
 * Processes an array of schemes for display
 * @param {Array} schemes - Array of scheme objects
 * @param {string} language - Target language
 * @returns {Array} Processed schemes array
 */
export function processSchemesForDisplay(schemes, language = 'en') {
  if (!Array.isArray(schemes)) return [];

  return schemes
    .map(scheme => processSchemeForDisplay(scheme, language))
    .filter(scheme => scheme && scheme.name && scheme.description);
}

/**
 * Validates if a scheme object has all required fields
 * @param {Object} scheme - The scheme object to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateScheme(scheme) {
  if (!scheme || typeof scheme !== 'object') return false;

  const requiredFields = ['name', 'description', 'category'];
  return requiredFields.every(field =>
    scheme[field] &&
    typeof scheme[field] === 'string' &&
    scheme[field].trim().length > 0
  );
}

/**
 * Formats scheme benefits text for display
 * @param {string} benefits - Benefits text
 * @param {string} language - Target language
 * @returns {string} Formatted benefits text
 */
export function formatSchemeBenefits(benefits, language = 'en') {
  if (!benefits) return '';

  // Add currency symbol if missing for Indian schemes
  let formattedBenefits = benefits.trim();

  // Add ₹ symbol for amounts if missing
  formattedBenefits = formattedBenefits.replace(/(\d+,?\d*)\s*(lakh|crore|thousand)/gi, '₹$1 $2');

  return formattedBenefits;
}

/**
 * Enhances scheme descriptions with additional context if needed
 * @param {Object} scheme - The scheme object
 * @param {string} language - Target language
 * @returns {Object} Enhanced scheme object
 */
export function enhanceSchemeDescription(scheme, language = 'en') {
  if (!scheme || !scheme.description) return scheme;

  // If description is too short (less than 50 characters), try to enhance it
  if (scheme.description.length < 50) {
    const enhancedDescriptions = {
      hi: {
        'प्रधानमंत्री विश्वकर्मा योजना': 'यह योजना पारंपरिक कारीगरों और शिल्पकारों को आधुनिक तकनीकी प्रशिक्षण, वित्तीय सहायता और बाजार पहुंच प्रदान करती है। इसमें 18 पारंपरिक व्यापार शामिल हैं जैसे बढ़ईगिरी, दर्जी, लुहारी आदि।',
        'लखपति दीदी योजना': 'यह योजना ग्रामीण महिलाओं को स्वयं सहायता समूहों के माध्यम से कौशल विकास और उद्यमिता प्रशिक्षण प्रदान करती है ताकि वे वार्षिक ₹1 लाख की आय प्राप्त कर सकें।'
      },
      mr: {
        'पंतप्रधान विश्वकर्मा योजना': 'ही योजना पारंपरिक कारागीर आणि हस्तकलाकारांना आधुनिक तांत्रिक प्रशिक्षण, आर्थिक सहाय्य आणि बाजार पोहोच प्रदान करते. यामध्ये सुतारकाम, शिवणकाम, लोहारकाम यासारखे 18 पारंपरिक व्यापार समाविष्ट आहेत.',
        'लखपती दीदी योजना': 'ही योजना ग्रामीण महिलांना स्वयंसहाय्यता गटांच्या माध्यमातून कौशल्य विकास आणि उद्योजकता प्रशिक्षण देते जेणेकरून त्या वार्षिक ₹1 लाख उत्पन्न मिळवू शकतील.'
      }
    };

    const enhanced = enhancedDescriptions[language]?.[scheme.name];
    if (enhanced) {
      return { ...scheme, description: enhanced };
    }
  }

  return scheme;
}

/**
 * Gets appropriate placeholder text for empty scheme fields
 * @param {string} field - Field name
 * @param {string} language - Target language
 * @returns {string} Placeholder text
 */
export function getSchemePlaceholder(field, language = 'en') {
  const placeholders = {
    en: {
      name: 'Scheme Name',
      description: 'Scheme description not available',
      department: 'Government Department',
      category: 'General',
      eligibility_summary: 'Please check official website for eligibility criteria',
      benefits: 'Benefits information not available'
    },
    hi: {
      name: 'योजना का नाम',
      description: 'योजना का विवरण उपलब्ध नहीं है',
      department: 'सरकारी विभाग',
      category: 'सामान्य',
      eligibility_summary: 'पात्रता मानदंड के लिए कृपया आधिकारिक वेबसाइट देखें',
      benefits: 'लाभ की जानकारी उपलब्ध नहीं है'
    },
    mr: {
      name: 'योजनेचे नाव',
      description: 'योजनेचे वर्णन उपलब्ध नाही',
      department: 'सरकारी विभाग',
      category: 'सामान्य',
      eligibility_summary: 'पात्रता निकषांसाठी कृपया अधिकृत वेबसाइट पहा',
      benefits: 'फायद्यांची माहिती उपलब्ध नाही'
    }
  };

  return placeholders[language]?.[field] || placeholders.en[field] || '';
}