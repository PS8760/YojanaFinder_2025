import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import "dotenv/config";
import { fetchSchemesFromGroq } from "./services/groqLLM.js";
import { admin, db } from "./services/firebase.js";
import { generateLatestSchemes } from "./services/aiSchemes.js";
import { sendContactEmail, sendEmailChangeNotification } from "./services/emailService.js";

const app = express();
const port = process.env.PORT || 8080;

// --- Middleware ---
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: [
    'https://yojana-finder-2025.vercel.app',  // Your frontend URL
    /\.vercel\.app$/,
  ]
};

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

    // Extract language from request body or headers
    const language = req.body.language || req.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'en';

    const schemes = await fetchSchemesFromGroq(req.body, language);
    res.json(schemes);
  } catch (error) {
    console.error("❌ Backend Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch schemes. Please try again later." });
  }
});

// --- Latest Schemes Route ---
app.get("/api/latest-schemes", async (req, res) => {
  try {
    // Extract language from query parameters or headers
    const language = req.query.language || req.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'en';
    const latestSchemes = await generateLatestSchemes(language);
    res.json(latestSchemes);
  } catch (error) {
    console.error("❌ Latest Schemes Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch latest schemes. Please try again later." });
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

// --- User Profile Routes ---
app.get("/api/profile/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User profile not found." });
    }

    res.json(userDoc.data());
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch profile. Please try again later." });
  }
});

app.put("/api/profile/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const profileData = req.body;

    console.log(`📝 Profile update request for UID: ${uid}`);
    console.log('📋 Profile data received:', JSON.stringify(profileData, null, 2));

    // Validate UID
    if (!uid || uid.trim() === '') {
      console.log('❌ Invalid UID provided');
      return res.status(400).json({ error: "Valid user ID is required." });
    }

    // Validate required fields
    if (!profileData.firstName || !profileData.email) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: "First name and email are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      console.log('❌ Invalid email format');
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    // Check if user document exists, create if it doesn't
    const userDoc = await db.collection("users").doc(uid).get();
    let oldUserData = null;

    if (!userDoc.exists) {
      console.log('📝 User document not found, creating new profile...');
      // Create new user document with the provided data
      const newUserData = {
        ...profileData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await db.collection("users").doc(uid).set(newUserData);
      console.log('✅ New user profile created successfully');

      return res.json({
        success: true,
        message: "Profile created successfully!",
        created: true,
        updatedAt: newUserData.updatedAt
      });
    } else {
      oldUserData = userDoc.data();
    }

    // Prepare update data
    const updateData = {
      ...profileData,
      updatedAt: new Date().toISOString(),
    };

    // Remove any undefined or null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null) {
        delete updateData[key];
      }
    });

    console.log('💾 Updating user document...');
    await db.collection("users").doc(uid).update(updateData);

    // Check if email was changed and send notification
    if (oldUserData && oldUserData.email && oldUserData.email !== profileData.email) {
      console.log('📧 Email change detected, sending notification...');

      try {
        const emailChangeData = {
          userName: `${profileData.firstName} ${profileData.lastName}`.trim(),
          oldEmail: oldUserData.email,
          newEmail: profileData.email,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          userAgent: req.get('User-Agent') || 'Unknown',
          ipAddress: req.ip || req.connection.remoteAddress || 'Unknown'
        };

        const emailResult = await sendEmailChangeNotification(emailChangeData);

        if (emailResult.success) {
          console.log('✅ Email change notification sent successfully');
        } else {
          console.log('⚠️ Email change notification failed, but profile update continues');
        }
      } catch (emailError) {
        console.error('❌ Email notification error:', emailError.message);
        // Don't fail the profile update if email notification fails
      }
    }

    console.log('✅ Profile updated successfully');
    res.json({
      success: true,
      message: "Profile updated successfully!",
      updatedAt: updateData.updatedAt
    });

  } catch (error) {
    console.error("❌ Profile Update Error:", error.message);
    console.error("Error details:", {
      name: error.name,
      code: error.code,
      stack: error.stack?.split('\n').slice(0, 3).join('\n')
    });

    // Provide more specific error messages
    if (error.code === 'not-found') {
      return res.status(404).json({ error: "User profile not found." });
    } else if (error.code === 'permission-denied') {
      return res.status(403).json({ error: "Permission denied. Unable to update profile." });
    } else if (error.code === 'unavailable') {
      return res.status(503).json({ error: "Database temporarily unavailable. Please try again." });
    }

    res.status(500).json({ error: "Failed to update profile. Please try again later." });
  }
});

// --- Enhanced Contact Form Route ---
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Enhanced validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (name.length < 2) {
      return res.status(400).json({ error: "Name must be at least 2 characters long." });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: "Message must be at least 10 characters long." });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: "new",
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown'
    };

    // Save to Firestore
    const docRef = await db.collection("contacts").add(contactData);

    // Send email notification
    try {
      await sendContactEmail(contactData);
      console.log(`📧 Email notification sent for submission: ${docRef.id}`);
    } catch (emailError) {
      console.error('Email sending failed, but form was saved:', emailError.message);
      // Continue execution even if email fails
    }

    // Log successful submission
    console.log(`📩 New contact form submission: ${docRef.id} from ${email}`);

    res.status(201).json({
      message: "Thank you for contacting us! We'll get back to you within 24 hours.",
      submissionId: docRef.id
    });
  } catch (error) {
    console.error("❌ Contact Form Error:", error.message);
    res.status(500).json({ error: "Failed to submit contact form. Please try again later." });
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
