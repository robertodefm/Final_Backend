module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transport', {
        type: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
          distance: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          fuel: {
            type: DataTypes.STRING(255)
          },
          quantity_fuel: {
            type: DataTypes.FLOAT
          },
          energy: {
            type: DataTypes.FLOAT
          }
          
    });
}