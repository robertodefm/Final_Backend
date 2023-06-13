const { Recycling } = require('../sequelize.js');

exports.getAllRecyclings = (req, res, next) => {
  Recycling.findAll()
    .then(recyclings => {
      res.status(200).json(recyclings);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener los materiales reciclados' });
    });
};

exports.createRecycling = (req, res, next) => {
  const { materialType, quantity } = req.body;

  Recycling.create({ materialType, quantity })
    .then(recycling => {
      res.status(201).json(recycling);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el material reciclado' });
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
        throw new Error('Material reciclado no encontrado');
      }
    })
    .then(updatedRecycling => {
      res.status(200).json(updatedRecycling);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar el material reciclado' });
    });
};

exports.deleteRecycling = (req, res, next) => {
  const recyclingId = req.params.id;

  Recycling.findByPk(recyclingId)
    .then(recycling => {
      if (recycling) {
        return recycling.destroy();
      } else {
        throw new Error('Material reciclado no encontrado');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar el material reciclado' });
    });
};
