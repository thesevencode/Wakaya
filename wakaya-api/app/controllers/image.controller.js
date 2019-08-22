'use strict'
const Path = require('path')
const fs = require('fs')
const os = require('os')


const DB = require('../../db')
const { error, response } = require('../../../handlers')


const errors = error()
let message
module.exports = async() => {

    async function updateFile(req, res, next) {

        const params = req.params
        const files = []


        let i = 0;


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
            let splitName = ''
            let fileExtension = ''
            let path = ''

            splitName = iterator.name.split('.')

            fileExtension = splitName[splitName.length - 1]

            fileName = `${ params.id }-${ new Date().getMilliseconds() + (i+=1)}.${ fileExtension }`
            path = `/public/uploads/${ params.type }/${ fileName }`
            imagePath = Path.join(__dirname, '../../' + path)
            await iterator.mv(imagePath, err => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al mover archivo',
                        errors: err
                    })
                }

                setTimeout(() => {
                    uploadByType(params.type, params.id, path, res, req)
                }, 200)



            })
        }


    }

    async function sendImage(req, res, next) {

        if (!req.body.image) {
            res.status(500).json({
                status: false,
                message: 'Algo salio mal'
            })
        }



        var image = req.body.image

        var path = Path.join(__dirname, '../..', image)

        if (fs.existsSync(path)) {
            res.sendFile(path)
        } else {
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

        //resp.resp200(client)
    }

    if (type === 'product') {
        let product

        try {
            product = await Product.findById(id)
        } catch (e) {
            return resp.resp500()
        }

        product.records.push({
            url: path,
            type: req.body.type
        })
        console.log(product)

        try {
            product = await Product.createOrUpdate(product)
        } catch (e) {
            return resp.resp500()
        }

        //resp.resp200(product)

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