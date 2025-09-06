import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config"; // Loads .env file variables into process.env
import rateLimit from "express-rate-limit"; // Import the rate-limiter package

// --- 1. Server Setup ---
const app = express();
const port = 3010; // You can change this port if needed

// --- 2. Environment Variable Check ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error(
    "FATAL ERROR: GEMINI_API_KEY is not defined in your .env file."
  );
  process.exit(1); // Exit the application
}

// --- 3. Middleware ---
app.use(cors());
app.use(express.json());

// --- 4. Rate Limiter ---
// A middleware to prevent API abuse by limiting request frequency.
// This is set to 15 requests per minute, matching the Gemini free tier limit.
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // Limit each IP to 15 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many requests from this IP, please try again after a minute.",
  },
});

// --- 5. Routes ---

/**
 * Health Check Route
 */
app.get("/", (req, res) => {
  res.json({ message: "Welcome! The Yojana Finder API is running correctly." });
});

/**
 * Main API Endpoint for Fetching Schemes
 * This route is now protected by the rate limiter.
 */
app.post("/api/schemes", apiLimiter, async (req, res) => {
  // Destructure all expected filter criteria from the request body.
  const {
    age,
    gender,
    caste,
    profession,
    stateFilter,
    categoryFilter,
    searchTerm,
  } = req.body;

  // Dynamically build a detailed prompt based on the user's input.
  let prompt = `Find relevant government schemes in India based on the following user profile.`;
  if (age) prompt += ` The user is ${age} years old.`;
  if (gender && gender !== "All") prompt += ` Their gender is ${gender}.`;
  if (caste && caste !== "All")
    prompt += ` They belong to the ${caste} category.`;
  if (profession && profession !== "All")
    prompt += ` Their profession is ${profession}.`;
  if (stateFilter && stateFilter !== "All")
    prompt += ` They are looking for schemes in the state of ${stateFilter} or Central schemes.`;
  if (categoryFilter && categoryFilter !== "All")
    prompt += ` The schemes should be related to the category of ${categoryFilter}.`;
  if (searchTerm)
    prompt += ` The scheme name might contain the term "${searchTerm}".`;
  prompt += ` Prioritize schemes that most closely match these criteria. Make the descriptions and eligibility summaries clear and concise for a general audience. If no schemes are found, return an empty array [].`;

  // Define the exact JSON structure we expect from the AI model.
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
      },
      required: [
        "name",
        "description",
        "department",
        "category",
        "eligibility_summary",
      ],
    },
  };

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
      tools: [{ google_search: {} }], // Use Google Search for real-time, accurate info
    };

    const geminiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      const errorDetails = await geminiResponse.json();
      console.error("Gemini API Error Details:", errorDetails);
      throw new Error(`Gemini API Error: ${geminiResponse.statusText}`);
    }

    const result = await geminiResponse.json();

    if (!result.candidates || !result.candidates[0].content.parts[0].text) {
      throw new Error("Invalid response structure from Gemini API.");
    }

    const jsonText = result.candidates[0].content.parts[0].text;
    const parsedSchemes = JSON.parse(jsonText);

    res.json(parsedSchemes);
  } catch (error) {
    console.error("--- Backend Error Log ---");
    console.error("Timestamp:", new Date().toISOString());
    console.error("Request Body:", req.body);
    console.error("Error Object:", error);
    console.error("--- End of Log ---");

    res.status(500).json({
      error:
        "Failed to fetch schemes from the AI model. Please check server logs for details.",
    });
  }
});

// --- 6. Start Server ---
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
