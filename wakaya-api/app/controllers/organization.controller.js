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
    async function findAll(req, res, next) {
        const resp = response(res)
        let organizations

        try {
            organizations = await Organization.findAll()
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(organizations)
    }

    async function addMembers(req, res, next) {
        const resp = response(res)
        const body = req.body
        const params = req.params

        let organizations

        try {
            organizations = await Organization.addMembers(params._id, body.producers)
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(organizations)
    }

    async function findByIdListMembers(req, res, next) {
        const resp = response(res)
        const params = req.params

        let producers

        try {
            producers = await Organization.findByIdListMembers(params._id)
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(producers)
    }

    async function updateMember(req, res, next) {
        const resp = response(res)
        const params = req.params
        const body = req.body

        let producers

        try {
            producers = await Organization.updateMember(params._id, body.member)
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(producers)
    }

    async function findOne(req, res, next) {
        const resp = response(res)
        const params = req.params
        let organization

        try {
            organization = await Organization.findById(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!organization) {
            resp.resp404(message = 'no existe una organizacion con este ID')
        }

        resp.resp200(organization)
    }
    async function findByProducer(req, res, next) {
        const resp = response(res)
        const params = req.params
        let organization

        try {
            organization = await Organization.findByProducerId(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!organization) {
            resp.resp404(message = 'no existe una organizacion con este ID')
        }

        resp.resp200(organization)
    }


    return {
        create,
        findAll,
        addMembers,
        findByIdListMembers,
        updateMember,
        findOne,
        findByProducer
    }
}

// implementar funcions
// -->create