'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const DB = require('../../db')
const { error, response } = require('../../../handlers')

const { auth } = require('../config')

const errors = error()
let message

module.exports = async() => {
    const { User } = await DB()

    async function login(req, res, next) {
        const body = req.body
        let user
        let userData

        const resp = response(res)

        try {
            user = await User.findByEmailSelectPassword(body.email)
        } catch (e) {
            return resp.resp500()
        }


        if (!user) {
            return resp.resp404(message = "El usuario no existe")
        }

        if (!bcrypt.compareSync(body.password, user.password)) {
            return resp.resp404(message = "El password no existe")
        }

        user = await User.findById(user._id)

        const payload = {
            user: user,
            permissions: []
        }
        if (user.type == 'client') {
            payload.permissions = [
                'user:read'
            ]
        } else if (user.type == 'producer') {
            payload.permissions = [
                'user:write',
                'user:read'
            ]
        }


        const token = jwt.sign(payload, auth.SEED, { expiresIn: 14400 }) // 4 horas

        userData = {
            user: user,
            token: token
        }

        resp.resp200(userData)
    }
    async function register(req, res, next) {
        const resp = response(res)
        let body = req.body
        let user

        try {
            user = await User.findByEmail(body.email)
        } catch (e) {
            return resp.resp500(message = "El usuario es invalido")
        }

        if (user) {
            return resp.resp500(message = "El usuario ya existe")
        }

        if (!body.password || body.password == '') {
            return resp.resp500(message = "El password es necesario")
        }

        if (!body.terms) {
            return resp.resp500(message = "Acepata los terminos y condiciones")
        }

        body.password = bcrypt.hashSync(body.password, 10)

        try {
            user = await User.createOrUpdate(body)
        } catch (e) {
            return resp.resp500()
        }

        user.password = ''


        resp.resp201(user)
    }


    return {
        login,
        register
    }
}