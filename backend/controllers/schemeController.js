import fetch from "node-fetch";

export const getSchemes = async (req, res) => {
  try {
    const body = req.body;

    const response = await fetch("http://localhost:8091/api/schemes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in getSchemes:", error);
    res.status(500).json({ error: "Failed to fetch schemes" });
  }
};
