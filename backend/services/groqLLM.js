import Groq from 'groq-sdk';
import { buildPrompt } from '../utils/promptBuilder.js';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Validate API key on startup
if (!process.env.GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY is missing from environment variables');
  throw new Error('GROQ_API_KEY is required');
}

console.log('✅ Groq client initialized successfully');

// Enhanced scheme processing with Groq - 100% AI Generated
export async function fetchSchemesFromGroq(filters, language = 'en') {
  try {
    console.log('🤖 Processing scheme request with Groq AI...');
    console.log('📋 Filters received:', JSON.stringify(filters, null, 2));
    console.log('🌐 Target Language:', language);
    console.log('🎯 Generating schemes with names and descriptions in:', language);

    // Special handling for description-based requests
    if (filters.userDescription || filters.description) {
      const description = filters.userDescription || filters.description;
      console.log('📝 User Description Analysis:');
      console.log('   Original:', description);
      console.log('   Length:', description.length);
      console.log('   Type:', typeof description);
    }

    // Build the prompt using existing prompt builder
    const prompt = buildPrompt(filters);
    console.log('📝 Generated prompt length:', prompt.length);

    // Log first 200 characters of prompt for debugging
    console.log('📄 Prompt preview:', prompt.substring(0, 200) + '...');

    // Language-specific instructions with multilingual input handling
    const languageInstructions = {
      en: 'Respond in English. If user description is in Hindi/Marathi, understand it and respond in English.',
      hi: 'हिंदी में जवाब दें। यदि उपयोगकर्ता का विवरण अंग्रेजी/मराठी में है, तो इसे समझें और हिंदी में जवाब दें।',
      mr: 'मराठीत उत्तर द्या। जर वापरकर्त्याचे वर्णन इंग्रजी/हिंदीत असेल, तर ते समजून घ्या आणि मराठीत उत्तर द्या।'
    };

    // Enhanced system message for better scheme matching with multilingual support
    const systemMessage = `You are an expert AI assistant specializing in Indian government schemes. Your primary task is to PRECISELY analyze user descriptions in ANY language (English, Hindi, Marathi) and provide EXACTLY matching government schemes.

LANGUAGE INSTRUCTION: ${languageInstructions[language] || languageInstructions.en}

CRITICAL MULTILINGUAL REQUIREMENTS:
- User descriptions can be in English, Hindi (हिंदी), or Marathi (मराठी)
- Understand the content regardless of input language
- ALL SCHEME NAMES must be in ${language} (translate if necessary)
- ALL DESCRIPTIONS must be written in ${language} (minimum 120 words each)
- ALL CATEGORIES must be in ${language}
- ALL DEPARTMENT names should be in ${language} when possible
- ALL ELIGIBILITY criteria must be in ${language}

SCHEME NAME TRANSLATION EXAMPLES:
${language === 'hi' ? `
- "PM-KISAN Samman Nidhi" → "प्रधानमंत्री किसान सम्मान निधि"
- "Ayushman Bharat" → "आयुष्मान भारत योजना"
- "Startup India" → "स्टार्टअप इंडिया योजना"
- "Digital India" → "डिजिटल इंडिया योजना"
` : language === 'mr' ? `
- "PM-KISAN Samman Nidhi" → "पंतप्रधान किसान सन्मान निधी"
- "Ayushman Bharat" → "आयुष्मान भारत योजना"
- "Startup India" → "स्टार्टअप इंडिया योजना"
- "Digital India" → "डिजिटल इंडिया योजना"
` : `
- Keep original English names
- Provide clear, detailed English descriptions
`}

CRITICAL DESCRIPTION ANALYSIS RULES:
1. EXACT DESCRIPTION MATCHING: Read the user's description word-by-word and identify SPECIFIC needs, situations, and requirements mentioned
2. CONTEXTUAL UNDERSTANDING: Extract implicit needs from the description (e.g., if someone mentions "starting a business", they need business loans, licenses, skill development)
3. DEMOGRAPHIC EXTRACTION: Identify age, gender, profession, location, income level, education from the description
4. NEED PRIORITIZATION: Focus on the PRIMARY need mentioned first, then add complementary schemes
5. RELEVANCE SCORING: Only suggest schemes that DIRECTLY address the described situation

ENHANCED MATCHING STRATEGY:
- AGRICULTURE mentions (farming, crops, land, irrigation): Agriculture schemes + Rural development + Crop insurance + Farmer welfare
- BUSINESS mentions (startup, entrepreneur, business, company): Business loans + Startup schemes + Skill development + Digital initiatives
- EDUCATION mentions (student, study, scholarship, school, college): Education scholarships + Skill development + Student welfare + Health insurance
- EMPLOYMENT mentions (job, work, unemployed, livelihood): Employment schemes + Skill development + MGNREGA + Career guidance
- HOUSING mentions (house, home, shelter, accommodation): Housing schemes + Urban development + Rural housing + Home loans
- HEALTH mentions (medical, treatment, insurance, healthcare): Health insurance + Medical schemes + Ayushman Bharat + Maternity benefits
- WOMEN-specific mentions: Women empowerment + SHG schemes + Maternity benefits + Skill development for women
- YOUTH mentions (young, youth, career): Youth employment + Skill development + Sports schemes + Career guidance
- SENIOR mentions (old, elderly, pension, retirement): Pension schemes + Senior citizen welfare + Healthcare for elderly

DESCRIPTION PROCESSING INTELLIGENCE:
1. If description mentions SPECIFIC PROFESSION → Include profession-specific schemes first
2. If description mentions SPECIFIC PROBLEM → Include schemes that solve that exact problem
3. If description mentions FINANCIAL NEED → Include financial assistance schemes
4. If description mentions LOCATION → Include state-specific schemes for that location
5. If description mentions FAMILY SITUATION → Include family welfare schemes

QUALITY REQUIREMENTS FOR MULTILINGUAL SCHEME GENERATION:
1. RELEVANCE FIRST: Every scheme must directly relate to something mentioned in the description
2. PROBLEM-SOLUTION FIT: Each scheme should solve a specific problem or need mentioned by the user
3. COMPREHENSIVE COVERAGE: Include 5-8 schemes covering different aspects of their described situation
4. ACCURATE INFORMATION: Use 2023-2024 scheme information with correct names and details
5. MANDATORY LANGUAGE COMPLIANCE: 
   - Scheme names MUST be in ${language}
   - Descriptions MUST be in ${language} (120-180 words each)
   - Categories MUST be in ${language}
   - Eligibility criteria MUST be in ${language}
   - Department names should be in ${language} when possible
6. OFFICIAL SOURCES: Include official URLs when available
7. VALID SCHEMES: Only include real, currently active government schemes
8. NATURAL LANGUAGE: Use natural, fluent ${language} - not literal translations
9. CULTURAL APPROPRIATENESS: Use terms and expressions appropriate for ${language} speakers
10. CONSISTENCY: Maintain consistent terminology throughout all schemes

OUTPUT FORMAT: Return ONLY a valid JSON array with no additional text or formatting. All content should be in ${language}.

MULTILINGUAL SCHEME EXAMPLES FOR ${language}:
${language === 'hi' ? `
EXAMPLE OUTPUT:
[
  {
    "name": "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
    "description": "छोटे और सीमांत किसानों को कृषि आदानों की वित्तीय आवश्यकताओं को पूरा करने और उचित फसल स्वास्थ्य सुनिश्चित करने के लिए तीन समान किश्तों में प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।",
    "department": "कृषि एवं किसान कल्याण मंत्रालय",
    "category": "कृषि",
    "eligibility_summary": "2 हेक्टेयर तक की खेती योग्य भूमि वाले छोटे और सीमांत किसान, भूमि रिकॉर्ड में पंजीकृत",
    "url": "https://pmkisan.gov.in"
  }
]` : language === 'mr' ? `
EXAMPLE OUTPUT:
[
  {
    "name": "पंतप्रधान किसान सन्मान निधी (PM-KISAN)",
    "description": "लहान आणि सीमांत शेतकऱ्यांना कृषी निविष्ठांच्या आर्थिक गरजा पूर्ण करण्यासाठी आणि योग्य पीक आरोग्य सुनिश्चित करण्यासाठी तीन समान हप्त्यांमध्ये दरवर्षी ₹6,000 ची थेट उत्पन्न सहाय्य.",
    "department": "कृषी आणि शेतकरी कल्याण मंत्रालय",
    "category": "कृषी",
    "eligibility_summary": "2 हेक्टरपर्यंत लागवडीयोग्य जमीन असलेले लहान आणि सीमांत शेतकरी, जमीन नोंदीमध्ये नोंदणीकृत",
    "url": "https://pmkisan.gov.in"
  }
]` : `
EXAMPLE OUTPUT:
[
  {
    "name": "PM-KISAN Samman Nidhi",
    "description": "Direct income support of ₹6,000 per year to small and marginal farmers in three equal installments to supplement financial needs for agricultural inputs and ensure proper crop health.",
    "department": "Ministry of Agriculture & Farmers Welfare",
    "category": "Agriculture",
    "eligibility_summary": "Small and marginal farmers with cultivable land up to 2 hectares, registered in land records",
    "url": "https://pmkisan.gov.in"
  }
]`}`;

    // Make request to Groq
    console.log('🔄 Making request to Groq API...');
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.1-8b-instant", // Using faster, more efficient model
      temperature: 0.3,
      max_tokens: 4000,
      top_p: 0.9,
      stream: false
    });

    console.log('✅ Received response from Groq API');

    const responseText = completion.choices[0]?.message?.content?.trim();
    console.log('🤖 Groq AI Response received, length:', responseText?.length);

    if (!responseText) {
      throw new Error('Empty response from Groq AI');
    }

    // Clean and parse the response
    let cleanedResponse = responseText;

    // Remove any markdown formatting
    cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');

    // Remove any text before the JSON array
    const jsonStart = cleanedResponse.indexOf('[');
    const jsonEnd = cleanedResponse.lastIndexOf(']') + 1;

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
    }

    // Parse the JSON response
    let schemes;
    try {
      schemes = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError.message);
      console.log('📄 Raw response:', responseText);

      // Fallback: Try to extract JSON from response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        schemes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON response from AI');
      }
    }

    // Validate and enhance the schemes
    if (!Array.isArray(schemes)) {
      throw new Error('AI response is not an array');
    }

    // Filter and validate schemes
    const validSchemes = schemes.filter(scheme => {
      return scheme &&
        typeof scheme.name === 'string' &&
        typeof scheme.description === 'string' &&
        scheme.name.trim().length > 0 &&
        scheme.description.trim().length > 0;
    }).map(scheme => ({
      name: scheme.name.trim(),
      description: scheme.description.trim(),
      department: scheme.department || 'Government of India',
      category: scheme.category || 'General',
      eligibility_summary: scheme.eligibility_summary || scheme.eligibility || 'Please check official website for eligibility criteria',
      url: scheme.url || ''
    }));

    console.log(`✅ Successfully processed ${validSchemes.length} schemes`);
    console.log('📊 Scheme categories:', [...new Set(validSchemes.map(s => s.category))]);

    // Ensure we have diverse schemes from multiple categories
    const categories = [...new Set(validSchemes.map(s => s.category))];
    if (categories.length < 2 && validSchemes.length > 3) {
      console.log('⚠️ Warning: Limited category diversity in results');
    }

    return validSchemes;

  } catch (error) {
    console.error('❌ Groq AI Error:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      status: error.status,
      stack: error.stack?.split('\n').slice(0, 3).join('\n')
    });

    // If rate limited, try with a simpler, more efficient prompt
    if (error.status === 429) {
      console.log('🔄 Rate limit hit, trying with simplified prompt...');
      try {
        return await trySimplifiedPrompt(filters, language);
      } catch (simplifiedError) {
        console.error('❌ Simplified prompt also failed:', simplifiedError.message);
      }
    }

    // If all AI attempts fail, return empty array with error message
    console.log('❌ All AI generation attempts failed - returning empty result');
    throw new Error('AI service temporarily unavailable. Please try again in a few minutes.');
  }
}

// Simplified prompt for rate-limited scenarios - Still 100% AI Generated
async function trySimplifiedPrompt(filters, language = 'en') {
  const userDesc = filters.userDescription || filters.description || '';
  const languageInstructions = {
    en: 'Respond in English',
    hi: 'Respond in Hindi (हिंदी में जवाब दें)',
    mr: 'Respond in Marathi (मराठीत उत्तर द्या)'
  };

  const simplifiedPrompt = `You are an AI assistant for Indian government schemes. Based on this user description (which may be in English, Hindi, or Marathi): "${userDesc}", provide 3-5 relevant government schemes.

${languageInstructions[language] || languageInstructions.en}

IMPORTANT: Understand the user description regardless of its language and respond in ${language}.

Return ONLY a JSON array with this format (all content in ${language}):
[{"name":"Scheme Name in ${language}","description":"Brief description in ${language}","department":"Ministry/Department in ${language}","category":"Category in ${language}","eligibility_summary":"Who can apply in ${language}","url":""}]

Focus on the most relevant schemes for: ${userDesc}`;

  console.log('🔄 Trying simplified prompt due to rate limit...');

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: simplifiedPrompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    max_tokens: 1500,
    stream: false
  });

  const responseText = completion.choices[0]?.message?.content?.trim();
  if (!responseText) throw new Error('Empty response from simplified prompt');

  // Parse and validate response
  let schemes;
  try {
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    schemes = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
  } catch (parseError) {
    throw new Error('Invalid JSON in simplified response');
  }

  if (!Array.isArray(schemes)) throw new Error('Response is not an array');

  const validSchemes = schemes.filter(scheme =>
    scheme && scheme.name && scheme.description
  ).map(scheme => ({
    name: scheme.name.trim(),
    description: scheme.description.trim(),
    department: scheme.department || 'Government of India',
    category: scheme.category || 'General',
    eligibility_summary: scheme.eligibility_summary || 'Please check official website for eligibility',
    url: scheme.url || ''
  }));

  console.log(`✅ Simplified prompt generated ${validSchemes.length} schemes`);
  return validSchemes;
}