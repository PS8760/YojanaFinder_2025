import fetch from "node-fetch";

export const callLLM = async (description) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `User need: "${description}". Suggest government schemes that match this user profile.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // Extract text safely
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Here you can parse into array if needed
    return output ? [output] : [];
  } catch (error) {
    console.error("LLM Error:", error);
    return [];
  }
};
