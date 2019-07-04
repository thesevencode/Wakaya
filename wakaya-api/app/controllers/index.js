const organizationController = require('./organization.controller')
const authController = require('./auth.controller')
const producerController = require('./producer.controller')
const userController = require('./user.controller')


module.exports = () => {

    return {
        organizationController,
        authController,
        producerController,
        userController
    }

}