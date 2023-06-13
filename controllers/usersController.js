const { User } = require('../sequelize.js');

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    });
};


exports.getUserById = (req, res, next) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener el usuario' });
    });
};


exports.createUser = (req, res, next) => {
  const { firstName, lastName, email, password, registerDate, energyConsume } = req.body;

  User.create({ firstName, lastName, email, password, registerDate, energyConsume })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el usuario' });
    });
};



exports.updateUser = (req, res, next) => {
  const userId = req.params.id;
  const updatedData = req.body;

  User.findByPk(userId)
    .then(user => {
      if (user) {
        return user.update(updatedData);
      } else {
        throw new Error('Usuario no encontrado');
      }
    })
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    });
};


exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then(user => {
      if (user) {
        return user.destroy();
      } else {
        throw new Error('Usuario no encontrado');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    });
};
