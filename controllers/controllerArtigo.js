const artigoModel = require('../models/artigo')

module.exports = {
    getCreate(req, res) {
        res.render('artigo/artigoCreate', {options: 
            {
                hrefTemplate: '/usuario/getFindAll',
                hrefCreate: '/artigo/create'
            }
        })
    },
    async postCreate(req,res){
        return await artigoModel.create({
            idArquivo: req,
            titulo: req,
            resumo: req,
            link: req,
            status: req
        })
    },
    getList(req, res){

    }
}