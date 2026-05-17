const router = require("express").Router();
const { verifyToken, allowRoles } = require("../middleware/auth");

const {
  assignWorkout,
  getAssignments,
  completeWorkout,
  getMyAssignments,
  getMyWorkouts
} = require("../controllers/assignController");

router.post("/", verifyToken, allowRoles("coach"), assignWorkout);
router.get("/", verifyToken, allowRoles("coach", "admin"), getAssignments);
router.put("/:id/complete", verifyToken, allowRoles("swimmer"), completeWorkout);
router.get("/my", verifyToken, allowRoles("swimmer"), getMyWorkouts);
module.exports = router;