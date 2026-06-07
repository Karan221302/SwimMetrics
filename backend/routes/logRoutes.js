const router = require("express").Router();
const { verifyToken, allowRoles } = require("../middleware/auth");

const {
  createLog,
  getMyLogs,
  getLogsBySwimmer
} = require("../controllers/logController");

router.post("/", verifyToken, allowRoles("swimmer"), createLog);
router.get("/my", verifyToken, allowRoles("swimmer"), getMyLogs);

router.get("/", verifyToken, allowRoles("coach","admin"), getLogsBySwimmer);

module.exports = router;