var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var jwt = require('jsonwebtoken');

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


router.get('/profile', authenticateTokenFromSession,function(req, res) {
    res.render('profile', { user: req.session.user });
});

function authenticateTokenFromSession(req,res,next){
    const token = req.session.token;
    if (token == null) return res.sendStatus(401);
    jwt.verify (token, process.env.TOKEN_SECRET, (err,user)=>{
        if (err)
        return req.sendStatus(403);
        //req.user = user;
        next();
    });
}

module.exports = router;