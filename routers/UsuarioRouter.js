const express = require("express");
const router = express.Router();

const controllerUsuario = require('../controllers/controllerUsuario')

router.get('/getFindAll', controllerUsuario.getFindAll)

module.exports = router