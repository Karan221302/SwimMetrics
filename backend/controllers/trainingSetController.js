const TrainingSet = require("../models/TrainingSet");

// CREATE WORKOUT
exports.createTrainingSet = async (req, res) => {
  try {
    const workout = await TrainingSet.create(req.body);

    res.json(workout);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error creating workout");
  }
};

// GET ALL WORKOUTS
exports.getTrainingSets = async (req, res) => {
  try {
    const workouts = await TrainingSet.find()
      .sort({ createdAt: -1 });

    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching workouts");
  }
};

// DELETE WORKOUT
exports.deleteTrainingSet = async (req, res) => {
  try {
    const workout = await TrainingSet.findById(
      req.params.id
    );

    if (!workout) {
      return res
        .status(404)
        .json("Workout not found");
    }

    await TrainingSet.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error deleting workout");
  }
};

// DUPLICATE WORKOUT
exports.duplicateTrainingSet = async (
  req,
  res
) => {
  try {
    const workout = await TrainingSet.findById(
      req.params.id
    );

    if (!workout) {
      return res
        .status(404)
        .json("Workout not found");
    }

    const duplicatedWorkout =
      await TrainingSet.create({
        name: `${workout.name} Copy`,
        category: workout.category,
        level: workout.level,
        warmup: workout.warmup,
        mainSet: workout.mainSet,
        cooldown: workout.cooldown,
      });

    res.json({
      success: true,
      message: "Workout duplicated",
      workout: duplicatedWorkout,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("Error duplicating workout");
  }
};

// GET SINGLE WORKOUT
exports.getTrainingSetById = async (
  req,
  res
) => {
  try {
    const workout = await TrainingSet.findById(
      req.params.id
    );

    if (!workout) {
      return res
        .status(404)
        .json("Workout not found");
    }

    res.json(workout);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching workout");
  }
};

// UPDATE WORKOUT
exports.updateTrainingSet = async (
  req,
  res
) => {
  try {
    const workout =
      await TrainingSet.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!workout) {
      return res
        .status(404)
        .json("Workout not found");
    }

    res.json({
      success: true,
      message: "Workout updated",
      workout,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error updating workout");
  }
};