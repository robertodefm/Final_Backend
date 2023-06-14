var express = require('express');
var router = express.Router();
var recyclingController = require('../controllers/recyclingController.js');  

router.get('/', recyclingController.getAllRecyclings);
router.post('/', recyclingController.createRecycling);
router.put('/:id', recyclingController.updateRecycling);
router.delete('/:id', recyclingController.deleteRecycling);

module.exports = router;