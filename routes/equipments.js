var express = require('express');
var router = express.Router();
var equipmentsController = require('../controllers/equipmentsController.js');  

router.get('/', equipmentsController.getAllEquipments);
router.post('/', equipmentsController.createEquipment);
router.put('/:id', equipmentsController.updateEquipment);
router.delete('/:id', equipmentsController.deleteEquipment);

module.exports = router;
