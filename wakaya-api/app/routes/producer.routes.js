'use strict'
const express = require('express')
const guard = require('express-jwt-permissions')()

const { authentication } = require('../middlewares')
const { producerController } = require('../controllers')()

const resp = require('../../../handlers').response()

const router = express.Router()

module.exports = async() => {

    const controller = await producerController()


    router
        .get('/', await controller.findAll)
        // .post('/', authentication.isLogged, guard.check('user:write'), controller.create)
        .use(resp.resp403)

    return router
}