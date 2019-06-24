'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')


module.exports = async function setupOrganizationModel(uri, config) {
    const mongoose = await setupDatabase(uri, config)
    const ProducerModel = await require('./producer')(uri, config)

    
    const schema = new Mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String, 
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        phones: {
            type: [Number],
            required: true
        },
        address: {
            type: String
        },
        url: {
            type: String
        },
        img: {
            type: String
        },
        members: {
            type: [ProducerModel.schema]
        }
    })

    return mongoose.model('organization', schema)

}