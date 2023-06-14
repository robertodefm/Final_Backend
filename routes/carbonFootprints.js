var express = require('express');
var router = express.Router();
var carbonFootprintController = require('../controllers/carbonFootprintController.js');  

router.get('/', carbonFootprintController.getAllCarbonFootprints);
router.post('/', carbonFootprintController.createCarbonFootprint);
router.put('/:id', carbonFootprintController.updateCarbonFootprint);
router.delete('/:id', carbonFootprintController.deleteCarbonFootprint);

module.exports = router;
