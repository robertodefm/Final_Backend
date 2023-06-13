var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/logout', indexController.logout);

router.post('/login', indexController.login);

router.post('/signup', indexController.signup);


router.get('/profile', function(req, res) {
    res.render('profile', { user: req.session.user });
});

module.exports = router;