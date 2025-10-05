import { fetchSchemesFromGroq } from "../services/groqLLM.js";

export const getSchemes = async (req, res) => {
  try {
    console.log('🎯 Received scheme request:', JSON.stringify(req.body, null, 2));

    const filters = req.body;

    // Validate request body
    if (!filters || typeof filters !== 'object') {
      return res.status(400).json({
        error: "Invalid request body. Expected an object with user filters."
      });
    }

    // Call Groq AI service
    const schemes = await fetchSchemesFromGroq(filters);

    console.log(`✅ Successfully fetched ${schemes.length} schemes`);

    res.json({
      success: true,
      count: schemes.length,
      schemes: schemes
    });

  } catch (error) {
    console.error("❌ Error in getSchemes:", error.message);
    console.error("Stack trace:", error.stack);

    res.status(500).json({
      success: false,
      error: "Failed to fetch schemes from AI service",
      message: error.message
    });
  }
};
