'use strict'
const DB = require('../../db')
const { error, response } = require('../../../handlers')

const errors = error()
let message

module.exports = async() => {
    const { Producer } = await DB()

    // async function create(req, res, next) {


    //     let producer

    //     try {
    //         producer = await Producer.createOrUpdate()
    //     } catch (error) {

    //     }
    // }
    async function findAll(req, res, next) {

        let producers
        let resp = response(res)

        try {
            producers = await Producer.findAll()
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(producers)

    }
    async function findOne(req, res, next) {
        let params = req.params
        let producer

        let resp = response(res)

        try {
            producer = await Producer.findById(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!producer) {
            return resp.resp404(message = 'No existe un productor con este id')
        }

        resp.resp200(producer)


    }
    async function findByidOrganization(req, res, next) {
        let params = req.params
        let producers

        let resp = response(res)

        try {
            producers = await Producer.findByidOrganization(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!producers) {
            return resp.resp404()
        }

        resp.resp200(producers)
    }
    async function addOrUpdateOrganization(req, res, next) {
        let userData = req.user
        let body = req.body
        let producer

        let resp = response(res)

        try {
            producer = await Producer.addOrUpdateOrganization(userData.user._id, body)
        } catch (e) {
            return resp.resp500()
        }

        if (!producer) {
            return resp.resp404(message = 'Algo salio mal')
        }

        resp.resp200(producers)
    }
    async function deleteOrganization(req, res, next) {
        let userData = req.user
        let producer

        let resp = response(res)

        try {
            producer = await Producer.deleteOrganization(userData.user._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!producer) {
            return resp.resp404(message = 'Algo salio mal')
        }

        resp.resp200(producer)
    }

    async function findByCategories(req, res, next) {
        let body = req.body
        let producer

        let resp = response(res)

        try {
            producer = await Producer.addOrUpdateOrganization(userData.user._id, body)
        } catch (e) {
            return resp.resp500()
        }

        if (!producer) {
            return resp.resp404(message = 'Algo salio mal')
        }

        resp.resp200(producers)
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