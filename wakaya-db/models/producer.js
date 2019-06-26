'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupProducerModel (uri, config) {
    const mongoose = await setupDatabase(uri, config)

    const schema = new Mongoose.Schema({
        user_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        phones: {
            type: [Number],
            required: true
        },
        categories: {
            type: [String]
        },
        img: {
            type: String
        }
    })

    return mongoose.model('producer', schema)
}