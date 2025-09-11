/**
 * Builds a dynamic prompt for Gemini API based on user filters.
 * Priority: description > searchTerm > filters
 * @param {Object} filters
 * @returns {string} Prompt text for Gemini
 */
export function buildPrompt(filters) {
  const {
    description,
    searchTerm,
    age,
    gender,
    caste,
    profession,
    stateFilter,
    categoryFilter,
    standard,
  } = filters;

  // --- Priority 1: Description ---
  if (description?.trim()) {
    return `Based on the following user description: "${description}", 
find the most relevant government schemes in India.

Each scheme must include:
- name
- description
- department
- category
- eligibility_summary
- url (official or trusted government website)

If no schemes are found, return an empty array [].`;
  }

  // --- Priority 2: Search by Name ---
  if (searchTerm?.trim()) {
    return `Find an Indian government scheme with the name "${searchTerm}". 
Return details only for this scheme.

Each scheme must include:
- name
- description
- department
- category
- eligibility_summary
- url (official or trusted government website)

If no schemes are found, return an empty array [].`;
  }

  // --- Priority 3: Filters ---
  let prompt = `Find relevant government schemes in India based on this user profile:`;
  if (age) prompt += ` Age: ${age}.`;
  if (gender && gender !== "All") prompt += ` Gender: ${gender}.`;
  if (caste && caste !== "All") prompt += ` Caste: ${caste}.`;
  if (profession && profession !== "All")
    prompt += ` Profession: ${profession}.`;
  if (profession === "Student" && standard && standard !== "All")
    prompt += ` Standard: ${standard}.`;
  if (stateFilter && stateFilter !== "All")
    prompt += ` State: ${stateFilter} or Central schemes.`;
  if (categoryFilter && categoryFilter !== "All")
    prompt += ` Category: ${categoryFilter}.`;

  return `${prompt} 

Each scheme must include:
- name
- description
- department
- category
- eligibility_summary
- url (official or trusted government website)

If no schemes are found, return an empty array [].`;
}
