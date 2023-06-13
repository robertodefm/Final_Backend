module.exports = (sequelize, DataTypes) => {
    return sequelize.define('equipment', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        consume: {
            type: DataTypes.FLOAT
        }
    });
}