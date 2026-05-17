const AssignedWorkout = require("../models/AssignedWorkout");
const Assignment = require("../models/Assignment");

exports.assignWorkout = async (req, res) => {
  try {
    const { swimmerId, workoutId, date } = req.body;

    const assignment = await AssignedWorkout.create({
      swimmerId,
      workoutId,
      date
    });

    res.json(assignment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const data = await AssignedWorkout.find()
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
      swimmerId: req.user.id
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



