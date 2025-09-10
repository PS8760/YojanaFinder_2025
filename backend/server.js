import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";
import rateLimit from "express-rate-limit";
// --- NEW: Import Firebase Admin SDK ---
import admin from "firebase-admin";

// --- NEW: Load Service Account Key ---
// Make sure you have the 'serviceAccountKey.json' file in your backend folder
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// --- NEW: Initialize Firebase Admin ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 8080;

// --- Check API Key ---
const { GEMINI_API_KEY } = process.env;
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env file");
  process.exit(1);
}

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Rate Limiter ---
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Try again later." },
});

// --- Prompt Builder ---
function buildPrompt(filters) {
  const {
    age,
    gender,
    caste,
    profession,
    stateFilter,
    categoryFilter,
    searchTerm,
    standard,
  } = filters;

  if (searchTerm?.trim()) {
    return `Find an Indian government scheme with the name "${searchTerm}". 
Provide details only for this scheme. 
Always include the official or trusted government website URL related to the scheme.`;
  }

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
Make the descriptions and eligibility summaries clear and concise for general users. 
Each scheme must include:
- name
- description
- department
- category
- eligibility_summary
- url (official or trusted government website related to the scheme)

If no schemes are found, return an empty array [].`;
}

// --- Routes ---
app.get("/", (_, res) => {
  res.json({ message: "✅ Yojana Finder API is running" });
});

app.post("/api/schemes", apiLimiter, async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty." });
    }

    const prompt = buildPrompt(req.body);

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
          url: { type: "STRING" }, // ✅ Added website field
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

    // --- Call Gemini API ---
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
      const err = await response.json();
      throw new Error(err.error?.message || response.statusText);
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Invalid response from Gemini API");

    res.json(JSON.parse(text));
  } catch (error) {
    console.error("❌ Backend Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch schemes. Please try again later." });
  }
});

// --- NEW: User Registration Endpoint ---
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, gender } = req.body;

    // Step 1: Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: `${firstName} ${lastName}`,
    });

    // Step 2: Save additional user data in Firestore
    const userData = {
      firstName,
      lastName,
      email,
      location,
      gender,
      createdAt: new Date().toISOString(),
    };
    // Use the user's unique ID (uid) from Auth as the document ID
    await db.collection("users").doc(userRecord.uid).set(userData);

    res.status(201).json({
      message: "User created successfully!",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    // Provide a more specific error message to the frontend
    if (error.code === "auth/email-already-exists") {
      return res
        .status(400)
        .json({ error: "This email address is already in use." });
    }
    res
      .status(500)
      .json({ error: "Failed to register user. Please try again later." });
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
