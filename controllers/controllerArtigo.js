const { Artigo, AutorArtigo, Usuario } = require('../models')
const sequelize = require('sequelize')
const statusArtigoEnum = require('../enums/StatusArtigo')

function getCreate(req, res) {
    res.render('artigo/artigoCreate', {options: 
        {
            hrefTemplate: '/usuario/getFindAll',
            hrefCreate: '/artigo/create'
        }
    })
}

async function postCreate(req,res){

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

    res.status(200).send({options:{response: artigoAutorInsert}})

}

async function getList(req, res){

    const usuario = req.session.user

    let artigosUsuario

    if(usuario.tipousuario === 1){
        artigosUsuario = await findByUsuario(usuario.idUsuario)
    }

    res.render('artigo/artigoList', {
        artigos: artigosUsuario,
        options:{
            hrefTemplate: '/usuario/getFindAll',
            hrefCreate: '/artigo/create'
        }
    })
}

async function findByUsuario(idUsuario){
    const res = await Artigo.findAll({
        attributes:['titulo','link', 'status','idArtigo'],
        include:{
            attributes:['idAutor'],
            model: AutorArtigo,
            where:{
                idAutor: idUsuario
            },
            include:{
                attributes:['nome'],
                model:Usuario
            }
        },
        
    })
    const autorArtigos = res.map( art => art.toJSON())
    console.log(autorArtigos[0].AutorArtigos)
    const artigos = autorArtigos.map( artigo =>{
        return { 
            idAutor: artigo.AutorArtigos.map( autor => autor.idAutor).join(', '), 
            nomeAutor: artigo.AutorArtigos.map( autor => autor.Usuario.nome).join(', '),
            idArtigo: artigo.idArtigo,
            titulo: artigo.titulo,
            link: artigo.link,
            status: artigo.status,
        }
    })

    console.log(artigos)

    return artigos
}

module.exports = {
    getCreate,
    postCreate,
    getList,
    findByUsuario,
}