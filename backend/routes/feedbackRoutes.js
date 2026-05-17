const router = require("express").Router();
const { verifyToken, allowRoles } = require("../middleware/auth");

const { addFeedback, getFeedback } = require("../controllers/feedbackController");

router.post("/", verifyToken, allowRoles("swimmer"), addFeedback);

router.get("/", verifyToken, allowRoles("coach", "admin"), getFeedback);

module.exports = router;