'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')
let model = null

module.exports = async function setupProducerModel (uri, config) {

    if(!model) {
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
                type: [Number]
            },
            categories: {
                type: [String]
            },
            url: {
                type: String
            },
            img: {
                type: String
            },
            id_organization: {
                type: String
            },
            organization: {
                name:{ type: String },
                _id: { type: String, unique: true }
            }
        })
        
        model = mongoose.model('producer', schema)
    }
   
    return model
}