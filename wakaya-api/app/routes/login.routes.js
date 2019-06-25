const express = require('express')
    // const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const guard = require('express-jwt-permissions')()

const { auth } = require('../config')

const { authentication } = require('../middlewares')

const app = express()





// ==========================================
//  Autenticación normal
// ==========================================
app.post('/', (req, res) => {

    const payload = {
        user: 'UserDB',
        permissions: [
            "admin",
            // "user:read",
            // "user:write"
        ]
    }

    const token = jwt.sign(payload, auth.SEED, { expiresIn: 14400 }) // 4 horas

    res.status(200).json({
        ok: true,
        user: payload.user,
        token: token
    })

})


app.get('', authentication.isLogged, guard.check('admin'), (req, res) => {

    res.send(req.user);

})







module.exports = app