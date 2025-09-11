import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import "dotenv/config";
import { fetchSchemesFromLLM } from "./services/llm.js";
import { admin, db } from "./services/firebase.js";

const app = express();
const port = process.env.PORT || 8080;

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

// --- Health Route ---
app.get("/", (_, res) => {
  res.json({ message: "✅ Yojana Finder API is running" });
});

// --- Schemes Route ---
app.post("/api/schemes", apiLimiter, async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty." });
    }

    const schemes = await fetchSchemesFromLLM(req.body);
    res.json(schemes);
  } catch (error) {
    console.error("❌ Backend Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch schemes. Please try again later." });
  }
});

// --- User Registration ---
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, gender } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    const userData = {
      firstName,
      lastName,
      email,
      location,
      gender,
      createdAt: new Date().toISOString(),
    };

    await db.collection("users").doc(userRecord.uid).set(userData);

    res.status(201).json({
      message: "User created successfully!",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
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
