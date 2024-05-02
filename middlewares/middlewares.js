module.exports = {
    hasAccess(tipoUsuario) {
        return (req, res, next) => {
            if(tipoUsuario.includes(req.session.user.tipousuario)) {
                next()
            }else {
                res.render("erro", {mensagem: "Usuário Inválido"})
            }
        }
    },
    sessionControl(req,res, next){
        if (req.session.user != undefined) {
            res.locals.user = req.session.user;
            if (req.session.user.tipousuario == 0) {
                res.locals.session.isAdmin = true
            }
            next();
        }
        else if ((req.url == '/') && (req.method == 'GET')) next();
        else if ((req.url == '/login') && (req.method == 'GET')) next();
        else if ((req.url == '/login') && (req.method == 'POST')) next();
        else res.redirect('/');
    }
};