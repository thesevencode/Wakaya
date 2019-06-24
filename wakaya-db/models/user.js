'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupUserModel (uri, config) {

    const mongoose = await setupDatabase(uri, config)

    const schema = new Mongoose.Schema({
        email:  {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        type: {
            type: String,
            required: true
        },
        company: {
            name: { type: String },
            uuid: { type: String }
        }
    }, { timestamps: true, select: false })



    return mongoose.model('user', schema)

}