const { Tip } = require('../sequelize.js');

exports.getAllTips = (req, res, next) => {
  Tip.findAll()
    .then(tips => {
      res.status(200).json(tips);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error getting tips' });
    });
};

exports.createTip = (req, res, next) => {
  const { message } = req.body;

  Tip.create({ message })
    .then(tip => {
      res.status(201).json(tip);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error creating tip' });
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
        res.status(404).json({ error: 'Tip Not found' });
      }
    })
    .then(updatedTip => {
      res.status(200).json(updatedTip);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update tip' });
    });
};

exports.deleteTip = (req, res, next) => {
  const tipId = req.params.id;

  Tip.findByPk(tipId)
    .then(tip => {
      if (tip) {
        tip.destroy();
        res.send("Tip by id: "+tipId+" deleted")
      } else {
        res.status(404).json({ error: 'Tip Not found' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error deleting tip' });
    });
};
