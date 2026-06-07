const router = require("express").Router();

const {
  verifyToken,
  allowRoles,
} = require("../middleware/auth");

const {
  getSummary,
} = require("../controllers/reportController");

router.get(
  "/summary",
  verifyToken,
  allowRoles("coach", "admin"),
  getSummary
);

module.exports = router;