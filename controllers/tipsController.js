const { Tip } = require('../sequelize.js');

exports.getAllTips = (req, res, next) => {
  Tip.findAll()
    .then(tips => {
      res.status(200).json(tips);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener los consejos' });
    });
};

exports.createTip = (req, res, next) => {
  const { message } = req.body;

  Tip.create({ message })
    .then(tip => {
      res.status(201).json(tip);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el consejo' });
    });
};

exports.updateTip = (req, res, next) => {
  const tipId = req.params.id;
  const updatedData = req.body;

  Tip.findByPk(tipId)
    .then(tip => {
      if (tip) {
        return tip.update(updatedData);
      } else {
        throw new Error('Consejo no encontrado');
      }
    })
    .then(updatedTip => {
      res.status(200).json(updatedTip);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar el consejo' });
    });
};

exports.deleteTip = (req, res, next) => {
  const tipId = req.params.id;

  Tip.findByPk(tipId)
    .then(tip => {
      if (tip) {
        return tip.destroy();
      } else {
        throw new Error('Consejo no encontrado');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar el consejo' });
    });
};
