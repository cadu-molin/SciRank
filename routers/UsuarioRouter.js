const express = require("express");
const router = express.Router();
const middlewares = require('../middlewares/middlewares')
const TipoUsuarioEnum = require('../enums/TipoUsuario')

const controllerUsuario = require('../controllers/controllerUsuario')

router.get('/create', middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerUsuario.getCreate)
router.post('/create', middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerUsuario.postCreate)
router.get('/listAll', middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerUsuario.listAll)
router.get("/update/:idUsuario", middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerUsuario.getUpdate);
router.post("/update", middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerUsuario.postUpdate);
router.get('/delete/:idUsuario', middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerUsuario.getDelete)

router.get('/getFindAll', middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerUsuario.getFindAll)

module.exports = router