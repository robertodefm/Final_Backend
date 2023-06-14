const { Habit } = require('../sequelize.js');

exports.getAllHabits = (req, res, next) => {
  Habit.findAll()
    .then(habits => {
      res.status(200).json(habits);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error getting habits' });
    });
};

exports.createHabit = (req, res, next) => {
  const { time } = req.body;

  Habit.create({ time })
    .then(habit => {
      res.status(201).json(habit);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error creating the habit' });
    });
};

exports.updateHabit = (req, res, next) => {
  const habitId = req.params.id;
  const updatedData = req.body;

  Habit.findByPk(habitId)
    .then(habit => {
      if (habit) {
        return habit.update(updatedData);
      } else {
        res.status(404).json({ error: 'Habit Not found' });
      }
    })
    .then(updatedHabit => {
      res.status(200).json(updatedHabit);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating habit' });
    });
};

exports.deleteHabit = (req, res, next) => {
  const habitId = req.params.id;

  Habit.findByPk(habitId)
    .then(habit => {
      if (habit) {
        habit.destroy();
        res.send("Habit by id: "+habitId+" deleted")
      } else {
        res.status(404).json({ error: 'Habit Not found' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to remove the habit' });
    });
};
