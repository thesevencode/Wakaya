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
        .post('/:type/:id',
            // authentication.isLogged,
            await controller.updateFile)
        .post('/image', await controller.sendImage)

    return router
}