'use strict'
const express = require('express')
const router = express.Router()

const { authentication } = require('../middlewares')

const { authController } = require('../controllers')()


module.exports = async() => {

    const controller = await authController()


    router
        .post('/login', controller.login)
        .post('/register', controller.register)
        .get('/activate', authentication.verfyEmail, controller.activate)
        .post('/activate', controller.sendEmailActivate)


    // router.get('', async(req, res) => {

    //     users = await User.findAll()
    //     res.send(users);

    // })

    return router
}