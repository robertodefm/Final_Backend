const { Transport } = require('../sequelize.js');

exports.getAllTransports = (req, res, next) => {
  Transport.findAll()
    .then(transports => {
      res.status(200).json(transports);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener los transportes' });
    });
};

exports.createTransport = (req, res, next) => {
  const { tipo_transporte, distancia_percorrida, combustivel_utilizado, cantidade_combustivel, energia_utilizada } = req.body;

  Transport.create({ tipo_transporte, distancia_percorrida, combustivel_utilizado, cantidade_combustivel, energia_utilizada })
    .then(transport => {
      res.status(201).json(transport);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el transporte' });
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
        throw new Error('Transporte no encontrado');
      }
    })
    .then(updatedTransport => {
      res.status(200).json(updatedTransport);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar el transporte' });
    });
};

exports.deleteTransport = (req, res, next) => {
  const transportId = req.params.id;

  Transport.findByPk(transportId)
    .then(transport => {
      if (transport) {
        return transport.destroy();
      } else {
        throw new Error('Transporte no encontrado');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar el transporte' });
    });
};
