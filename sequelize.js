// TODO Implement all the models and business logic using sequelize

const {Sequelize,DataTypes} = require('sequelize')

const UserDataModel = require('./models/Users')
const TipDataModel = require('./models/Tips')
const RecyclingDataModel = require('./models/Recycling')
const HabitDataModel = require('./models/Habits')
const HabitEquipmentDataModel = require('./models/HabitEquipments')
const EquipmentDataModel = require('./models/Equipments')
const CarbonFootprintDataModel = require('./models/CarbonFootprints')
const TransportDataModel = require('./models/Transports')


//Connect to the database
const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, '', {
    dialect: 'mysql',
    host:process.env.DB_HOST
});

// const User = UserDataModel(sequelize,DataTypes);
const User = UserDataModel(sequelize,DataTypes);
const Tip = TipDataModel(sequelize,DataTypes);
const Recycling = RecyclingDataModel(sequelize,DataTypes);
const Habit = HabitDataModel(sequelize,DataTypes);
const HabitEquipment = HabitEquipmentDataModel(sequelize,DataTypes);
const Equipment = EquipmentDataModel(sequelize,DataTypes);
const CarbonFootprint = CarbonFootprintDataModel(sequelize,DataTypes);
const Transport = TransportDataModel(sequelize,DataTypes);

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(err => {
        console.error("Unable to connect", err);
    })

User.create({firstName:"Roberto",email:"roberto@gmail.com",password:"123456"}).then((results)=>{
    console.log(results);
});


User.hasOne(Tip, { foreignKey: 'id' });
Tip.belongsTo(User, { foreignKey: 'id' });

User.hasMany(Transport, { foreignKey: 'id' });
Transport.belongsTo(User, { foreignKey: 'id' });

User.hasMany(Recycling, { foreignKey: 'id' });
Recycling.belongsTo(User, { foreignKey: 'id' });

User.hasMany(Habit, { foreignKey: 'id' });
Habit.belongsTo(User, { foreignKey: 'id' });

Habit.belongsToMany(Equipment, { through: 'habit_equipment', foreignKey: 'id' });
Equipment.belongsToMany(Habit, { through: 'habit_equipment', foreignKey: 'id' });

User.hasOne(CarbonFootprint, { foreignKey: 'id' });
CarbonFootprint.belongsTo(User, { foreignKey: 'id' });

sequelize.sync({ force: true })
.then(() => {
    console.log('Database & tables created!');
}).then(function () {
    return User.findAll();
}).then(function (users) {
    console.log(users);
});

module.exports={
    User,Tip,Recycling,Habit,HabitEquipment,Equipment,CarbonFootprint,Transport
}