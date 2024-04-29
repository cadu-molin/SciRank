const StatusArtigo = {
    REVISAO: 0,
    ACEITO: 1,
    REJEITADO:2,
    OUTRO: -1,
    toString: (tipo)=>{
        const tipoString = [
            'Em revisão',
            'Aceito',
            'Rejeitado'
        ]
        return tipoString[tipo] ?? "Outro"
    }
}

module.exports = StatusArtigo