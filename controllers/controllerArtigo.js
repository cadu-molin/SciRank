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
        return res.status(500).send(error)
    }

    res.status(200).send({options:{response: artigoAutorInsert}})

}

async function getDelete(req, res){
    await Artigo.destroy({ where: { idArtigo: req.params.idArtigo } }).then(
        AutorArtigo.destroy({where: { idArtigo: req.params.idArtigo }}).then(
            res.redirect('/artigo/list')
        ).catch(err => console.log(err))
    ).catch(err => {
        console.log(err);
    });
}

async function getUpdate(req, res){

    const artigo = await findbyPK(req.params.idArtigo)

    res.render('artigo/artigoUpdate', {
        options:{
            hrefTemplate: '/usuario/getFindAll',
            hrefUpdate: '/artigo/update'
        },
        artigo: artigo
    })
}

async function postUpdate(req, res){

    const {idArtigo, artigoTitulo, artigoResumo, artigoLink, artigoAutores } = req.body

    const resArtigo = await Artigo.update({
        titulo: artigoTitulo,
        resumo: artigoResumo,
        link: artigoLink,
        },
        {
            where: {idArtigo}
        }
    )
    const resDeleteAutorArtigo = await AutorArtigo.destroy({
        where: {idArtigo}
    })

    const artigoAutorInsert = artigoAutores.map( (autor) => {
        return { idAutor: autor, idArtigo: Number(idArtigo) }
    });

    const resAutorArtigo = await AutorArtigo.bulkCreate(artigoAutorInsert)

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
        },
        
    })
    const autorArtigos = res.map( art => art.toJSON())
    const artigos = await Promise.all(autorArtigos.map( async (artigo) => {

        const autoresBanco = await AutorArtigo.findAll({
            where:{
                idArtigo: artigo.idArtigo
            },
            include:{
                attributes:['nome'],
                model:Usuario
            }
        })

        const autores = autoresBanco.map(autoresArtigo => autoresArtigo.toJSON())

        return { 
            autores: autores, 
            nomeAutores: autores.map( autor => autor.Usuario.nome).join(', '),
            idArtigo: artigo.idArtigo,
            titulo: artigo.titulo,
            link: artigo.link,
            status: statusArtigoEnum.toString(artigo.status),
        }
    }))

    return artigos
}

async function findbyPK(idArtigo){
    const resArtigo = await Artigo.findByPk(idArtigo)

    const artigo = resArtigo.dataValues

    const resAutoresArtigo = await AutorArtigo.findAll({
        where:{
            idArtigo: idArtigo
        },
        include:{
            attributes: ['nome', 'email'],
            model: Usuario
        }
    })

    const autoresArtigo = resAutoresArtigo
            .map( autArt => autArt.toJSON())
            .map( autArt => {
                return {
                    idAutor: autArt.idAutor,
                    nome: autArt.Usuario.nome,
                    email: autArt.Usuario.email,
                }
            })

    const artigo_return = {
        ...artigo,
        statusNome: statusArtigoEnum.toString(artigo.status),
        autores: autoresArtigo
    }

    console.log(artigo_return)

    return artigo_return
}

module.exports = {
    getCreate,
    postCreate,
    getList,
    getDelete,
    getUpdate,
    postUpdate,
    findByUsuario,
}