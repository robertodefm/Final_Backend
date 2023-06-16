module.exports = (sequelize, DataTypes) => {
    return sequelize.define('carbon_footprint', {
        email_user:{
            type: DataTypes.STRING,
        },
        footprint_value: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
}