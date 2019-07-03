const organizationController = require('./organization.controller')
const authController = require('./auth.controller')
const producerController = require('./producer.controller')

module.exports = () => {

    return {
        organizationController,
        authController,
        producerController
    }

}