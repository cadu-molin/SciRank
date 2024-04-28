const express = require("express");
const router = express.Router();

const controllerArtigo = require('../controllers/controllerArtigo')

router.get("/create", controllerArtigo.getCreate)
router.post("/create", controllerArtigo.postCreate)

router.get("/list", controllerArtigo.getList)

module.exports = router