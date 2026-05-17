const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  swimmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },

  mainSetLogs: [
    {
      setIndex: Number,
      reps: [String]
    }
  ],

  notes: String,
  rating: Number,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", logSchema);