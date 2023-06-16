const { CarbonFootprint } = require('../sequelize.js');

exports.getAllCarbonFootprints = (req, res, next) => {
  CarbonFootprint.findAll()
    .then(carbonFootprints => {
      res.status(200).json(carbonFootprints);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error when obtaining carbon footprints' });
    });
};

exports.createCarbonFootprint = (req, res, next) => {
  const { footprint_value, email_user,message } = req.body;

  CarbonFootprint.create({ footprint_value, email_user,message })
    .then(carbonFootprint => {
      res.status(201).json(carbonFootprint);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error when creating the carbon footprint' });
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
        res.status(404).json({ error: 'Carbon footprint Not found' });
      }
    })
    .then(updatedCarbonFootprint => {
      res.status(200).json(updatedCarbonFootprint);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating carbon footprint' });
    });
};

exports.deleteCarbonFootprint = (req, res, next) => {
  const carbonFootprintId = req.params.id;

  CarbonFootprint.findByPk(carbonFootprintId)
    .then(carbonFootprint => {
      if (carbonFootprint) {
        carbonFootprint.destroy();
        res.send("CarbonFootprint by id: "+carbonFootprintId+" deleted")
      } else {
        res.status(404).json({ error: 'Carbon footprint Not found' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error when removing the carbon footprint' });
    });
};
