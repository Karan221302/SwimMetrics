const mongoose = require("mongoose");

const timeFormat = /^([0-5]?[0-9]):([0-5][0-9]):([0-9]{2})$/;

const trainingLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  stroke: {
    type: String,
    enum: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM"],
    required: true
  },

  distance: {
    type: Number,
    enum: [50, 100, 200, 400, 800, 1500],
    required: true
  },

  sets: {
    type: Number,
    default: 1
  },

  laps: {
    type: Number,
    required: true
  },

  totalTime: {
    type: String,
    match: timeFormat,
    required: true
  },

  lapTimes: [
    {
      lap: Number,
      time: {
        type: String,
        match: timeFormat
      }
    }
  ],

  notes: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

trainingLogSchema.pre("save", function (next) {
  if (this.stroke !== "Freestyle" && this.distance > 200) {
    return next(new Error("Only Freestyle supports >200m"));
  }

  if (this.stroke === "IM" && ![200, 400].includes(this.distance)) {
    return next(new Error("IM only allowed for 200m or 400m"));
  }

  next();
});

module.exports = mongoose.model("TrainingLog", trainingLogSchema);