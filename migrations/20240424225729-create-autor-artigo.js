'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('autor_artigo', {
      idAutor: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idArtigo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('autor_artigo');
  }
};