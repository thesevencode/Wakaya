'use strict'
const fs = require('fs');

const express = require('express')
const fileUpload = require('express-fileupload');

const { authentication } = require('../middlewares')

const resp = require('../../../handlers').response()

const router = express.Router()

router.use(fileUpload)

module.exports = async() => {

    const controller = await organizationController()


    router
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


		});
        .use(resp.resp403)

    return router
}