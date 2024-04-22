'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [
      {
        nome:"Admin",
        email:"admin@gamil.com",
        tipousuario: 0,
        usuario:"Admin",
        senha: "123"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuario', null, {})
  }
};
