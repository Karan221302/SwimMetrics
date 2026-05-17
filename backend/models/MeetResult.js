const mongoose = require("mongoose");

const meetResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  meetName: String,
  event: String,
  stroke: String,
  distance: Number,
  time: String,
  rank: Number,
  date: String
});

module.exports = mongoose.model("MeetResult", meetResultSchema);