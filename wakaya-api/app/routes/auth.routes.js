'use strict'
const express = require('express')
const router = express.Router()

const { authController } = require('../controllers')()


module.exports = async() => {

    const controller = await authController()


    router
        .post('/login', controller.login)
        .post('/register', controller.register)


    // router.get('', async(req, res) => {

    //     users = await User.findAll()
    //     res.send(users);

    // })

    return router
}