var dotenv = require('dotenv');
dotenv.config();
var seq = require('./sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');



var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var flash = require('connect-flash');

var usersRouter = require('./routes/users');
var transportsRouter = require('./routes/transports');
var tipsRouter = require('./routes/tips');
var recyclingRouter = require('./routes/recycling');
var indexRouter = require('./routes/index');
var habitsRouter = require('./routes/habits');
var equipmentsRouter = require('./routes/equipments');
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

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use('/user', usersRouter);
app.use('/transport', transportsRouter);
app.use('/tip', tipsRouter);
app.use('/recycling', recyclingRouter);
app.use('/', indexRouter);
app.use('/habit', habitsRouter);
app.use('/equipment', equipmentsRouter);
app.use('/carbonfootprint', carbonFootprintsRouter);


module.exports = app;