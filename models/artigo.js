'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artigo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artigo.hasMany(models.AutorArtigo, {
        foreignKey: "idArtigo",
        sourceKey: "idArtigo"
      })
    }
  }
  Artigo.init({
    idArtigo: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    titulo: DataTypes.STRING,
    resumo: DataTypes.TEXT,
    link: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artigo',
    tableName: 'artigo',
    freezeTableName: true,
    timestamps: false
  });
  return Artigo;
};