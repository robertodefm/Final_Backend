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
      res.status(500).json({ error: 'Error creating user' });
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
        res.status(404).json({ error: 'User Not found' });
      }
    })
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update user' });
    });
};


exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then(user => {
      if (user) {
        user.destroy();
        res.send("User by id: "+userId+" deleted")
      } else {
        res.status(404).json({ error: 'User Not found' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to delete user' });
    });
};
