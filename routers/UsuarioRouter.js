const express = require("express");
const router = express.Router();
const middlewares = require('../middlewares/middlewares')

const controllerUsuario = require('../controllers/controllerUsuario')

router.get('/create', middlewares.hasAccess([0]), controllerUsuario.getCreate)
router.post('/create', middlewares.hasAccess([0]), controllerUsuario.postCreate)
router.get('/listAll', middlewares.hasAccess([0]), controllerUsuario.listAll)
router.get('/delete/:idUsuario', middlewares.hasAccess([0]), controllerUsuario.getDelete)

router.get('/getFindAll', middlewares.hasAccess([0]), controllerUsuario.getFindAll)

module.exports = router