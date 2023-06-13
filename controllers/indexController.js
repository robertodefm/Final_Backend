const User = require('../sequelize.js').User;
var jwt = require('jsonwebtoken');

function generateAccessToken(email,password){
    var token = jwt.sign({email,password}, process.env.TOKEN_SECRET, {expiresIn:'20000s'});
    return token;
}

exports.login = (req, res, next)=>{
    var { email } = req.body;
    var { password } = req.body;

    User.findOne({
        where: {
            email:email
        }
    }).then((user)=>{
        if (user!=null){
            if (user.password == password){
                req.session.user= user;
                res.redirect('/profile');
            }else{
                req.flash('loginMessage', 'Wrong password')
                res.redirect("/login");
            }
        }else{
            req.flash('loginMessage', 'No user found with that email')
            res.redirect("/login");
        }
        
    });
}

exports.signup = (req, res, next)=>{
    var { email } = req.body;
    var { password } = req.body;

    User.findOne({
        where: {
            email:email
        }
    }).then((user)=>{
        if (user==null){
            User.create({email:email,password:password}).then((results)=>{
                    console.log(results);
                    req.session.user= results;
                    res.redirect('/profile');
                });
                
        }else{
            req.flash('signupMessage', 'O email já existe');
            res.redirect("/signup");
            
        }
        
    });
}


exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/login');
    });
  };