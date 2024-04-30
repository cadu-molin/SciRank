const express = require("express");
const router = express.Router();
const middlewares = require('../middlewares/middlewares')

const controllerUsuario = require('../controllers/controllerUsuario')

router.get('/create', middlewares.hasAccess([0]), controllerUsuario.getCreate)
router.post('/create', middlewares.hasAccess([0]), controllerUsuario.postCreate)

router.get('/getFindAll', controllerUsuario.getFindAll)

module.exports = router