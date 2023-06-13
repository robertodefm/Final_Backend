module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tip', {
        message: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
}