import aiService from "../services/ai.service.js";

const getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({ error: "Code is required to generate a review!" });
    }

    const response = await aiService(code);
    res.status(200).json({ review: response });

  } catch (err) {
    console.error("AI Review Error:", err.message);

    res.status(500).json({
      error: "Failed to generate review. Please try again later.",
      details: err.message, // optional, remove in production
    });
  }
};

export default getReview;
