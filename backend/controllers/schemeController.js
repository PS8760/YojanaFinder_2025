import { callLLM } from "../llm/llm.js";

export const getSchemes = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    // Call Gemini (or other LLM) to process user description
    const schemes = await callLLM(description);

    if (!schemes || schemes.length === 0) {
      return res.json({ message: "No schemes found matching your criteria." });
    }

    res.json({ schemes });
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
