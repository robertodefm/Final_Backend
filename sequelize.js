// TODO Implement all the models and business logic using sequelize

const {Sequelize,DataTypes} = require('sequelize')

const UserDataModel = require('./models/Users')
const TipDataModel = require('./models/Tips')

const CarbonFootprintDataModel = require('./models/CarbonFootprints')



//Connect to the database
const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host:process.env.DB_HOST
});

// const User = UserDataModel(sequelize,DataTypes);
const User = UserDataModel(sequelize,DataTypes);
const Tip = TipDataModel(sequelize,DataTypes);
const CarbonFootprint = CarbonFootprintDataModel(sequelize,DataTypes);


sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(err => {
        console.error("Unable to connect", err);
    })



sequelize.sync({ force: true })
.then(() => {
    console.log('Database & tables created!');
}).then(function () {
    return User.findAll();
}).then(function (users) {
    console.log(users);
});

module.exports={
    User,Tip,CarbonFootprint
}