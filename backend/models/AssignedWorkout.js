const mongoose = require("mongoose");

const assignedWorkoutSchema = new mongoose.Schema({
  swimmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrainingSet"
  },
  date: String,

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  feedback: {
    type: String,
    default: ""
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AssignedWorkout", assignedWorkoutSchema);