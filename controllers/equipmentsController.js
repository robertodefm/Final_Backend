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
      res.status(500).json({ error: 'Error creating equipment' });
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
        res.status(404).json({ error: 'Equipment Not found' });
      }
    })
    .then(updatedEquipment => {
      res.status(200).json(updatedEquipment);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating the equipment' });
    });
};

exports.deleteEquipment = (req, res, next) => {
  const equipmentId = req.params.id;

  Equipment.findByPk(equipmentId)
    .then(equipment => {
      if (equipment) {
        equipment.destroy();
        res.send("Equipment by id: "+equipmentId+" deleted")
      } else {
        res.status(404).json({ error: 'Equipment Not found' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to delete equipment' });
    });
};
