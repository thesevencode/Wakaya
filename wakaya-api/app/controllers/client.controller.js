'use strict'
const DB = require('../../db')
const { error, response } = require('../../../handlers')

const errors = error()
let message

module.exports = async() => {
    const { Client } = await DB()
    async function findAll(req, res, next) {

        let clients
        let resp = response(res)

        try {
            clients = await Client.findAll()
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(clients)

    }
    async function findOne(req, res, next) {
        let params = req.params
        let client

        let resp = response(res)

        try {
            client = await Client.findById(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!client) {
            return resp.resp404(message = 'No existe un productor con este id')
        }

        resp.resp200(client)


    }

    async function findByUserId(req, res, next) {
        let params = req.params
        let client

        let resp = response(res)

        try {
            client = await Client.findByUserId(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!client) {
            return resp.resp404(message = 'No existe un cliente con este id')
        }

        resp.resp200(client)


    }

    async function update(req, res, next) {

    }
    async function erase(req, res, next) {


    }


    return {
        findAll,
        findOne,
        findByUserId
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