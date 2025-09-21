import fetch from "node-fetch";
import "dotenv/config";
import { buildPrompt } from "../utils/promptBuilder.js";

const { GEMINI_API_KEY } = process.env;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env file");
  process.exit(1);
}

/**
 * Calls Gemini API with the constructed prompt.
 * @param {Object} filters - user input filters
 * @returns {Promise<Array>} - list of schemes
 */
export async function fetchSchemesFromLLM(filters) {
  const prompt = buildPrompt(filters);

  const schema = {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        description: { type: "STRING" },
        department: { type: "STRING" },
        category: { type: "STRING" },
        eligibility_summary: { type: "STRING" },
        url: { type: "STRING" },
      },
      required: [
        "name",
        "description",
        "department",
        "category",
        "eligibility_summary",
        "url",
      ],
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || response.statusText);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Invalid response from Gemini API");
  }

  return JSON.parse(text);
}
