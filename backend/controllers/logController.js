const Log = require("../models/Log");
const Assignment = require("../models/Assignment");

exports.createLog = async (req, res) => {
  try {
    const { assignmentId, mainSetLogs, notes, rating } = req.body;

    const log = await Log.create({
      swimmer: req.user.id,
      assignment: assignmentId,
      mainSetLogs,
      notes,
      rating
    });

    res.json(log);
  } catch (err) {
    res.status(500).json({ message: "Error saving log" });
  }
};

exports.getMyLogs = async (req, res) => {
  try {
    const logs = await Log.find({ swimmer: req.user.id })
      .populate({
        path: "assignment",
        populate: { path: "workoutId" }
      });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs" });
  }
};

exports.getLogsBySwimmer = async (req, res) => {
  try {
    const { swimmerId } = req.query;

    const logs = await Log.find({ swimmer: swimmerId })
      .populate({
        path: "assignment",
        populate: { path: "workoutId" }
      })
      .sort({ createdAt:-1});

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs" });
  }
};