'use strict'
const express = require('express')
const guard = require('express-jwt-permissions')()

const { authentication } = require('../middlewares')
const { clientController } = require('../controllers')()

const resp = require('../../../handlers').response()

const router = express.Router()

module.exports = async() => {

    const controller = await clientController()


    router
        .get('/', controller.findAll)
        .get('/client_id/:_id', await controller.findOne)
        .get('/user_id/:_id', await controller.findByUserId)
        .use(resp.resp403)

    return router
}