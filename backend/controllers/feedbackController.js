const Feedback = require("../models/Feedback");

exports.addFeedback = async (req, res) => {
  const fb = await Feedback.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(fb);
};

exports.getFeedback = async (req, res) => {
  const fb = await Feedback.find().populate("userId", "name");
  res.json(fb);
};