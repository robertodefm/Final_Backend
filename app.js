var dotenv = require('dotenv');
dotenv.config();
var seq = require('./sequelize');
const cors = require('cors');



var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var flash = require('connect-flash');

var usersRouter = require('./routes/users');

var tipsRouter = require('./routes/tips');

var indexRouter = require('./routes/index');


var carbonFootprintsRouter = require('./routes/carbonFootprints');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true   
}));

app.use(cors());

app.use(flash()); // use connect-flash for flash messages stored in session
app.use('/user', usersRouter);

app.use('/tip', tipsRouter);

app.use('/', indexRouter);


app.use('/carbonfootprint', carbonFootprintsRouter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

module.exports = app;