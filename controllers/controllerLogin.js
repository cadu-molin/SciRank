const {Usuario} = require("../models")

module.exports = {
    async getLogin(req, res) {
        await res.render('login/login', { layout: 'noMenu.handlebars' });
    },
    async postLogin(req, res) {
        
        await Usuario
                .findAll({ where: { usuario: req.body.usuario, senha: req.body.senha } })
                .then(usuarios => {
                    if (usuarios.length > 0) {
                        const user = usuarios[0]

                        req.session.user = user;
                        res.redirect('/');
                    } else
                        res.redirect('/');
                }).catch((err) => {
                    console.log(err);
                    res.render("erro", {mensagem: "Erro ao autenticar:\n" + err.message})
                })
    },
    async postLogOut(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
}