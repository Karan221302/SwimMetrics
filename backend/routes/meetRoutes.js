const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addMeet, getMeet } = require("../controllers/meetController");

router.post("/", auth, addMeet);
router.get("/", auth, getMeet);

module.exports = router;