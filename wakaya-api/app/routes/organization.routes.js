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
        .get('/', controller.findAll)
        .get('/id_organization/:_id', controller.findOne)
        .get('/by_producer/:_id', controller.findByProducer)
        .get('/list_members', controller.findByIdListMembers)
        .post('/',
            authentication.isLogged,
            guard.check('user:write'),
            controller.create
        )
        .post('/members/:_id',
            authentication.isLogged,
            guard.check('user:write'),
            controller.addMembers
        )
        .put('member:_id',
            authentication.isLogged,
            guard.check('user:write'),
            controller.updateMember
        )
        .use(resp.resp403)

    return router
}