const router = require("express").Router();

const {
  verifyToken,
  allowRoles,
} = require("../middleware/auth");

const {
  createTrainingSet,
  getTrainingSets,
  deleteTrainingSet,
  duplicateTrainingSet,
  getTrainingSetById,
  updateTrainingSet,
} = require("../controllers/trainingSetController");

// CREATE WORKOUT
router.post(
  "/",
  verifyToken,
  allowRoles("coach", "admin"),
  createTrainingSet
);

// GET ALL WORKOUTS
router.get(
  "/",
  verifyToken,
  getTrainingSets
);

// GET SINGLE WORKOUT
router.get(
  "/:id",
  verifyToken,
  getTrainingSetById
);

// UPDATE WORKOUT
router.put(
  "/:id",
  verifyToken,
  allowRoles("coach", "admin"),
  updateTrainingSet
);

// DELETE WORKOUT
router.delete(
  "/:id",
  verifyToken,
  allowRoles("coach", "admin"),
  deleteTrainingSet
);

// DUPLICATE WORKOUT
router.post(
  "/duplicate/:id",
  verifyToken,
  allowRoles("coach", "admin"),
  duplicateTrainingSet
);

module.exports = router;