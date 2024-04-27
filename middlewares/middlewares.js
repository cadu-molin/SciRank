module.exports = {
    hasAccess(tipoUsuario) {
        return (req, res, next) => {
            if(tipoUsuario.includes(req.session.tipousuario)) {
                next()
            }else {
                res.render("erro")
            }
        }
    },
    sessionControl(req, res, next) {
        // if (req.session.usuario != undefined) next()
        // else if ((req.url == '/') && (req.method == 'GET')) next()
        // else if ((req.url == '/login') && (req.method == 'POST')) next()
        // else if ((req.url).split('/')[1] == 'recuperarSenha') next()
        // else res.redirect('/login')
        next()
    }
};