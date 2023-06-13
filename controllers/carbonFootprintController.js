const { CarbonFootprint } = require('../sequelize.js');

exports.getAllCarbonFootprints = (req, res, next) => {
  CarbonFootprint.findAll()
    .then(carbonFootprints => {
      res.status(200).json(carbonFootprints);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener las huellas de carbono' });
    });
};

exports.createCarbonFootprint = (req, res, next) => {
  const { carbonValue, userId } = req.body;

  CarbonFootprint.create({ carbonValue, userId })
    .then(carbonFootprint => {
      res.status(201).json(carbonFootprint);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear la huella de carbono' });
    });
};

exports.updateCarbonFootprint = (req, res, next) => {
  const carbonFootprintId = req.params.id;
  const updatedData = req.body;

  CarbonFootprint.findByPk(carbonFootprintId)
    .then(carbonFootprint => {
      if (carbonFootprint) {
        return carbonFootprint.update(updatedData);
      } else {
        throw new Error('Huella de carbono no encontrada');
      }
    })
    .then(updatedCarbonFootprint => {
      res.status(200).json(updatedCarbonFootprint);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar la huella de carbono' });
    });
};

exports.deleteCarbonFootprint = (req, res, next) => {
  const carbonFootprintId = req.params.id;

  CarbonFootprint.findByPk(carbonFootprintId)
    .then(carbonFootprint => {
      if (carbonFootprint) {
        return carbonFootprint.destroy();
      } else {
        throw new Error('Huella de carbono no encontrada');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar la huella de carbono' });
    });
};
