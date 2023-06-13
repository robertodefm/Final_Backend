module.exports = (sequelize, DataTypes) => {
    return sequelize.define('habit', {
        time: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    });
}