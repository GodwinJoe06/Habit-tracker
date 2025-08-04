const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, habitController.addHabit);

router.get("/filter", authMiddleware, habitController.getHabitsByDate);

module.exports = router;
