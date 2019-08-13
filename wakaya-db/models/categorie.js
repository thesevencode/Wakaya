'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupClientModel (uri, config) {
  const mongoose = await setupDatabase(uri, config)


  const schema = new Mongoose.Schema({
    description: {
      type: String,
      required: true
    }
  }, { timestamps: true })

  return mongoose.model('categorie', schema)
}
