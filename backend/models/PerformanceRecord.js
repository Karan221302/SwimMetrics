const mongoose = require("mongoose");

const performanceRecordSchema = new mongoose.Schema({
  swimmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssignedWorkout",
  },

  stroke: {
    type: String,
    enum: [
      "Freestyle",
      "Backstroke",
      "Breaststroke",
      "Butterfly",
      "IM",
    ],
    required: true,
  },

  distance: {
    type: Number,
    required: true,
  },

  minutes: Number,
  seconds: Number,
  milliseconds: Number,

  totalSeconds: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "PerformanceRecord",
  performanceRecordSchema
);