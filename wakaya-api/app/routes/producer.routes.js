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
        .get('/id_producer/:_id', await controller.findOne)
        .get('/id_organization/:_id', await controller.findByidOrganization)
        .get('/by_categories', await controller.findByCategories)
        .post('/organization', // Route
            // Middlewares
            authentication.isLogged,
            guard.check('user:write'),
            // Controller
            await controller.addOrUpdateOrganization
        )
        .post('/categorie',
            authentication.isLogged,
            guard.check('user:write'),
            await controller.addCategorie
        )
        .post('/sale',
            authentication.isLogged,
            guard.check('user:write'),
            await controller.createSale
        )
        .delete('/organization',
            authentication.isLogged,
            guard.check('user:write'),
            await controller.deleteOrganization)
        // .post('/', authentication.isLogged, guard.check('user:write'), controller.create)
        .use(resp.resp403)

    return router
}