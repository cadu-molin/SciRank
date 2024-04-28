const TipoUsuario = require("../enums/TipoUsuario");
const {Usuario} = require("../models")
const url = require ( 'url');
const sequelize = require('sequelize')
    // const usuario = await Usuario.create({nome:"Carlos", email:"Teste@gamil.com", usuario:"Teste", senha: "123"})
    // res.json(usuario)

module.exports = {

    async getFindAll(req, res) {
        const q = url.parse(req.url, true)
        const queryparm = q.query.pesquisa
        console.log(q.query.notinAutorParm)
        const notinIdAutor = q.query.notinAutorParm ? q.query.notinAutorParm.split(',') : [0]
        console.log(notinIdAutor)
        let queryModel = {
            attributes:['idUsuario','email', 'nome']
        }

        if (queryparm === ''){
            queryModel = {
                ...queryModel,
                where:{ 
                    tipousuario: TipoUsuario.AUTOR,
                    idUsuario: {
                        [sequelize.Op.notIn]: notinIdAutor
                    }
                 }
            }
        }else{
            queryModel = {
                ...queryModel,
                where:{ 
                    tipousuario: TipoUsuario.AUTOR ,
                    idUsuario: {
                        [sequelize.Op.notIn]: notinIdAutor
                    },
                    [sequelize.Op.or]: {
                        nome: {[sequelize.Op.like]: `%${queryparm}%`},
                        email: {[sequelize.Op.like]: `%${queryparm}%`}
                    }
                }
            }
        }

        const usuarios = await Usuario.findAll(queryModel)
            .then((usuarios)=> {
                return usuarios.map((user)=> {
                    return user.toJSON()
                })})
        console.log(usuarios)
        res.json( usuarios )
    }
    
    // async getLogout(req, res) {
    //     req.session.destroy();
    //     res.redirect('/');
    // },

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