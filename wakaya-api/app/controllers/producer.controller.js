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
        } catch {
            return resp.resp500()
        }

        resp.resp200(producers)

    }
    async function findOne(req, res, next) {

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