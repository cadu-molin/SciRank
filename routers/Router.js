const express = require("express")
const router = express.Router()

const middlewares = require('../middlewares/middlewares')

const artigoRouter = require("./ArtigoRouter")
const loginRouter = require("./LoginRouter")
const usuarioRouter = require("./UsuarioRouter")
const avaliarArtigo = require("./AvaliarArtigo")

const tipoUsuario = require('../enums/TipoUsuario')

function defaultProperties(req, res, next) {
    res.locals = {
        session: {
            isAdmin: req.session.user?.tipousuario === tipoUsuario.ADMIN,
            isAutor: req.session.user?.tipousuario === tipoUsuario.AUTOR,
            isAvalidador: req.session.user?.tipousuario === tipoUsuario.AVALIADOR,
        }
    }
    next()
}

router.use(defaultProperties, middlewares.sessionControl)

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
router.use('/avaliar', avaliarArtigo)

module.exports = router