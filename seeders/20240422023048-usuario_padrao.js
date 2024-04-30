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
      {
        nome:"autor1",
        email:"autor1@gamil.com",
        tipousuario: 1,
        usuario:"autor1",
        senha: "1"
      },
      {
        nome:"autor2",
        email:"autor2@gamil.com",
        tipousuario: 1,
        usuario:"autor2",
        senha: "1"
      },
      {
        nome:"autor3",
        email:"autor3@gamil.com",
        tipousuario: 1,
        usuario:"autor3",
        senha: "1"
      },
      {
        nome:"autor4",
        email:"autor4@gamil.com",
        tipousuario: 1,
        usuario:"autor4",
        senha: "1"
      },
      {
        nome:"autor5",
        email:"autor5@gamil.com",
        tipousuario: 1,
        usuario:"autor5",
        senha: "1"
      },
      {
        nome:"autor6",
        email:"autor6@gamil.com",
        tipousuario: 1,
        usuario:"autor6",
        senha: "1"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuario', null, {})
  }
};
