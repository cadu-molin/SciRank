'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AutorArtigo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AutorArtigo.init({
    idAutor: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idUsuario: DataTypes.INTEGER,
    idArtigo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AutorArtigo',
    tableName: 'autor_artigo',
    freezeTableName: true,
    timestamps: false
  });
  return AutorArtigo;
};