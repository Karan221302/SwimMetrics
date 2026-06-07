const User = require("../models/User");
const AssignedWorkout = require("../models/AssignedWorkout");
const Log = require("../models/Log");
const PerformanceRecord = require("../models/PerformanceRecord");

exports.getSummary = async (req, res) => {
  try {
    const swimmers = await User.countDocuments({
      role: "swimmer",
    });

    const assignments =
      await AssignedWorkout.countDocuments();

    const completed =
      await AssignedWorkout.countDocuments({
        status: "completed",
      });

    const logs = await Log.countDocuments();

    const performances =
      await PerformanceRecord.countDocuments();

    const completionRate =
      assignments > 0
        ? ((completed / assignments) * 100).toFixed(1)
        : 0;

    res.json({
      swimmers,
      assignments,
      completed,
      logs,
      performances,
      completionRate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};