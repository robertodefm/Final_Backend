const { HabitEquipment } = require('../sequelize.js');

exports.createHabitEquipment = (req, res, next) => {
  // Obtener los datos del equipo de hábito desde req.body

  HabitEquipment.create({/* datos del equipo de hábito */})
    .then(habitEquipment => {
      res.status(201).json(habitEquipment);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el equipo de hábito' });
    });
};


exports.updateHabitEquipment = (req, res, next) => {
  const habitEquipmentId = req.params.id;
  const updatedData = req.body;

  HabitEquipment.findByPk(habitEquipmentId)
    .then(habitEquipment => {
      if (habitEquipment) {
        return habitEquipment.update(updatedData);
      } else {
        throw new Error('Equipo de hábito no encontrado');
      }
    })
    .then(updatedHabitEquipment => {
      res.status(200).json(updatedHabitEquipment);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar el equipo de hábito' });
    });
};


exports.deleteHabitEquipment = (req, res, next) => {
  const habitEquipmentId = req.params.id;

  HabitEquipment.findByPk(habitEquipmentId)
    .then(habitEquipment => {
      if (habitEquipment) {
        return habitEquipment.destroy();
      } else {
        throw new Error('Equipo de hábito no encontrado');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar el equipo de hábito' });
    });
};
