const loginRoutes = require('./login.routes');

module.exports = async app => {
    app.use('', await loginRoutes)
}