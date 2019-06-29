'use strict'
const express = require('express')
const guard = require('express-jwt-permissions')()

const { authentication } = require('../middlewares')
const { organizationController } = require('../controllers')()

const resp = require('../../../handlers').response()

const router = express.Router()

module.exports = async() => {

    const controller = await organizationController()


    router
        .post('/', authentication.isLogged, guard.check('user:write'), controller.create)
        .get('', await controller.all)
        .use(resp.resp403)

    return router
}