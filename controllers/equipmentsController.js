const { Equipment } = require('../sequelize.js');

exports.getAllEquipments = (req, res, next) => {
  Equipment.findAll()
    .then(equipments => {
      res.status(200).json(equipments);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener los equipos' });
    });
};

exports.createEquipment = (req, res, next) => {
  const { name, consume } = req.body;

  Equipment.create({ name, consume })
    .then(equipment => {
      res.status(201).json(equipment);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el equipo' });
    });
};

exports.updateEquipment = (req, res, next) => {
  const equipmentId = req.params.id;
  const updatedData = req.body;

  Equipment.findByPk(equipmentId)
    .then(equipment => {
      if (equipment) {
        return equipment.update(updatedData);
      } else {
        throw new Error('Equipo no encontrado');
      }
    })
    .then(updatedEquipment => {
      res.status(200).json(updatedEquipment);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar el equipo' });
    });
};

exports.deleteEquipment = (req, res, next) => {
  const equipmentId = req.params.id;

  Equipment.findByPk(equipmentId)
    .then(equipment => {
      if (equipment) {
        return equipment.destroy();
      } else {
        throw new Error('Equipo no encontrado');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar el equipo' });
    });
};
