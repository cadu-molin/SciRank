const express = require("express")
const router = express.Router()

const artigoRouter = require("./ArtigoRouter")
const loginRouter = require("./LoginRouter")
const usuarioRouter = require("./UsuarioRouter")

const tipoUsuario = require('../enums/TipoUsuario')

function defaultPorperties(req, res, next) {
    res.locals = {
        session: {
            isAdmin: req.session.user?.tipousuario === tipoUsuario.ADMIN,
            isAutor: req.session.user?.tipousuario === tipoUsuario.isAutor,
            isAvalidador: req.session.user?.tipousuario === tipoUsuario.isAvalidador,
        }
    }
    next()
}

router.use(defaultPorperties)

router.get("/", (req,res) => {
    const userSession = { 
        ...req.session.user
    }


    if(userSession.idUsuario){
        res.render('home', { 
            layout: 'main.handlebars', 
            options: userSession
        })
        return
    }

    res.render('login/login', { layout: 'noMenu.handlebars' })

})

router.use('/login', loginRouter)
router.use('/artigo', artigoRouter)
router.use('/usuario', usuarioRouter)

//Home
//router.get("/home", middlewares.hasAccess([1]), function (req, res) {
//    if (req.session.usuario) {
//        res.render('home')
//    }
//    else
//        res.redirect('/')
//})

//Artigo
// route.get("/", controllerArtigo)
// route.post("/", controllerArtigo)

//Usuario
//router.get("/", controllerUsuario.getLogin)
//router.post("/login", controllerUsuario.postLogin)
// route.get("/logout", controllerUsuario.getLogout)
// route.get("/usuarioCreate", controllerUsuario.getCreate)
// route.post("/usuarioCreate", controllerUsuario.postCreate)
// route.get("/usuarioList", controllerUsuario.getList)
// route.get("/usuarioUpdate/:id", controllerUsuario.getUpdate)
// route.post("/usuarioUpdate", controllerUsuario.postUpdate)
// route.get("/usuarioDelete/:id", controllerUsuario.getDelete)

module.exports = router
