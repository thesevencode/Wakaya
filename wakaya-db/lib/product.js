'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (productModel) {
  async function createOrUpdate (product) {
    const cond = {
      _id: product._id
    }
    const existingProduct = await productModel.findOne(cond)

    if (existingProduct) {
      const updated = await productModel.updateOne(
        cond,
        {
          $set: product
        }
      )

      return updated ? productModel.findOne(cond) : null
    }

    const result = await productModel.create(product)
    return result.toJSON()
  }

  async function updateStock (_id, stock) {
    const cond = {
      _id
    }

    const updated = await productModel.updateOne(
      cond,
      {
        $set: {stock}
      }
    )

    return updated ? productModel.findOne(cond) : null
  }

  function findByCategories (categories) {
    return productModel.find({
      categories: { $in: categories } // options : $all, $nin, $in
    })
  }

  function findById (_id) {
    if (!ObjectId.isValid(_id)) {
      return null
    }

    return productModel.findById(_id)
  }

  function findByProducerId (id_producer) {
    if (!ObjectId.isValid(id_producer)) {
      return null
    }

    const cond = {
      id_producer
    }
    return productModel.find(cond)
  }

  function findAll () {
    return productModel.find()
  }

  return {
    createOrUpdate, // implementado
    updateStock,//implementado
    findByCategories, // implementado
    findById, // implementado
    findByProducerId, // implementado
    findAll// implementado
    // findByQualifications : analizar
  }
}
