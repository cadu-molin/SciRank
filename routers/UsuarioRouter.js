const express = require("express");
const router = express.Router();

const controllerUsuario = require('../controllers/controllerUsuario')

router.get('/create', controllerUsuario.getCreate)
router.post('/create', controllerUsuario.postCreate)

router.get('/getFindAll', controllerUsuario.getFindAll)

module.exports = router