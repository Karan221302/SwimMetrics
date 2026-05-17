const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  description: String,
  distance: Number
});

const TrainingSetSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    level: String,
    warmup: [SetSchema],
    mainSet: [SetSchema],
    cooldown: [SetSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainingSet", TrainingSetSchema);