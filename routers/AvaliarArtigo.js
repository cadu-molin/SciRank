const express = require("express");
const router = express.Router();
const middlewares = require('../middlewares/middlewares')
const TipoUsuarioEnum = require('../enums/TipoUsuario')

const controllerAvaliador = require('../controllers/controllerAvaliador')

router.get('/listAll', middlewares.hasAccess([TipoUsuarioEnum.AVALIADOR]), controllerAvaliador.listAll)
router.get("/update/:idAvaliacao", middlewares.hasAccess([TipoUsuarioEnum.AVALIADOR]), controllerAvaliador.getUpdate)
router.post("/update", middlewares.hasAccess([TipoUsuarioEnum.AVALIADOR]), controllerAvaliador.postUpdate)

module.exports = router