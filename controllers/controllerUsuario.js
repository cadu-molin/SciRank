const {Usuario} = require("../models")

    // const usuario = await Usuario.create({nome:"Carlos", email:"Teste@gamil.com", usuario:"Teste", senha: "123"})
    // res.json(usuario)

module.exports = {
    async getLogin(req, res) {
        await res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },
    // async getLogout(req, res) {
    //     req.session.destroy();
    //     res.redirect('/');
    // },
    async postLogin(req, res) {
        await Usuario.findAll({ where: { usuario: req.body.usuario, senha: req.body.senha } }
        ).then(usuarios => {
            if (usuarios.length > 0) {
                req.session.usuario = req.body.usuario;
                req.session.tipousuario = 1;
                res.redirect('/home');
            } else
                res.redirect('/');
        }).catch((err) => {
            console.log(err);
        })
    }
    // ,
    // async getCreate(req, res) {
    //     res.render('usuario/usuarioCreate');
    // },
    // async postCreate(req, res) {
    //     Usuario.create(req.body).then(() => {
    //         res.redirect('/home');
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // },
    // async getList(req, res) {
    //     Usuario.findAll().then(usuarios => {
    //         res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // },
    // async getUpdate(req, res) {
    //     await Usuario.findByPk(req.params.idUsuario).then(
    //         usuario => res.render('usuario/usuarioUpdate', { usuario: usuario.dataValues })
    //     ).catch(function (err) {
    //         console.log(err);
    //     });
    // },
    // async postUpdate(req, res) {
    //     await Usuario.update(req.body, { where: { idUsuario: req.body.idUsuario } }).then(
    //         res.render('home')
    //     ).catch(function (err) {
    //         console.log(err);
    //     });
    // },
    // async getDelete(req, res) {
    //     await Usuario.destroy({ where: { idUsuario: req.params.idUsuario } }).then(
    //         res.render('home')
    //     ).catch(err => {
    //         console.log(err);
    //     });
    // }
}   