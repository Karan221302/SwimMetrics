const MeetResult = require("../models/MeetResult");

exports.addMeet = async (req, res) => {
  const meet = await MeetResult.create(req.body);
  res.json(meet);
};

exports.getMeet = async (req, res) => {
  const meets = await MeetResult.find({ userId: req.user.id });
  res.json(meets);
};