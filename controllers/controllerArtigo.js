const { Artigo, AutorArtigo } = require('../models')
const statusArtigoEnum = require('../enums/StatusArtigo')

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

        const {artigoTitulo, artigoResumo, artigoLink, artigoAutores} = req.body
        let artigoCriado
        try {
            artigoCriado = await Artigo.create({
                titulo: artigoTitulo,
                resumo: artigoResumo,
                link: artigoLink,
                status: statusArtigoEnum.REVISAO
            })        
        } catch (error) {
            console.log(error)
            return res.status(500).send(errpor)
        }
        
        const idArtigoCriado = artigoCriado.dataValues.idArtigo

        console.log( `idartigo ${idArtigoCriado}`)

        const artigoAutorInsert = artigoAutores.map( (autor) => {
            return { idAutor: autor, idArtigo: idArtigoCriado }
        });

        let responseBulk
        try {
            responseBulk = await AutorArtigo.bulkCreate(artigoAutorInsert)    
        } catch (error) {
            console.log(error)
            return res.status(500).send(errpor)
        }
        console.log(responseBulk)
        console.log('finalizou')

        res.status(200).send({options:{response: artigoAutorInsert}})

    },
    getList(req, res){
        res.render('artigo/artigoList', {options: 
            {
                hrefTemplate: '/usuario/getFindAll',
                hrefCreate: '/artigo/create'
            }
        })
    }
}