module.exports = {
    hasAccess(tipoUsuario) {
        return (req, res, next) => {
            if(tipoUsuario.includes(req.session.user.tipousuario)) {
                next()
            }else {
                res.render("erro")
            }
        }
    }
};