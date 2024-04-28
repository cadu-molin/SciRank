const TipoUsuario = {
    ADMIN: 0,
    AUTOR: 1,
    AVALIADOR:2,
    OUTRO: -1,
    toString: (tipo)=>{
        const tipoString = [
            'Administrador',
            'Autor',
            'Avaliador'
        ]
        return tipoString[tipo] ?? "Outro"
    }
}

module.exports = TipoUsuario