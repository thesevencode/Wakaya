'use strict'

'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')
let model = null

module.exports = async function setupProducerModel (uri, config) {
  if (!model) {
    const mongoose = await setupDatabase(uri, config)

    const scoreSchema = new Mongoose.Schema({
      authorId: String,
      authorName: String,
      createdAt: { type: Date },
      score: Number,
      type: String
    })

    const schema = new Mongoose.Schema({
      id_producer: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      categories: {
        type: [String],
        required: true
      },
      records: [{
        url: { type: String },
        type: { type: String }
      }, {required: true} ],
      price: {
        type: Number,
        required: true
      },
      stock: {
        type: Number,
        required: true
      },
      qualifications: [scoreSchema],
      comments: [ {
        body: String,
        authorId: String,
        authorName: String,
        authorUrl: String
      }],
      offer: { type: Number, min:0, max:100 }
    }, { timestamps: true })

    model = mongoose.model('product', schema)
  }

  return model
}
