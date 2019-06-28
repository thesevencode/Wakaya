const organizationController = require('./organization.controller')
const authController = require('./auth.controller')

module.exports = () => {

    return {
        organizationController,
        authController
    }

}