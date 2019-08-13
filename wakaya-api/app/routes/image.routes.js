'use strict'
const fs = require('fs');

const express = require('express')

const { authentication } = require('../middlewares')

const { imageController } = require('../controllers')()

const resp = require('../../../handlers').response()

const router = express.Router()

module.exports = async() => {

    const controller = await imageController()

    router
        .post('/:tipo/:id', await controller.updateFile)
        .get('/:tipo/:img', (req, res, next) => {



            var tipo = req.params.tipo;
            var img = req.params.img;

            var pathImagen = path.resolve(__dirname, `../uploads/${ tipo }/${ img }`);

            if (fs.existsSync(pathImagen)) {
                res.sendFile(pathImagen);
            } else {
                var pathNoImagen = path.resolve(__dirname, '../assets/no-img.jpg');
                res.sendFile(pathNoImagen);
            }


        })

    return router
}