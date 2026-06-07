const router = require("express").Router();

const {
  verifyToken,
  allowRoles,
} = require("../middleware/auth");

const {
  getMyPerformance,
  getPerformanceSummary,
  getSwimmerAnalytics,
} = require(
  "../controllers/performanceController"
);

router.get(
  "/my",
  verifyToken,
  allowRoles("swimmer"),
  getMyPerformance
);

router.get(
  "/summary",
  verifyToken,
  allowRoles("swimmer"),
  getPerformanceSummary
);

router.get(
  "/analytics/:userId",
  verifyToken,
  getSwimmerAnalytics
)

module.exports = router;