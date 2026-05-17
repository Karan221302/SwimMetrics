const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bestTime: String,
  avgTime: String,
  totalDistance: Number
});

module.exports = mongoose.model("Analytics", analyticsSchema);