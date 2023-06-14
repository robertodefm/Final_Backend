var express = require('express');
var router = express.Router();
var transportsController = require('../controllers/transportsController.js');  

router.get('/', transportsController.getAllTransports);
router.post('/', transportsController.createTransport);
router.put('/:id', transportsController.updateTransport);
router.delete('/:id', transportsController.deleteTransport);

module.exports = router;