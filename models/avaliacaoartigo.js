'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvaliacaoArtigo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticleAppraiser.hasOne(models.Artigo, {
        foreignKey: "idArtigo",
        sourceKey: "idArtigo"
      }),
      ArticleAppraiser.hasOne(models.Usuario, {
        foreignKey: "idUsuario",
        sourceKey: "idUsuario"
      })
    }
  }
  AvaliacaoArtigo.init({
    idAvaliacao: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idArtigo: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    notaRelevancia: DataTypes.NUMERIC,
    notaExperiencia: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'AvaliacaoArtigo',
    tableName: 'avaliacao_artigo',
    freezeTableName: true,
    timestamps: false
  });
  return AvaliacaoArtigo;
};