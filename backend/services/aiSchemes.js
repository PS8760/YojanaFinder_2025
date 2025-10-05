import Groq from 'groq-sdk';
import "dotenv/config";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function generateLatestSchemes(language = 'en') {
  const languageInstructions = {
    en: 'Respond in English',
    hi: 'हिंदी में जवाब दें (Respond in Hindi)',
    mr: 'मराठीत उत्तर द्या (Respond in Marathi)'
  };

  const prompt = `Generate 6 latest and real government schemes from India covering different sectors. Include schemes for various professions, age groups, and categories.

CRITICAL LANGUAGE REQUIREMENTS:
${languageInstructions[language] || languageInstructions.en}

MANDATORY MULTILINGUAL COMPLIANCE:
- ALL scheme names must be in ${language}
- ALL descriptions must be in ${language} (minimum 50 words each)
- ALL categories must be in ${language}
- ALL department names should be in ${language} when possible
- ALL eligibility criteria must be in ${language}
- Use natural, fluent ${language} - not literal translations

SCHEME REQUIREMENTS:
1. Mix of Central and State government schemes
2. Cover different sectors: Agriculture, Education, Health, Business, Women Empowerment, Youth, Technology, etc.
3. Include schemes for different demographics: Farmers, Students, Women, Entrepreneurs, Senior Citizens, etc.
4. Provide real scheme names translated to ${language}
5. Include current schemes launched in 2023-2024
6. Ensure cultural appropriateness for ${language} speakers

OUTPUT FORMAT (JSON Array in ${language}):
[
  {
    "name": "Official Scheme Name in ${language}",
    "category": "Primary Category in ${language}",
    "targetGroup": "Target Beneficiaries in ${language}",
    "benefits": "Key Benefits in ${language} (concise)",
    "deadline": "Application Deadline in ${language}",
    "department": "Responsible Department/Ministry in ${language}",
    "description": "Brief description in ${language} (50-80 words)",
    "eligibility": "Key eligibility criteria in ${language}",
    "launchYear": "2023 or 2024"
  }
]

Generate 6 diverse schemes covering different sectors and target groups.`;

  try {
    console.log(`🤖 Generating latest schemes in ${language}...`);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert on Indian government schemes. Generate accurate, current government schemes with complete multilingual information.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      max_tokens: 3000,
      top_p: 0.9,
      stream: false
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    if (!responseText) {
      throw new Error("Empty response from Groq AI");
    }

    // Clean and parse the response
    let cleanedResponse = responseText;
    cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');

    const jsonStart = cleanedResponse.indexOf('[');
    const jsonEnd = cleanedResponse.lastIndexOf(']') + 1;

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
    }

    const schemes = JSON.parse(cleanedResponse);

    if (!Array.isArray(schemes)) {
      throw new Error('AI response is not an array');
    }

    console.log(`✅ Generated ${schemes.length} schemes in ${language}`);
    return schemes;
  } catch (error) {
    console.error("Error generating latest schemes:", error);
    // Comprehensive multilingual fallback schemes if AI fails
    const fallbackSchemes = {
      en: [
        {
          name: "PM Vishwakarma Yojana 2024",
          category: "Skill Development",
          targetGroup: "Traditional Artisans & Craftspeople",
          benefits: "₹10,000 toolkit + ₹1 lakh loan at 5% interest",
          deadline: "31 March 2025",
          department: "Ministry of Micro, Small and Medium Enterprises",
          description: "The PM Vishwakarma Yojana is a comprehensive scheme designed to empower traditional artisans and craftspeople across India. This initiative provides skill enhancement training, modern toolkit support worth ₹10,000, and easy access to credit facilities up to ₹1 lakh at subsidized interest rates. The scheme covers 18 traditional trades including carpentry, tailoring, blacksmithing, pottery, weaving, and other heritage crafts. It aims to preserve traditional skills while integrating modern techniques and market linkages to ensure sustainable livelihoods for artisan communities.",
          eligibility: "Traditional artisans engaged in 18 specified trades, minimum age 18 years, registered in official records",
          launchYear: "2023"
        },
        {
          name: "Lakhpati Didi Scheme",
          category: "Women Empowerment",
          targetGroup: "Rural Women in Self Help Groups",
          benefits: "₹1 lakh annual income through skill development",
          deadline: "Ongoing",
          department: "Ministry of Rural Development",
          description: "Empowering rural women to achieve annual income of ₹1 lakh through skill development, entrepreneurship training, and market linkage support under the National Rural Livelihood Mission.",
          eligibility: "Rural women members of Self Help Groups (SHGs)",
          launchYear: "2023"
        },
        {
          name: "PM Surya Ghar Muft Bijli Yojana",
          category: "Energy & Environment",
          targetGroup: "Residential Households",
          benefits: "Free solar panels + ₹78,000 subsidy",
          deadline: "31 December 2024",
          department: "Ministry of New and Renewable Energy",
          description: "Providing free electricity through rooftop solar installations for 1 crore households with substantial subsidies and easy financing options.",
          eligibility: "Residential households with own roof space",
          launchYear: "2024"
        },
        {
          name: "Ayushman Bharat Health Account (ABHA)",
          category: "Healthcare",
          targetGroup: "All Indian Citizens",
          benefits: "Digital health ID + ₹5 lakh health insurance",
          deadline: "Ongoing",
          department: "Ministry of Health and Family Welfare",
          description: "Digital health ecosystem providing unique health ID, digital health records, and access to ₹5 lakh health insurance coverage under PM-JAY scheme.",
          eligibility: "All Indian citizens with Aadhaar card",
          launchYear: "2023"
        },
        {
          name: "PM Kisan Drone Scheme",
          category: "Agriculture Technology",
          targetGroup: "Farmers & Agricultural Entrepreneurs",
          benefits: "50% subsidy on drone purchase + training",
          deadline: "31 March 2025",
          department: "Ministry of Agriculture & Farmers Welfare",
          description: "Promoting precision agriculture through drone technology with subsidies for purchase, training programs, and certification for agricultural drone operations.",
          eligibility: "Farmers, FPOs, and agricultural entrepreneurs",
          launchYear: "2024"
        },
        {
          name: "Digital India Land Records Modernization",
          category: "Digital Governance",
          targetGroup: "Land Owners & Citizens",
          benefits: "Digital land records + online services",
          deadline: "Ongoing",
          department: "Ministry of Rural Development",
          description: "Digitizing land records across India to provide transparent, accessible, and tamper-proof land ownership documents through online portals.",
          eligibility: "All land owners and citizens requiring land records",
          launchYear: "2023"
        }
      ],
      hi: [
        {
          name: "प्रधानमंत्री विश्वकर्मा योजना 2024",
          category: "कौशल विकास",
          targetGroup: "पारंपरिक कारीगर और शिल्पकार",
          benefits: "₹10,000 टूलकिट + ₹1 लाख ऋण 5% ब्याज पर",
          deadline: "31 मार्च 2025",
          department: "सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय",
          description: "प्रधानमंत्री विश्वकर्मा योजना भारत के पारंपरिक कारीगरों और शिल्पकारों को सशक्त बनाने के लिए एक व्यापक पहल है। यह योजना कौशल संवर्धन प्रशिक्षण, ₹10,000 मूल्य का आधुनिक टूलकिट समर्थन, और सब्सिडी वाली ब्याज दरों पर ₹1 लाख तक की आसान ऋण सुविधा प्रदान करती है। इस योजना में बढ़ईगिरी, दर्जी, लुहारी, कुम्हारी, बुनाई और अन्य विरासती शिल्प सहित 18 पारंपरिक व्यापार शामिल हैं। इसका उद्देश्य पारंपरिक कौशल को संरक्षित करते हुए आधुनिक तकनीकों और बाजार संपर्कों को एकीकृत करना है।",
          eligibility: "18 निर्दिष्ट व्यापारों में लगे पारंपरिक कारीगर, न्यूनतम आयु 18 वर्ष, आधिकारिक रिकॉर्ड में पंजीकृत",
          launchYear: "2023"
        },
        {
          name: "लखपति दीदी योजना",
          category: "महिला सशक्तिकरण",
          targetGroup: "स्वयं सहायता समूह की ग्रामीण महिलाएं",
          benefits: "कौशल विकास के माध्यम से ₹1 लाख वार्षिक आय",
          deadline: "चालू",
          department: "ग्रामीण विकास मंत्रालय",
          description: "राष्ट्रीय ग्रामीण आजीविका मिशन के तहत कौशल विकास, उद्यमिता प्रशिक्षण और बाजार संपर्क सहायता के माध्यम से ग्रामीण महिलाओं को सशक्त बनाना।",
          eligibility: "स्वयं सहायता समूह (SHG) की ग्रामीण महिला सदस्य",
          launchYear: "2023"
        },
        {
          name: "प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना",
          category: "ऊर्जा और पर्यावरण",
          targetGroup: "आवासीय परिवार",
          benefits: "मुफ्त सोलर पैनल + ₹78,000 सब्सिडी",
          deadline: "31 दिसंबर 2024",
          department: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
          description: "1 करोड़ परिवारों के लिए छत पर सोलर इंस्टॉलेशन के माध्यम से मुफ्त बिजली प्रदान करना।",
          eligibility: "अपनी छत वाले आवासीय परिवार",
          launchYear: "2024"
        },
        {
          name: "आयुष्मान भारत स्वास्थ्य खाता (ABHA)",
          category: "स्वास्थ्य सेवा",
          targetGroup: "सभी भारतीय नागरिक",
          benefits: "डिजिटल स्वास्थ्य ID + ₹5 लाख स्वास्थ्य बीमा",
          deadline: "चालू",
          department: "स्वास्थ्य और परिवार कल्याण मंत्रालय",
          description: "डिजिटल स्वास्थ्य पारिस्थितिकी तंत्र जो अनूठी स्वास्थ्य ID, डिजिटल स्वास्थ्य रिकॉर्ड प्रदान करता है।",
          eligibility: "आधार कार्ड वाले सभी भारतीय नागरिक",
          launchYear: "2023"
        },
        {
          name: "प्रधानमंत्री किसान ड्रोन योजना",
          category: "कृषि प्रौद्योगिकी",
          targetGroup: "किसान और कृषि उद्यमी",
          benefits: "ड्रोन खरीद पर 50% सब्सिडी + प्रशिक्षण",
          deadline: "31 मार्च 2025",
          department: "कृषि और किसान कल्याण मंत्रालय",
          description: "ड्रोन प्रौद्योगिकी के माध्यम से सटीक कृषि को बढ़ावा देना।",
          eligibility: "किसान, FPO और कृषि उद्यमी",
          launchYear: "2024"
        },
        {
          name: "डिजिटल इंडिया भूमि रिकॉर्ड आधुनिकीकरण",
          category: "डिजिटल गवर्नेंस",
          targetGroup: "भूमि मालिक और नागरिक",
          benefits: "डिजिटल भूमि रिकॉर्ड + ऑनलाइन सेवाएं",
          deadline: "चालू",
          department: "ग्रामीण विकास मंत्रालय",
          description: "पारदर्शी और सुलभ भूमि स्वामित्व दस्तावेज प्रदान करने के लिए भारत भर में भूमि रिकॉर्ड का डिजिटलीकरण।",
          eligibility: "सभी भूमि मालिक और भूमि रिकॉर्ड चाहने वाले नागरिक",
          launchYear: "2023"
        }
      ],
      mr: [
        {
          name: "पंतप्रधान विश्वकर्मा योजना 2024",
          category: "कौशल्य विकास",
          targetGroup: "पारंपरिक कारागीर आणि हस्तकलाकार",
          benefits: "₹10,000 टूलकिट + ₹1 लाख कर्ज 5% व्याजावर",
          deadline: "31 मार्च 2025",
          department: "सूक्ष्म, लघु आणि मध्यम उद्योग मंत्रालय",
          description: "पंतप्रधान विश्वकर्मा योजना ही भारतातील पारंपरिक कारागीर आणि हस्तकलाकारांना सक्षम करण्यासाठी एक व्यापक उपक्रम आहे. ही योजना कौशल्य संवर्धन प्रशिक्षण, ₹10,000 मूल्याचे आधुनिक टूलकिट समर्थन, आणि अनुदानित व्याज दरांवर ₹1 लाख पर्यंत सहज कर्ज सुविधा प्रदान करते. या योजनेत सुतारकाम, शिवणकाम, लोहारकाम, कुंभारकाम, विणकाम आणि इतर वारसा हस्तकला यासह 18 पारंपरिक व्यापार समाविष्ट आहेत. पारंपरिक कौशल्ये जतन करताना आधुनिक तंत्रे आणि बाजार संपर्क एकत्रित करणे हा यामागचा उद्देश आहे.",
          eligibility: "18 निर्दिष्ट व्यापारांमध्ये गुंतलेले पारंपरिक कारागीर, किमान वय 18 वर्षे, अधिकृत नोंदीमध्ये नोंदणीकृत",
          launchYear: "2023"
        },
        {
          name: "लखपती दीदी योजना",
          category: "महिला सक्षमीकरण",
          targetGroup: "स्वयंसहाय्यता गटातील ग्रामीण महिला",
          benefits: "कौशल्य विकासाद्वारे ₹1 लाख वार्षिक उत्पन्न",
          deadline: "सुरू",
          department: "ग्रामीण विकास मंत्रालय",
          description: "राष्ट्रीय ग्रामीण आजीविका मिशन अंतर्गत कौशल्य विकास, उद्योजकता प्रशिक्षण आणि बाजार संपर्क सहाय्याद्वारे ग्रामीण महिलांना सक्षम करणे.",
          eligibility: "स्वयंसहाय्यता गट (SHG) च्या ग्रामीण महिला सदस्य",
          launchYear: "2023"
        },
        {
          name: "पंतप्रधान सूर्य घर मोफत वीज योजना",
          category: "ऊर्जा आणि पर्यावरण",
          targetGroup: "निवासी कुटुंबे",
          benefits: "मोफत सोलर पॅनेल + ₹78,000 अनुदान",
          deadline: "31 डिसेंबर 2024",
          department: "नवीन आणि नवीकरणीय ऊर्जा मंत्रालय",
          description: "1 कोटी कुटुंबांसाठी छतावरील सोलर इन्स्टॉलेशनद्वारे मोफत वीज पुरवठा करणे.",
          eligibility: "स्वतःची छत असलेली निवासी कुटुंबे",
          launchYear: "2024"
        },
        {
          name: "आयुष्मान भारत आरोग्य खाते (ABHA)",
          category: "आरोग्य सेवा",
          targetGroup: "सर्व भारतीय नागरिक",
          benefits: "डिजिटल आरोग्य ID + ₹5 लाख आरोग्य विमा",
          deadline: "सुरू",
          department: "आरोग्य आणि कुटुंब कल्याण मंत्रालय",
          description: "डिजिटल आरोग्य इकोसिस्टम जे अनन्य आरोग्य ID, डिजिटल आरोग्य रेकॉर्ड प्रदान करते.",
          eligibility: "आधार कार्ड असलेले सर्व भारतीय नागरिक",
          launchYear: "2023"
        },
        {
          name: "पंतप्रधान किसान ड्रोन योजना",
          category: "कृषी तंत्रज्ञान",
          targetGroup: "शेतकरी आणि कृषी उद्योजक",
          benefits: "ड्रोन खरेदीवर 50% अनुदान + प्रशिक्षण",
          deadline: "31 मार्च 2025",
          department: "कृषी आणि शेतकरी कल्याण मंत्रालय",
          description: "ड्रोन तंत्रज्ञानाद्वारे अचूक शेतीला प्रोत्साहन देणे.",
          eligibility: "शेतकरी, FPO आणि कृषी उद्योजक",
          launchYear: "2024"
        },
        {
          name: "डिजिटल इंडिया जमीन रेकॉर्ड आधुनिकीकरण",
          category: "डिजिटल गव्हर्नन्स",
          targetGroup: "जमीन मालक आणि नागरिक",
          benefits: "डिजिटल जमीन रेकॉर्ड + ऑनलाइन सेवा",
          deadline: "सुरू",
          department: "ग्रामीण विकास मंत्रालय",
          description: "पारदर्शक आणि सुलभ जमीन मालकी कागदपत्रे प्रदान करण्यासाठी भारतभरातील जमीन रेकॉर्डचे डिजिटलीकरण.",
          eligibility: "सर्व जमीन मालक आणि जमीन रेकॉर्ड हवे असलेले नागरिक",
          launchYear: "2023"
        }
      ]
    };

    return fallbackSchemes[language] || fallbackSchemes.en;
  }
}