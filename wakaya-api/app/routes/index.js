const authRoutes = require('./auth.routes')
const OrganizationRoutes = require('./organization.routes')
const PrducerRoutes = require('./producer.routes')
const UserRoutes = require('./user.routes')


module.exports = async app => {
    app.use('/api/auth', await authRoutes())
    app.use('/api/organization', await OrganizationRoutes())
    app.use('/api/user', await UserRoutes())
    app.use('/api/producer', await PrducerRoutes())
}