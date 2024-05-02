const { AvaliacaoArtigo, Artigo, Usuario } = require("../models")

module.exports = {
    async listAll(req, res) {
        console.log(req.session.user)
        AvaliacaoArtigo.findAll({
            where: {
                idUsuario: parseInt(req.session.user.idUsuario)             
            },
            include: [
                {
                    model: Artigo,
                    attributes: ['titulo']
                },
                {
                    model: Usuario,
                    attributes: ['usuario']
                }
            ]
        }).then(autorArtigo => {
            res.render('avaliar/avaliarList', { avaliacao: autorArtigo.map((artigo) => {
                artigo.toJSON()
            })});
        }).catch((err) => {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao carregar os dados da Avaliação:\n" + err.message})
        });
    },
    async getUpdate(req, res) {
        await AvaliacaoArtigo.findByPk(req.params.idAvaliacao, {
            include: [
                {
                    model: Artigo,
                    attributes: ['titulo']
                },
                {
                    model: Usuario,
                    attributes: ['usuario']
                }
            ]
        }).then(
            avaliar => { 
                res.render('avaliar/avaliarCreate', {
                    avaliar: avaliar.dataValues
            })
        }
        ).catch(function (err) {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao carregar os dados da Avaliação:\n" + err.message})
        });
    },
    async postUpdate(req, res) {
        await AvaliacaoArtigo.update(req.body, { where: { idAvaliacao: parseInt(req.body.idAvaliacao) } }).then(
            res.redirect('/avaliar/avaliarList')
        ).catch(function (err) {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao salvar os dados da Avaliação:\n" + err.message})
        });
    }
}   