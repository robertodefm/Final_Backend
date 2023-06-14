const { Recycling } = require('../sequelize.js');

exports.getAllRecyclings = (req, res, next) => {
  Recycling.findAll()
    .then(recyclings => {
      res.status(200).json(recyclings);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error getting recycling' });
    });
};

exports.createRecycling = (req, res, next) => {
  const { materialType, quantity } = req.body;

  Recycling.create({ materialType, quantity })
    .then(recycling => {
      res.status(201).json(recycling);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error creating recycling' });
    });
};

exports.updateRecycling = (req, res, next) => {
  const recyclingId = req.params.id;
  const updatedData = req.body;

  Recycling.findByPk(recyclingId)
    .then(recycling => {
      if (recycling) {
        return recycling.update(updatedData);
      } else {
        res.status(404).json({ error: 'Recycling Not found' });
      }
    })
    .then(updatedRecycling => {
      res.status(200).json(updatedRecycling);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating recycling' });
    });
};

exports.deleteRecycling = (req, res, next) => {
  const recyclingId = req.params.id;

  Recycling.findByPk(recyclingId)
    .then(recycling => {
      if (recycling) {
        recycling.destroy();
        res.send("Recycling by id: "+recyclingId+" deleted")
      } else {
        res.status(404).json({ error: 'Recycling Not found' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error deleting recycling' });
    });
};
