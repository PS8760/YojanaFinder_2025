/**
 * Builds a dynamic prompt for Gemini API based on user filters.
 * Priority: description > searchTerm > filters
 * @param {Object} filters
 * @returns {string} Prompt text for Gemini
 */
export function buildPrompt(filters = {}) {
  const {
    description,
    userDescription, // Frontend sends this field
    searchTerm,
    age,
    gender,
    caste,
    profession,
    stateFilter,
    categoryFilter,
    standard,
  } = filters;

  // Safely extract a string from description (supports string or object)
  const extractDescription = (d) => {
    if (!d && d !== 0) return "";
    if (typeof d === "string") return d.trim();
    if (typeof d === "object") {
      // common fields to check
      if (typeof d.text === "string" && d.text.trim()) return d.text.trim();
      if (typeof d.value === "string" && d.value.trim()) return d.value.trim();
      if (typeof d.description === "string" && d.description.trim()) return d.description.trim();
      // fallback to JSON representation (shortened)
      try {
        return JSON.stringify(d);
      } catch {
        return String(d);
      }
    }
    return String(d).trim();
  };

  // Use userDescription from frontend, fallback to description
  const descStr = extractDescription(userDescription || description);

  // Enhanced description processing for better matching
  const processDescription = (desc) => {
    if (!desc) return "";

    // Extract key information from description
    const extractKeywords = (text) => {
      const keywords = {
        professions: ['farmer', 'student', 'entrepreneur', 'teacher', 'doctor', 'engineer', 'worker', 'driver', 'shopkeeper', 'artisan'],
        needs: ['loan', 'scholarship', 'insurance', 'housing', 'job', 'training', 'skill', 'business', 'education', 'health'],
        demographics: ['woman', 'women', 'girl', 'youth', 'young', 'senior', 'elderly', 'disabled', 'minority'],
        sectors: ['agriculture', 'farming', 'business', 'education', 'health', 'technology', 'rural', 'urban'],
        problems: ['unemployed', 'poor', 'needy', 'struggling', 'financial', 'medical', 'emergency']
      };

      const found = {
        professions: [],
        needs: [],
        demographics: [],
        sectors: [],
        problems: []
      };

      const lowerText = text.toLowerCase();

      Object.keys(keywords).forEach(category => {
        keywords[category].forEach(keyword => {
          if (lowerText.includes(keyword)) {
            found[category].push(keyword);
          }
        });
      });

      return found;
    };

    const keywords = extractKeywords(desc);

    // Build enhanced context based on extracted keywords
    let enhancement = "";

    if (keywords.professions.length > 0) {
      enhancement += ` Professional context: ${keywords.professions.join(', ')}.`;
    }

    if (keywords.needs.length > 0) {
      enhancement += ` Specific needs: ${keywords.needs.join(', ')}.`;
    }

    if (keywords.demographics.length > 0) {
      enhancement += ` Demographics: ${keywords.demographics.join(', ')}.`;
    }

    if (keywords.problems.length > 0) {
      enhancement += ` Challenges: ${keywords.problems.join(', ')}.`;
    }

    return desc + enhancement;
  };

  const enhancedDescStr = processDescription(descStr);

  // sanitize to avoid breaking template literals or accidental interpolation
  const sanitize = (s) =>
    s.replace(/`/g, "\\`").replace(/\$\{/g, "\\${").replace(/\u0000/g, "");

  // --- Priority 1: Description ---
  if (enhancedDescStr) {
    const safeDesc = sanitize(enhancedDescStr);
    return `You are an expert AI assistant specializing in ALL Indian government schemes across ALL sectors and demographics. Your task is to analyze the user's description comprehensively and find the most relevant schemes from ANY field, not just agriculture.

USER DESCRIPTION:
"""${safeDesc}"""

STEP-BY-STEP DESCRIPTION ANALYSIS:
1) EXTRACT EXPLICIT INFORMATION:
   - What is the person's profession/occupation?
   - What specific need or problem are they mentioning?
   - What is their age, gender, location if mentioned?
   - What financial situation or income level is indicated?
   - What specific goals or aspirations are mentioned?

2) IDENTIFY PRIMARY NEED:
   - What is the MAIN thing they are asking for or need help with?
   - What problem are they trying to solve?
   - What opportunity are they seeking?

3) INFER SECONDARY NEEDS:
   - Based on their situation, what other schemes might benefit them?
   - What complementary support might they need?
   - What related challenges might they face?

2) MULTI-SECTOR SCHEME MATCHING: Search across ALL these categories:
   - AGRICULTURE & RURAL: PM-KISAN, Crop Insurance, Kisan Credit Card, Soil Health Card
   - EDUCATION & SKILL: Scholarships, PM Yashasvi, Skill India, Digital India courses
   - HEALTH & INSURANCE: Ayushman Bharat, PMJAY, Maternity benefits, Health insurance
   - BUSINESS & ENTREPRENEURSHIP: Startup India, MUDRA loans, Stand-up India, PMEGP
   - EMPLOYMENT & LIVELIHOOD: MGNREGA, Skill development, Rozgar Guarantee schemes
   - HOUSING & INFRASTRUCTURE: PM Awas Yojana, Housing loans, Rural housing
   - WOMEN EMPOWERMENT: Beti Bachao Beti Padhao, Mahila Udyami schemes, SHG programs
   - YOUTH DEVELOPMENT: Khelo India, Youth employment, Skill development for youth
   - SENIOR CITIZENS: Pension schemes, Senior citizen welfare, Healthcare for elderly
   - TECHNOLOGY & DIGITAL: Digital India, Cyber security training, IT skill development
   - SOCIAL WELFARE: PDS, LPG subsidy, Disability benefits, Minority welfare
   - FINANCIAL INCLUSION: Jan Dhan Yojana, Insurance schemes, Banking services

3) INTELLIGENT MATCHING STRATEGY:
   - If user mentions farming/agriculture: Include agriculture schemes BUT ALSO consider education, health, business schemes they might benefit from
   - If user mentions business: Include entrepreneurship schemes AND relevant skill development, financial inclusion schemes
   - If user mentions education: Include scholarships AND skill development, employment schemes
   - If user mentions specific demographics (women, youth, senior): Prioritize demographic-specific schemes across ALL sectors
   - Always consider indirect benefits: A farmer might benefit from digital literacy, a student from health insurance

4) DEMOGRAPHIC-SPECIFIC CONSIDERATIONS:
   - Students: Education scholarships, skill development, health insurance, digital literacy
   - Farmers: Agriculture schemes, rural development, skill diversification, health insurance
   - Women: Women-specific schemes across all sectors, entrepreneurship, skill development
   - Youth: Employment schemes, skill development, entrepreneurship, sports development
   - Senior Citizens: Pension, healthcare, social security across all applicable schemes
   - Entrepreneurs: Business loans, skill development, digital initiatives, export promotion

OUTPUT FORMAT (JSON Array):
[
  {
    "name": "Official Scheme Name",
    "description": "Comprehensive description covering benefits, purpose, and impact (120-180 words)",
    "department": "Responsible Ministry/Department/State Government",
    "category": "Primary category from the comprehensive list above",
    "eligibility_summary": "Detailed eligibility criteria in simple, clear language",
    "url": "Official government website URL or empty string if unavailable"
  }
]

QUALITY REQUIREMENTS:
- Return 5-8 most relevant schemes covering DIFFERENT sectors and aspects of user's profile
- MANDATORY: Include schemes from at least 3 different categories
- Prioritize schemes with maximum benefit and active enrollment
- Use official scheme names and current information (2023-2024)
- Provide comprehensive eligibility criteria
- Include official URLs when available
- Address both direct needs and indirect beneficial opportunities
- Consider both Central and State government schemes

EXAMPLE DIVERSE RESPONSE for "25-year-old software engineer looking for housing":
- Housing: PM Awas Yojana (Urban)
- Skill Development: Digital India skill programs
- Health: Ayushman Bharat
- Business: Startup India (if interested in entrepreneurship)
- Financial: PMJJBY life insurance

Generate diverse, multi-sector JSON response:`;
  }

  // --- Priority 2: Search by Name ---
  if (searchTerm?.trim()) {
    const safeTerm = sanitize(searchTerm.trim());
    return `Find an Indian government scheme with the exact name "${safeTerm}". Respond with a single valid JSON array (empty array [] if none). Each object must include: name, description, department, category, eligibility_summary, url.`;
  }

  // --- Priority 3: Filters ---
  let prompt = `Find relevant government schemes in India for this user profile:`;

  // Build detailed user profile
  const profileDetails = [];
  if (age) profileDetails.push(`Age: ${age} years`);
  if (gender && gender !== "All") profileDetails.push(`Gender: ${gender}`);
  if (caste && caste !== "All") profileDetails.push(`Category: ${caste}`);
  if (profession && profession !== "All") {
    profileDetails.push(`Profession: ${profession}`);
    if (profession === "Student" && standard && standard !== "All") {
      profileDetails.push(`Education Level: ${standard}`);
    }
  }
  if (stateFilter && stateFilter !== "All") {
    profileDetails.push(`Location: ${stateFilter}`);
  }
  if (categoryFilter && categoryFilter !== "All") {
    profileDetails.push(`Interest Area: ${categoryFilter}`);
  }

  if (profileDetails.length > 0) {
    prompt += `\n\nUSER PROFILE:\n${profileDetails.join('\n')}`;
  }

  return `${prompt}

ANALYSIS REQUIREMENTS:
1) Consider both direct eligibility matches and beneficial schemes for this profile
2) Include Central government schemes applicable nationwide
3) Include state-specific schemes if location is provided
4) Prioritize schemes with active enrollment and clear application processes
5) Focus on schemes that provide maximum benefit for this user type

OUTPUT FORMAT (JSON Array):
[
  {
    "name": "Official Scheme Name",
    "description": "Comprehensive description of benefits, purpose, and impact (100-150 words)",
    "department": "Responsible Ministry/Department/Agency",
    "category": "Primary category (Agriculture/Education/Health/Business/Social Welfare/Employment/Housing)",
    "eligibility_summary": "Clear, specific eligibility criteria in simple language",
    "url": "Official government website URL or empty string if unavailable"
  }
]

QUALITY STANDARDS:
- Return 3-7 most relevant schemes (prioritize quality over quantity)
- Ensure all information is accurate and current
- Use official scheme names and terminology
- Provide actionable eligibility criteria
- Include official URLs when available
- Return empty array [] if no relevant schemes found

Generate the JSON response:`;
}
