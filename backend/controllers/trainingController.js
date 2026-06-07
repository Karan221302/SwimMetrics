const TrainingLog = require("../models/Log");

exports.addTraining = async (req, res) => {
  try {
    const log = await TrainingLog.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(log);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getTraining = async (req, res) => {
  try {
    const logs = await TrainingLog.find({ userId: req.user.id });
    res.json(logs);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getAllTraining = async (req, res) => {
  try {
    const logs = await TrainingLog.find().populate("userId", "name email");
    res.json(logs);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getLogsByUser = async (req, res) => {
  try {
    const logs = await TrainingLog.find({
      userId: req.params.userId
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    await TrainingLog.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    res.status(400).json(err.message);
  }
};
exports.getAnalytics = async (req, res) => {
  try {
    const logs = await TrainingLog.find({
      userId: req.params.userId
    });

    let totalDistance = 0;
    let bestTime = null;

    const strokeStats = {};

    logs.forEach((log) => {
      totalDistance += log.distance;

      if (!bestTime || log.time < bestTime) {
        bestTime = log.time;
      }

      if (!strokeStats[log.stroke]) {
        strokeStats[log.stroke] = 0;
      }

      strokeStats[log.stroke] += log.distance;
    });

    res.json({
      totalDistance,
      bestTime,
      strokeStats,
      logs
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};