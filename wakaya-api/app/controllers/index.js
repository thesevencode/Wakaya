const organizationController = require('./organization.controller')
const authController = require('./auth.controller')
const producerController = require('./producer.controller')
const userController = require('./user.controller')
const clientController = require('./client.controller')
const productController = require('./product.controller')
const imageController = require('./image.controller')


module.exports = () => {

    return {
        organizationController,
        authController,
        producerController,
        userController,
        clientController,
        productController,
        imageController
    }

}