const AssignedWorkout = require("../models/AssignedWorkout");
const User = require("../models/User");
exports.assignWorkout = async (req, res) => {
  try {
    const { swimmerId, workoutId, date } = req.body;

    // Coach can only assign to his swimmers
    if (req.user.role === "coach") {
      const swimmer = await User.findOne({
        _id: swimmerId,
        assignedCoach: req.user.id,
      });

      if (!swimmer) {
        return res.status(403).json(
          "You can only assign workouts to your swimmers"
        );
      }
    }

    const assignment = await AssignedWorkout.create({
      swimmerId,
      workoutId,
      date,
    });

    res.json(assignment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAssignments = async (req, res) => {
  try {

    if (req.user.role === "admin") {
      const data = await AssignedWorkout.find()
        .populate("swimmerId", "name")
        .populate("workoutId", "setName");

      return res.json(data);
    }

    const swimmers = await User.find({
      assignedCoach: req.user.id,
      role: "swimmer",
    }).select("_id");

    const swimmerIds = swimmers.map(
      (s) => s._id
    );

    const data = await AssignedWorkout.find({
      swimmerId: { $in: swimmerIds },
    })
      .populate("swimmerId", "name")
      .populate("workoutId", "setName");

    res.json(data);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getMyWorkouts = async (req, res) => {
  try {
    const data = await AssignedWorkout.find({
      swimmerId: req.user.id,
      status: "pending"
    }).populate("workoutId");

    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.completeWorkout = async (req, res) => {
  try {
    const { feedback } = req.body;

    const updated = await AssignedWorkout.findByIdAndUpdate(
      req.params.id,
      {
        status: "completed",
        feedback
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment =
      await AssignedWorkout.findByIdAndDelete(
        req.params.id
      );

    if (!assignment) {
      return res
        .status(404)
        .json("Assignment not found");
    }

    res.json({
      success: true,
      message: "Assignment deleted",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAssignmentsBySwimmer = async (req, res) => {
  
  try {
    if (req.user.role === "coach") {

      const swimmer =
        await User.findOne({
          _id: req.params.userId,
          assignedCoach: req.user.id,
        });
    
      if (!swimmer) {
        return res.status(403).json(
          "Access denied"
        );
      }
    }
    const assignments = await AssignedWorkout.find({
      swimmerId: req.params.userId,
    })
      .populate("swimmerId", "name")
      .populate("workoutId");

    res.json(assignments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
