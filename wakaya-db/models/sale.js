'use strict'

'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')
let model = null

module.exports = async function setupProducerModel (uri, config) {
  if (!model) {
    const mongoose = await setupDatabase(uri, config)

    const schema = new Mongoose.Schema({
      client: {
        _id: { type: String, required:true },
        name: { type:String, required: true },
        lastName: { type: String, required: true }
      },
      product: {
        _id: { type: String, required: true },
        id_producer: { type: String, required: true },
        name: { type: String, required: true },
        description: {type: String},
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      },
      destination: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      payment: { // 'card'   or  'cash'
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }, { timestamps: true })

    model = mongoose.model('sale', schema)
  }

  return model
}
