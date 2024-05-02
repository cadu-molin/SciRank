const express = require("express");
const router = express.Router();

const controllerArtigo = require('../controllers/controllerArtigo')
const TipoUsuarioEnum = require('../enums/TipoUsuario')
const middlewares = require('../middlewares/middlewares')

router.get("/create", middlewares.hasAccess([TipoUsuarioEnum.AUTOR]), controllerArtigo.getCreate)
router.post("/create", middlewares.hasAccess([TipoUsuarioEnum.AUTOR]), controllerArtigo.postCreate)
router.get('/delete/:idArtigo', middlewares.hasAccess([TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.AUTOR]), controllerArtigo.getDelete)
router.get('/update/:idArtigo', middlewares.hasAccess([TipoUsuarioEnum.AUTOR]), controllerArtigo.getUpdate)
router.post('/update', middlewares.hasAccess([TipoUsuarioEnum.AUTOR]), controllerArtigo.postUpdate)

router.get('/avaliador/:idArtigo', middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerArtigo.getAvaliador)
router.post('/avaliador', middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerArtigo.postAvaliador)

router.get("/publicar", middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerArtigo.getPublicar)
router.get("/aceitar/:idArtigo", middlewares.hasAccess([TipoUsuarioEnum.ADMIN]), controllerArtigo.getAceitar)

router.get("/list", controllerArtigo.getList)


module.exports = router