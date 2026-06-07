const router = require("express").Router();
const { verifyToken, allowRoles } = require("../middleware/auth");

const {
  assignWorkout,
  getAssignments,
  completeWorkout,
  getMyAssignments,
  getMyWorkouts,
  deleteAssignment,
  getAssignmentsBySwimmer
} = require("../controllers/assignController");

router.post("/", verifyToken, allowRoles("coach"), assignWorkout);
router.get("/", verifyToken, allowRoles("coach", "admin"), getAssignments);
router.put("/:id/complete", verifyToken, allowRoles("swimmer"), completeWorkout);
router.get(
  "/swimmer/:userId",
  verifyToken,
  allowRoles("coach", "admin"),
  getAssignmentsBySwimmer
);
router.get("/my", verifyToken, allowRoles("swimmer"), getMyWorkouts);
router.delete("/:id", verifyToken, allowRoles("coach"), deleteAssignment)

module.exports = router;