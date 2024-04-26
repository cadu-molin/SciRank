const express = require("express")
const controllerArtigo = require("../controllers/controllerArtigo")
const middlewares = require('../middlewares/middlewares')
const controllerUsuario = require("../controllers/controllerUsuario")
const route = express.Router()

module.exports = route

//Home
route.get("/home", middlewares.hasAccess([1]), function (req, res) {
    if (req.session.usuario) {
        res.render('home')
    }
    else
        res.redirect('/')
})

//Artigo
// route.get("/", controllerArtigo)
// route.post("/", controllerArtigo)

//Usuario
route.get("/", controllerUsuario.getLogin)
route.post("/login", controllerUsuario.postLogin)
// route.get("/logout", controllerUsuario.getLogout)
// route.get("/usuarioCreate", controllerUsuario.getCreate)
// route.post("/usuarioCreate", controllerUsuario.postCreate)
// route.get("/usuarioList", controllerUsuario.getList)
// route.get("/usuarioUpdate/:id", controllerUsuario.getUpdate)
// route.post("/usuarioUpdate", controllerUsuario.postUpdate)
// route.get("/usuarioDelete/:id", controllerUsuario.getDelete)
