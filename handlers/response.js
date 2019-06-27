module.exports = (res) => {
    return {
        resp404: async function(message = "") {
            return res.status(404).json({
                status: false,
                message: 'Not Found: Recurso no encontrado ' + message
            })
        },
        resp401: async function(message = "") {
            return res.status(404).json({
                status: false,
                message: 'Unauthorized: Usuario incorrecto ' + message
            })
        },
        resp200: async function(item, message = "") {
            return res.status(200).json({
                status: true,
                item: item,
                message: 'Ok: Operacion exitosa ' + message
            })
        },
        resp201: async function(item, message = "") {
            return res.status(201).json({
                status: true,
                item: item,
                message: 'Ok: Recurso creado con exito ' + message
            })
        },
        resp500: async function(message = "") {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error: Ha ocurrido un error en el servidor ' + message
            })
        }
    }
}