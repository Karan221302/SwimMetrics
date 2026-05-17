const router = require("express").Router();
const { verifyToken, allowRoles } = require("../middleware/auth");

const {
  addTraining,
  getTraining,
  getAllTraining,
  deleteTraining,
  getLogsByUser,
  getAnalytics
} = require("../controllers/trainingController");

router.post("/", verifyToken, allowRoles("swimmer"), addTraining);

router.get("/", verifyToken, allowRoles("swimmer","coach"), getTraining);


router.get("/all", verifyToken, allowRoles("coach", "admin"), getAllTraining);

router.get("/:userId", verifyToken, getLogsByUser);


router.delete("/:id", verifyToken, allowRoles("admin", "coach"), deleteTraining);

router.get("/analytics/:userId", verifyToken, getAnalytics);
module.exports = router;