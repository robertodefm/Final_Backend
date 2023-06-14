var express = require('express');
var router = express.Router();
var habitsController = require('../controllers/habitsController.js');  

router.get('/', habitsController.getAllHabits);
router.post('/', habitsController.createHabit);
router.put('/:id', habitsController.updateHabit);
router.delete('/:id', habitsController.deleteHabit);

module.exports = router;
