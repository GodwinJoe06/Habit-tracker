const Habit = require("../models/Habit");

// Add new habit
exports.addHabit = async (req, res) => {
  try {
    const { habitName, type } = req.body;
    const userId = req.user.id;
    const habit = new Habit({
      userId  ,
      habitName,
      type,
      timestamp: new Date()
    });

    console.log('Adding habit:', habit);
    
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getHabitsByDate = async (req, res) => {
  try {
    const { date } = req.query; 

    if (!date) {
      return res.status(400).json({ error: "Date query param is required" });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const habits = await Habit.find({
      userId: req.user.id,
      timestamp: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};