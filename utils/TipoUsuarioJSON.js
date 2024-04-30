const TipoUsuarioEnum = require('../enums/TipoUsuario')

function listTypes() {
    return [
        {
            value: TipoUsuarioEnum.ADMIN,
            selected: true,
            text: TipoUsuarioEnum.toString(TipoUsuarioEnum.ADMIN)
        },
        {
            value: TipoUsuarioEnum.AUTOR,
            selected: false,
            text: TipoUsuarioEnum.toString(TipoUsuarioEnum.AUTOR)
        },
        {
            value: TipoUsuarioEnum.AVALIADOR,
            selected: false,
            text: TipoUsuarioEnum.toString(TipoUsuarioEnum.AVALIADOR)
        },
    ]
}

function getType(tipousuario) {
    return listTypes().map((current) => {
        if(current.value === tipousuario) {
            return {...current, selected: true}
        }
        return current
    })
}

module.exports = {
    listTypes,
    getType,
}