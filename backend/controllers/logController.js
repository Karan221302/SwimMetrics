const Log = require("../models/Log");
const AssignedWorkout = require("../models/AssignedWorkout");
const PerformanceRecord= require("../models/PerformanceRecord")
exports.createLog = async (req, res) => {
  try {
    const {
      assignmentId,
      mainSetLogs,
      notes,
      rating,
    } = req.body;

    const assignment =
      await AssignedWorkout.findById(
        assignmentId
      );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    if (
      assignment.swimmerId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const existingLog =
      await Log.findOne({
        swimmer: req.user.id,
        assignment: assignmentId,
      });

    if (existingLog) {
      return res.status(400).json({
        message:
          "You have already logged this workout",
      });
    }

    const log = await Log.create({
      swimmer: req.user.id,
      assignment: assignmentId,
      mainSetLogs,
      notes,
      rating,
    });
    
    if (req.body.performance) {
      const {
        stroke,
        distance,
        time,
      } = req.body.performance;
    
      if (time) {
        const [m, s, ms] =
          time.split(":");
    
        const totalSeconds =
          Number(m) * 60 +
          Number(s) +
          Number(ms) / 100;
    
          const performanceRecord =
          await PerformanceRecord.create({
            swimmer: req.user.id,
            assignment: assignmentId,
            stroke,
            distance,
            minutes: Number(m),
            seconds: Number(s),
            milliseconds: Number(ms),
            totalSeconds,
          });
        
        
      }
    }

    assignment.status = "completed";
    await assignment.save();

    res.status(201).json(log);
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({
        message:
          "You have already logged this workout",
      });
    }

    res.status(500).json({
      message: "Error saving log",
    });
  }
};

exports.getMyLogs = async (req, res) => {
  try {
    const logs = await Log.find({
      swimmer: req.user.id,
    })
      .populate({
        path: "assignment",
        populate: {
          path: "workoutId",
        },
      })
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching logs",
    });
  }
};

const User = require("../models/User");

exports.getLogsBySwimmer = async (
  req,
  res
) => {
  try {
    const { swimmerId } = req.query;

    let filter = {};

    if (req.user.role === "coach") {

      const swimmers =
        await User.find({
          assignedCoach: req.user.id,
          role: "swimmer",
        }).select("_id");

      const swimmerIds =
        swimmers.map((s) => s._id);

      filter.swimmer = {
        $in: swimmerIds,
      };
    }

    if (swimmerId) {
      filter.swimmer = swimmerId;
    }

    const logs = await Log.find(filter)
      .populate("swimmer", "name email")
      .populate({
        path: "assignment",
        populate: {
          path: "workoutId",
        },
      })
      .sort({ createdAt: -1 });

    res.json(logs);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching logs",
    });
  }
};