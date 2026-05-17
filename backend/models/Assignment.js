const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  swimmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "TrainingSet" },
  date: String
});

module.exports = mongoose.model("Assignment", assignmentSchema);