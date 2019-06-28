'use strict'
const DB = require('../../db')
const { error, response } = require('../../../handlers')

const errors = error()

let message

module.exports = async() => {
    const { Organization } = await DB()

    async function create(req, res, next) {
        const resp = response(res)
        const body = req.body
        let organization

        try {
            organization = await Organization.createOrUpdate(body)
        } catch (e) {
            return resp.resp500()
        }
        resp.resp201(organization)
    }
    async function all(req, res, next) {
        const resp = response(res)
        let organizations

        try {
            organizations = await Organization.findAll()
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(organizations)
    }


    return {
        create,
        all
    }
}

// implementar funcions
// -->create