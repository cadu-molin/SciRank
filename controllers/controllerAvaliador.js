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
                return artigo.toJSON()
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
                console.log(avaliar.dataValues)
                const avaliarRender = {
                    idAvaliacao: avaliar.dataValues.idAvaliacao,
                    titulo: avaliar.dataValues.Artigo.dataValues.titulo,
                    usuario: avaliar.dataValues.Usuario.dataValues.usuario,
                    notaRelevancia: avaliar.dataValues.notaRelevancia,
                    notaExperiencia: avaliar.dataValues.notaExperiencia,
                    
                }
                res.render('avaliar/avaliarCreate', {
                    avaliar: avaliarRender
            })
        }
        ).catch(function (err) {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao carregar os dados da Avaliação:\n" + err.message})
        });
    },
    async postUpdate(req, res) {
        await AvaliacaoArtigo.update(req.body, { where: { idAvaliacao: parseInt(req.body.idAvaliacao) } }).then(
            res.redirect('/avaliar/listAll')
        ).catch(function (err) {
            console.log(err);
            res.render("erro", {mensagem: "Erro ao salvar os dados da Avaliação:\n" + err.message})
        });
    }
}   