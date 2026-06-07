const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  swimmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssignedWorkout",
    required: true,
  },
  

  mainSetLogs: [
    {
      setIndex: Number,
      reps: [String],
    },
  ],

  notes: String,
  rating: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate logs
logSchema.index(
  {
    swimmer: 1,
    assignment: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Log", logSchema);