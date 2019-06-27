const DB = require('../../db')

const authRoutes = require('./auth.routes')
const OrganizationRoutes = require('./organization.routes')


module.exports = async app => {
    app.use('/api/auth', await authRoutes(DB))
    app.use('/api/organization', await OrganizationRoutes(DB))
}