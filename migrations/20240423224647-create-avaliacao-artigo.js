'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('avaliacao_artigo', {
      idAvaliacao: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idArtigo: {
        type: Sequelize.INTEGER
      },
      idUsuario: {
        type: Sequelize.INTEGER
      },
      notaRelevancia: {
        type: Sequelize.NUMERIC(4,2)
      },
      notaExperiencia: {
        type: Sequelize.NUMERIC(4,2)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('avaliacao_artigo');
  }
};