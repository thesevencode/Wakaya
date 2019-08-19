'use strict'
const express = require('express')
const guard = require('express-jwt-permissions')()

const { authentication } = require('../middlewares')
const { productController } = require('../controllers')()

const resp = require('../../../handlers').response()

const router = express.Router()

module.exports = async() => {

    const controller = await productController()

    router
        .get('/', await controller.findAll)
        .get('/id_product/:_id', await controller.findOne)
        .get('/by_categories', await controller.findByCategories) //corregir
        .get('/categorie', await controller.findAllCategories)
        .post('/', authentication.isLogged, await controller.create) // Route
        // Middlewares
        // 

    // Controller


    .post('/categorie', await controller.createCategorie)
        .use(resp.resp403)

    return router
}