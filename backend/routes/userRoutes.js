const router = require("express").Router();
const { verifyToken, allowRoles } = require("../middleware/auth");

const {
  createUser,
  getUsers,
  updateRole,
  deleteUser,
  getSwimmers,
  getProfileStats,
  assignCoach
} = require("../controllers/userController");

// 🔥 Create user (admin only)
router.post("/", verifyToken, allowRoles("admin"), createUser);

// 🔥 Get swimmers (coach + admin)
router.get("/swimmers", verifyToken, allowRoles("coach", "admin"), getSwimmers);

// 🔥 Get all users
router.get("/", verifyToken, allowRoles("admin", "coach"), getUsers);
router.put(
  "/assign-coach",
  verifyToken,
  allowRoles("admin"),
  assignCoach
);

// 🔥 Update role (admin only)
router.put("/:id", verifyToken, allowRoles("admin"), updateRole);

// 🔥 Delete user (admin only)
router.delete("/:id", verifyToken, allowRoles("admin"), deleteUser);

router.get(
  "/profile",
  verifyToken,
  getProfileStats
);


module.exports = router;