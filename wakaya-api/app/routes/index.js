const DB = require('../../db')

const loginRoutes = require('./login.routes')
const OrganizationRoutes = require('./organization.routes')


module.exports = async app => {
    app.use('', await loginRoutes)
    app.use('/api/organization', await OrganizationRoutes(DB))
}