const { Transport } = require('../sequelize.js');

exports.getAllTransports = (req, res, next) => {
  Transport.findAll()
    .then(transports => {
      res.status(200).json(transports);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error getting transports' });
    });
};

exports.createTransport = (req, res, next) => {
  const { type,  distance, fuel, quantity_fuel, energy } = req.body;

  Transport.create({ type,  distance, fuel, quantity_fuel, energy })
    .then(transport => {
      res.status(201).json(transport);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error creating transport' });
    });
};

exports.updateTransport = (req, res, next) => {
  const transportId = req.params.id;
  const updatedData = req.body;

  Transport.findByPk(transportId)
    .then(transport => {
      if (transport) {
        return transport.update(updatedData);
      } else {
        res.status(404).json({ error: 'Transport Not found' });
      }
    })
    .then(updatedTransport => {
      res.status(200).json(updatedTransport);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update transport' });
    });
};

exports.deleteTransport = (req, res, next) => {
  const transportId = req.params.id;

  Transport.findByPk(transportId)
    .then(transport => {
      if (transport) {
        transport.destroy();
        res.send("Transport by id: "+transportId+" deleted")
      } else {
        res.status(404).json({ error: 'Transport Not found' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error deleting transport' });
    });
};
