const jwt = require('jsonwebtoken')

const { auth } = require('../config')
const { response } = require('../../../handlers')

const middlewares = {

    isLogged: function(req, res, next) {
        const token = req.query.token;

        const resp = response(res)

        jwt.verify(token, auth.SEED, (err, decoded) => {

            if (err) {
                return resp.resp401()
            }

            console.log(decoded)
            req.user = {
                userData: decoded.user,
                permissions: decoded.permissions
            }

            next();


        });
    }

}

module.exports = middlewares