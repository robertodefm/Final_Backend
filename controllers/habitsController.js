const { Habit } = require('../sequelize.js');

exports.getAllHabits = (req, res, next) => {
  Habit.findAll()
    .then(habits => {
      res.status(200).json(habits);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener los hábitos' });
    });
};

exports.createHabit = (req, res, next) => {
  const { time } = req.body;

  Habit.create({ time })
    .then(habit => {
      res.status(201).json(habit);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el hábito' });
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
        throw new Error('Hábito no encontrado');
      }
    })
    .then(updatedHabit => {
      res.status(200).json(updatedHabit);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar el hábito' });
    });
};

exports.deleteHabit = (req, res, next) => {
  const habitId = req.params.id;

  Habit.findByPk(habitId)
    .then(habit => {
      if (habit) {
        return habit.destroy();
      } else {
        throw new Error('Hábito no encontrado');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar el hábito' });
    });
};
