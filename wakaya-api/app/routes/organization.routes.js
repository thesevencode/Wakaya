const express = require('express')
    // const bcrypt = require('bcryptjs')

const { error, response } = require('../../../handlers')
const { authentication } = require('../middlewares')

const router = express.Router()
const errors = error()

module.exports = async(DB) => {
    const { Organization } = await DB()

    router.post('/', authentication.isLogged, async(req, res, next) => {

        const resp = response(res)
        const body = req.body
        let organization

        console.log(req.user)

        try {
            organization = await Organization.createOrUpdate(body)
        } catch (e) {
            return resp.resp500()
        }
        resp.resp201(organization)

    })


    router.get('', async(req, res) => {
        const resp = response(res)
        const organizations = await Organization.findAll().catch(errors.handleFatalError);

        if (!organizations) {
            resp.resp500()
        }

        resp.resp200(organizations)

    })

    return router
}