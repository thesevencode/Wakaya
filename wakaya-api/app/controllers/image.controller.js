'use strict'
const Path = require('path')
const fs = require('fs')


const DB = require('../../db')
const { error, response } = require('../../../handlers')


const errors = error()
let message
module.exports = async() => {

    async function updateFile(req, res, next) {

        const params = req.params
        const files = []

        let splitName = ''
        let fileExtension = ''
        let path = ''
        let paths = []



        if (!req.files) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No selecciono nada',
                errors: { message: 'Debe de seleccionar una imagen' }
            })
        }


        for (const key in req.files) {
            if (req.files.hasOwnProperty(key)) {
                const element = req.files[key];
                files.push(element)
            }
        }
        // const allowedFiles = []

        for (const iterator of files) {

            let fileName = ''
            let imagePath = ''

            splitName = iterator.name.split('.')
            fileExtension = splitName[splitName.length - 1]
            fileName = `${ params.id }-${ new Date().getMilliseconds() }.${ fileExtension }`
            path = `./public/uploads/${ params.type }/${ fileName }`
            imagePath = Path.join(__dirname, '../../' + path)
            console.log(new Date().getMilliseconds())
            await iterator.mv(imagePath, err => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al mover archivo',
                        errors: err
                    })
                }


                console.log(imagePath)
                setTimeout(() => {
                    uploadByType(params.type, params.id, imagePath, res, req)
                }, 10)



            })
        }

        // // Mover el archivo del temporal a un path
        // // const path = `./public/uploads/${ params.tipo }/${ fileName }`

        // const 


    }

    async function sendImage(req, res, next) {

        if (!req.body.image) {
            res.status(500).json({
                status: false,
                message: 'Algo salio mal'
            })
        }

        var image = req.body.image

        var pathImagen = image

        if (fs.existsSync(pathImagen)) {
            res.sendFile(pathImagen)
        } else {
            console.log(__dirname)
            var pathNoImagen = Path.join(__dirname, '../../public/no-img.jpg')
            res.sendFile(pathNoImagen)
        }
    }

    return {
        updateFile,
        sendImage
    }
}

async function uploadByType(type, id, path, res, req) {

    const resp = response(res)

    const {
        Producer,
        Client,
        Product,
        Organization
    } = await DB()


    if (type === 'producer') {

        let producer

        try {
            producer = await Producer.findById(id)
        } catch (e) {
            return resp.resp500()
        }



        if (producer) {
            if (fs.existsSync(producer.img)) {
                fs.unlink(producer.img, (e) => {
                    return e
                })
            }
        }

        producer.img = path

        try {
            producer = await Producer.createOrUpdate(producer)
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(producer)
    }



    if (type === 'client') {
        let client

        try {
            client = await Client.findById(id)
        } catch (e) {
            return resp.resp500()
        }

        if (client) {
            if (fs.existsSync(client.photography)) {
                fs.unlink(client.photography, (e) => {
                    return e
                })
            }
        }

        client.photography = path

        try {
            client = await Client.createOrUpdate(cliente)
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(client)
    }

    if (type === 'product') {
        let product

        try {
            product = await Product.findById(id)
        } catch (e) {
            return resp.resp500()
        }

        await product.records.push({
            url: path,
            type: req.body.type
        })


        try {
            product = await Product.createOrUpdate(product)
        } catch (e) {
            return resp.resp500()
        }

        // resp.resp200(product)

    }

    if (type === 'organization') {
        let organization

        try {
            organization = await Organization.findById(id)
        } catch (e) {
            return resp.resp500()
        }

        if (organization) {
            if (fs.existsSync(organization.img)) {
                fs.unlink(organization.img, (e) => {
                    return e
                })
            }
        }

        organization.img = path

        try {
            organization = await Organization.createOrUpdate(organization)
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(organization)
    }


}