'use strict'
const DB = require('../../db')
const { error, response } = require('../../../handlers')

const errors = error()
let message

module.exports = async() => {
    const { User } = await DB()

    // async function create(req, res, next) {


    //     let producer

    //     try {
    //         producer = await Producer.createOrUpdate()
    //     } catch (error) {

    //     }
    // }
    async function findAll(req, res, next) {

        let users
        let resp = response(res)

        try {
            users = await User.findAll()
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(users)

    }
    async function findOne(req, res, next) {
        let params = req.params
        let user

        let resp = response(res)

        try {
            user = await User.findById(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!user) {
            return resp.resp404(message = 'No existe un productor con este id')
        }

        resp.resp200(user)


    }
    async function findByidOrganization(req, res, next) {

    }
    async function addOrUpdateOrganization(req, res, next) {

    }
    async function deleteOrganization(req, res, next) {

    }

    async function findByCategories(req, res, next) {

    }
    async function addCategorie(req, res, next) {

    }

    async function update(req, res, next) {

    }
    async function erase(req, res, next) {


    }


    return {
        findAll,
        findOne,
        findByidOrganization,
        addOrUpdateOrganization,
        deleteOrganization,
        findByCategories,
        addCategorie,
        update,
        erase
    }
}