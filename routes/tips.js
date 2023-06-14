var express = require('express');
var router = express.Router();
var tipsController = require('../controllers/tipsController.js');  

router.get('/', tipsController.getAllTips);
router.post('/', tipsController.createTip);
router.put('/:id', tipsController.updateTip);
router.delete('/:id', tipsController.deleteTip);

module.exports = router;