'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (saleModel) {
  async function createOrUpdate (sale) {
    const cond = {
      _id: sale._id
    }
    const existingSale = await saleModel.findOne(cond)

    if (existingSale) {
      const updated = await saleModel.updateOne(
        cond,
        {
          $set: sale
        }
      )

      return updated ? saleModel.findOne(cond) : null
    }

    const result = await saleModel.create(sale)
    return result.toJSON()
  }


  function findById (_id) {
    if (!ObjectId.isValid(_id)) {
      return null
    }

    return saleModel.findById(_id)
  }
  function findByClientId (id_client) {
    if (!ObjectId.isValid(id_client)) {
      return null
    }
    const cond = {
      "client._id" : id_client
    }
    return saleModel.find(cond)
  }
  function findByProducerId (id_producer) {
    if (!ObjectId.isValid(id_producer)) {
      return null
    }

    const cond = {
      "product.id_producer" : id_producer 
    }
    return saleModel.find(cond)
  }

  function findByProductId (id_product) {
    if (!ObjectId.isValid(id_product)) {
      return null
    }

    const cond = {
      "product._id" : id_product 
    }
    return saleModel.find(cond)
  }

  function findByDestination (destination) {
    const cond = {
        destination
    }
    return saleModel.find(cond)
  }

  function findByPayment (payment) {
    const cond = {
        payment
    }
    return saleModel.find(cond)
  }


  function findAll () {
    return saleModel.find()
  }

  return {
    createOrUpdate, // implementado
    findById,
    findByClientId,
    findByProducerId,
    findByProductId,
    findByDestination,
    findByPayment,
    findAll

  }
}
