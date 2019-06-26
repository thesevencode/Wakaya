module.exports = (res) => {
    return {
        resp404: function() {
            return res.status(404).json({
                status: false,
                message: 'Not Found: Recurso no encontrado'
            })
        },
        resp200: function(item) {
            res.status(200).json({
                status: true,
                item: item,
                message: 'Ok: Operacion exitosa'
            })
        },
        resp201: function(item) {
            res.status(201).json({
                status: true,
                item: item,
                message: 'Ok: Recurso creado con exito'
            })
        },
        resp500: function() {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error: Ha ocurrido un error en el servidor'
            })
        }
    }
}