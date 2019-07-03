'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars');
const fs = require('fs');


const DB = require('../../db')
const { error, response } = require('../../../handlers')


const { auth } = require('../config')

const errors = error()
let message

module.exports = async() => {
    const { User, Producer, Client } = await DB()

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
        let transporter = nodemailer.createTransport(auth.GoogleAuth);

        let body = req.body
        let message
        let info
        let user
        let data

        console.log(req.body)

        try {
            user = await User.findByEmail(body.user.email)
        } catch (e) {
            return resp.resp500(message = "El usuario es invalido")
        }

        if (user) {
            return resp.resp500(message = "El usuario ya existe")
        }

        if (!body.user.password || body.user.password == '') {
            return resp.resp500(message = "El password es necesario")
        }

        if (!body.user.terms) {
            return resp.resp500(message = "Acepata los terminos y condiciones")
        }

        body.user.password = bcrypt.hashSync(body.user.password, 10)

        try {
            user = await User.createOrUpdate(body.user)
        } catch (e) {
            return resp.resp500()
        }

        try {

            body.data.user_id = user._id

            if (user.type == 'client') {
                data = Client.createOrUpdate(body.data)
            } else if (user.type == 'producer') {
                data = Producer.createOrUpdate(body.data)
            }

        } catch {
            return resp.resp500()
        }

        delete user.password

        const token = jwt.sign({ user }, auth.SEED, { expiresIn: 14400 }) // 4 horas


        readHTMLFile('app/template/email.html', function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                uri: 'http://localhost:3000/api/auth/activate?token=' + token
            }

            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'manumayo8@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: "Mensaje de verificacion", // Subject line
                html: htmlToSend // html body
            }

            transporter.sendMail(mailOptions, function(error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
            })
        });



        resp.resp201({ user, data })
    }

    async function sendEmailActivate(req, res, next) {
        const resp = response(res)
        const body = req.body
        let message
        let user

        try {
            user = await User.findByEmail(body.email)
        } catch {
            return resp.resp500(message = 'Tienes que tener un usuario')
        }

        if (!user) {
            return resp.resp404()
        }


        const token = jwt.sign({ user }, auth.SEED, { expiresIn: 14400 })

        readHTMLFile('app/template/email.html', function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                uri: 'http://localhost:3000/api/auth/activate?token=' + token
            }

            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'manumayo8@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: "Mensaje de verificacion", // Subject line
                html: htmlToSend // html body
            }

            transporter.sendMail(mailOptions, function(error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
            })
        })

        resp.resp200();
    }

    async function activate(req, res, next) {

        const resp = response(res)
        let user

        try {
            user = await User.activateEmail(req.user._id)
        } catch (e) {
            return resp.resp500(message = 'No es posible la validacion')
        }

        resp.resp202(user)
    }


    return {
        login,
        register,
        activate,
        sendEmailActivate
    }
}


var readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};