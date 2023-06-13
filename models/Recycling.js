module.exports = (sequelize, DataTypes) => {
    return sequelize.define('recycling', {
        materialType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantity: {
            type: DataTypes.FLOAT
        }
    });
}