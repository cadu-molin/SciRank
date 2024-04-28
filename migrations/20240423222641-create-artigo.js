'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artigo', {
      idArtigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      resumo: {
        type: Sequelize.TEXT
      },
      link: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('artigo');
  }
};