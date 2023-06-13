module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transport', {
        tipo_transporte: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
          distancia_percorrida: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          combustivel_utilizado: {
            type: DataTypes.STRING(255)
          },
          cantidade_combustivel: {
            type: DataTypes.FLOAT
          },
          energia_utilizada: {
            type: DataTypes.FLOAT
          }
    });
}