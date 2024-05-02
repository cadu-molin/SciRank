const TipoUsuario = require("../enums/TipoUsuario");
const { Usuario } = require("../models")
const url = require('url');
const sequelize = require('sequelize');
const TipoUsuarioJSON = require('../utils/TipoUsuarioJSON')
const TipoUsuarioEnum = require('../enums/TipoUsuario')
// const usuario = await Usuario.create({nome:"Carlos", email:"Teste@gamil.com", usuario:"Teste", senha: "123"})
// res.json(usuario)

module.exports = {

    async getFindAll(req, res) {
        const q = url.parse(req.url, true)
        const queryparm = q.query.pesquisa
        const notinIdAutor = q.query.notinAutorParm ? q.query.notinAutorParm.split(',') : [0]
        const tipoUsuarioPesquisa = q.query.tipousuario ? q.query.tipousuario : TipoUsuario.AUTOR
        let queryModel = {
            attributes:['idUsuario','email', 'nome']
        }

        if (queryparm === '') {
            queryModel = {
                ...queryModel,
                where:{ 
                    tipousuario: tipoUsuarioPesquisa,
                    idUsuario: {
                        [sequelize.Op.notIn]: notinIdAutor
                    }
                 }
            }
        } else {
            queryModel = {
                ...queryModel,
                where:{ 
                    tipousuario: tipoUsuarioPesquisa ,
                    idUsuario: {
                        [sequelize.Op.notIn]: notinIdAutor
                    },
                    [sequelize.Op.or]: {
                        nome: { [sequelize.Op.like]: `%${queryparm}%` },
                        email: { [sequelize.Op.like]: `%${queryparm}%` }
                    }
                }
            }
        }

        const usuarios = await Usuario.findAll(queryModel)
            .then((usuarios) => {
                return usuarios.map((user) => {
                    return user.toJSON()
                })
            })
        console.log(usuarios)
        res.json(usuarios)
    },
    async getCreate(req, res) {
        res.render('usuario/usuarioCreate', {
            select:{
                user:{
                    options: TipoUsuarioJSON.listTypes()
                }
            }
        });
    },
    async postCreate(req, res) {
        Usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            usuario: req.body.usuario,
            senha: req.body.senha,
            tipousuario: parseInt(req.body.tipousuario),
        }).then(() => {
            res.redirect('/usuario/listAll')
        }).catch((err) => {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao criar o Usuário:\n" + err.message})
        });
    },
    async listAll(req, res) {
        Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map((user) => {
                let registro = user.toJSON()
                return {...registro, tipousuario: TipoUsuarioEnum.toString(registro.tipousuario)}
            })});
        }).catch((err) => {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao carregar os dados do Usuário:\n" + err.message})
        });
    },
    async getUpdate(req, res) {
        await Usuario.findByPk(req.params.idUsuario).then(
            usuario => { 
                console.log(usuario.dataValues)
                res.render('usuario/usuarioUpdate', {
                usuario: usuario.dataValues,
                select:{
                    user:{
                        options: TipoUsuarioJSON.getType(usuario.dataValues.tipousuario)
                    }
                }
            })
        }
        ).catch(function (err) {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao carregar os dados do Usuário:\n" + err.message})
        });
    },
    async postUpdate(req, res) {
        await Usuario.update(req.body, { where: { idUsuario: parseInt(req.body.idUsuario) } }).then(
            res.redirect('/usuario/listAll')
        ).catch(function (err) {
            console.log(err);
        });
    },
    async getDelete(req, res) {
        console.log(req.params.idUsuario)
        await Usuario.destroy({ where: { idUsuario: req.params.idUsuario } }).then(
            res.redirect('/usuario/listAll')
        ).catch(err => {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao atualizar os dados do Usuário:\n" + err.message})
        });
    }
}   