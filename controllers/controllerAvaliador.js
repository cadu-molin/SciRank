const { AvaliacaoArtigo } = require("../models")


module.exports = {
    async listAll(req, res) {
        AvaliacaoArtigo.findAll().then(autorArtigo => {
            res.render('avaliar/avaliarList', { avaliacao: autorArtigo.map((artigo) => {
                artigo.toJSON()
            })});
        }).catch((err) => {
            console.log(err);
        });
    },
    async getUpdate(req, res) {
        await AvaliacaoArtigo.findByPk(req.params.idAvaliacao).then(
            avaliar => { 
                res.render('avaliar/avaliarCreate', {
                    avaliar: avaliar.dataValues
            })
        }
        ).catch(function (err) {
            console.log(err);
        });
    },
    async postUpdate(req, res) {
        await AvaliacaoArtigo.update(req.body, { where: { idAvaliacao: parseInt(req.body.idAvaliacao) } }).then(
            res.redirect('/avaliar/avaliarList')
        ).catch(function (err) {
            console.log(err);
        });
    }
}   