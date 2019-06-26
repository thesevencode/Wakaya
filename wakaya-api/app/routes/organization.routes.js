const express = require('express')
const DataBase = require('../../../wakaya-db')
    // const bcrypt = require('bcryptjs')

const { error, response } = require('../../../handlers')
const { authentication } = require('../middlewares')

const router = express.Router()
const errors = error()

module.exports = async(DB) => {
    const { Organization } = await DB

    router.post('/', async(req, res) => {

        const resp = response(res)
        const body = req.body

        const organization = await Organization.createOrUpdate(body).catch(errors.handleFatalError)

        if (!organization) {
            resp.resp500()
        }

        resp.resp201(organization)

    })


    router.get('', async(req, res) => {

        const organizations = await Organization.findAll();

        res.send(organizations);

    })

    return router
}