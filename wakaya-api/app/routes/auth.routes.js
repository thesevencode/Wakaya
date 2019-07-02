'use strict'
const express = require('express')
const router = express.Router()

const { authentication } = require('../middlewares')

const { authController } = require('../controllers')()


module.exports = async() => {

    const controller = await authController()


    router
        .get('', controller.all)
        .post('/login', controller.login)
        .post('/register', controller.register)
        .get('/activate', authentication.verfyEmail, controller.activate)
        .post('/activate', controller.prueba)


    // router.get('', async(req, res) => {

    //     users = await User.findAll()
    //     res.send(users);

    // })

    return router
}