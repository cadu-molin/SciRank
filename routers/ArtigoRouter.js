const express = require("express");
const router = express.Router();

const controllerArtigo = require('../controllers/controllerArtigo')

router.get("/create", controllerArtigo.getCreate)
router.post("/create", controllerArtigo.postCreate)
router.get('/delete/:idArtigo', controllerArtigo.getDelete)
router.get('/update/:idArtigo', controllerArtigo.getUpdate)
router.post('/update', controllerArtigo.postUpdate)

router.get('/avaliador/:idArtigo', controllerArtigo.getAvaliador)
router.post('/avaliador', controllerArtigo.postAvaliador)

router.get("/list", controllerArtigo.getList)
router.get("/publicar", controllerArtigo.getPublicar)

module.exports = router