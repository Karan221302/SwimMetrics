const router = require("express").Router();
const { verifyToken, allowRoles } = require("../middleware/auth");
const {
  createTrainingSet,
  getTrainingSets
} = require("../controllers/trainingSetController");

router.post("/", verifyToken, allowRoles("coach", "admin"), createTrainingSet);
router.get("/", verifyToken, getTrainingSets);

module.exports = router;