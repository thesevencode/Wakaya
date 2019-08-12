'use strict'
const DB = require('../../db')
const { error, response } = require('../../../handlers')

const errors = error()

let message

module.exports = async() => {
    const { Product } = await DB()

    async function create(req, res, next) {
        const resp = response(res)
        const body = req.body
        let product

        try {
            product = await Product.createOrUpdate(body)
        } catch (e) {
            return resp.resp500()
        }
        resp.resp201(product)
    }
    async function findAll(req, res, next) {
        const resp = response(res)
        let products

        try {
            products = await Product.findAll()
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(products)
    }

    async function findByCategories(req, res, next) {
        const resp = response(res)
        const body = req.body
        const params = req.params

        let products

        try {
            products = await Product.findByCategories(categories)
        } catch (e) {
            return resp.resp500()
        }

        resp.resp200(products)
    }

    async function findOne(req, res, next) {
        const resp = response(res)
        const params = req.params
        let product

        try {
            product = await Product.findById(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!product) {
            resp.resp404(message = 'no existe un producto con este ID')
        }

        resp.resp200(product)
    }
    async function findByProducer(req, res, next) { // Corregir
        const resp = response(res)
        const params = req.params
        let product

        try {
            product = await Product.findByProducerId(params._id)
        } catch (e) {
            return resp.resp500()
        }

        if (!product) {
            resp.resp404(message = 'no existe una producto con este ID')
        }

        resp.resp200(product)
    }


    return {
        create,
        findAll,
        findByCategories,
        findOne,
        findByProducer
    }
}

// implementar funcions
// -->create