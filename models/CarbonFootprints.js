module.exports = (sequelize, DataTypes) => {
    return sequelize.define('carbon_footprint', {
        footprint_value: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
}