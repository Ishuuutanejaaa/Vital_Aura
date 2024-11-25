const Feedback = require("../model/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, type, rating, comments } = req.body;

    if (!name || !email || !type || !rating || !comments) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feedback = new Feedback({ name, email, type, rating, comments });
    await feedback.save();

    res.status(200).json({ message: "Thank you for your feedback!" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
