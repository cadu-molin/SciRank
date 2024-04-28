const {Usuario} = require("../models")

module.exports = {
    async getLogin(req, res) {
        await res.render('login/login', { layout: 'noMenu.handlebars' });
    },
    async postLogin(req, res) {
        
        await Usuario
                .findAll({ where: { usuario: req.body.usuario, senha: req.body.senha } })
                .then(usuarios => {
                    const user = usuarios[0].dataValues
                    
                    if (usuarios.length > 0) {
                        req.session.user = user;
                        console.log(user)
                        res.redirect('/');
                    } else
                        res.redirect('/');
                }).catch((err) => {
                    console.log(err);
                })
    },
    async postLogOut(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
}