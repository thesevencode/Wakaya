const authRoutes = require('./auth.routes')
const OrganizationRoutes = require('./organization.routes')
const PrducerRoutes = require('./producer.routes')
const UserRoutes = require('./user.routes')
const ClientRoutes = require('./client.routes')
const ProductRoutes = require('./product.routes')
const ImageRoutes = require('./image.routes')


module.exports = async app => {
    app.use('/api/auth', await authRoutes())
    app.use('/api/organization', await OrganizationRoutes())
    app.use('/api/user', await UserRoutes())
    app.use('/api/producer', await PrducerRoutes())
    app.use('/api/client', await ClientRoutes())
    app.use('/api/product', await ProductRoutes())
    app.use('/api/image', await ImageRoutes())
}