const express = require('express')
    // const bcrypt = require('bcryptjs')

const { error, response } = require('../../../handlers')
const { authentication } = require('../middlewares')

const router = express.Router()
const errors = error()

module.exports = async(DB) => {
    const { Organization } = await DB()

    router.post('/', async(req, res) => {

        const resp = response(res)
        const body = req.body

        const organization = await Organization.createOrUpdate(body).catch(errors.handleFatalError)

        if (!organization) {
            resp.resp500().catch(errors.handleFatalError)
        }

        resp.resp201(organization).catch(errors.handleFatalError)

    })


    router.get('', async(req, res) => {
        const resp = response(res)
        const organizations = await Organization.findAll().catch(errors.handleFatalError);

        if (!organizations) {
            resp.resp500().catch(errors.handleFatalError)
        }

        resp.resp200(organizations).catch(errors.handleFatalError)

    })

    return router
}