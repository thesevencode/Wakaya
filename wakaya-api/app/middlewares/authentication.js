const jwt = require('jsonwebtoken')

const { auth } = require('../config')

const middlewares = {

    isLogged: function(req, res, next) {
        var token = req.query.token;

        jwt.verify(token, auth.SEED, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'Token incorrecto',
                    errors: err
                });
            }

            req.user = {
                userData: decoded.user,
                permissions: decoded.permissions
            }

            next();


        });
    }

}

module.exports = middlewares