'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupClientModel (uri, config) {
    const mongoose = await setupDatabase(uri, config)

    const schemaCard = new Mongoose.Schema({
        name: {
            type: String,
            required: true,
            select: false
        },
        type: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required:true,
            select: false
        },
        cvc: {
            type: Number,
            required:true,
            select: false
        },
        country: {
            type: String,
            required: true,
            select: false
        },
        expiration : {
            type: Date,
            required: true
        }
    })

    const schema = new Mongoose.Schema({
        user_id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phones: {
            type: [Number]
        },
        address: {
            type: String
        },
        photography: {
            type: String
        },
        document: {
            type: { type: String },
            number: { type: Number }
        },
        card: [ schemaCard ]

    })

    return mongoose.model('client', schema)


}