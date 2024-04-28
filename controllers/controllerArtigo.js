module.exports = {
    getCreate(req, res) {
        res.render('artigo/artigoCreate', {options: {hrefTemplate: '/usuario/getFindAll'}})
    },
    postCreate(req,res){

    },
    getList(req, res){

    }
}