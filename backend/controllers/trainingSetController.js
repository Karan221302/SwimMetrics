const TrainingSet = require("../models/TrainingSet");

exports.createTrainingSet = async (req, res) => {
  try {
    const workout = await TrainingSet.create(req.body);
    res.json(workout);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error creating workout");
  }
};

exports.getTrainingSets = async (req, res) => {
  try {
    const workouts = await TrainingSet.find().sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json("Error fetching workouts");
  }
};