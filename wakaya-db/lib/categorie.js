'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (categorieModel) {
  async function createOrUpdate (categorie) {
    const cond = {
      _id: categorie._id
    }
    const existingCategorie = await categorieModel.findOne(cond)

    if (existingCategorie) {
      const updated = await categorieModel.updateOne(
        cond,
        { $set: categorie }
      )
      return updated ? categorieModel.findOne(cond) : null
      // modificar
    }

    const result = await categorieModel.create(categorie)
    return result.toJSON()
  }
  
  function findById (_id) {
    if (!ObjectId.isValid(_id)) {
      return null
    }
    return categorieModel.findById(_id)
  }

  function findAll () {
    return categorieModel.find()
  }

  return {
    createOrUpdate, // implementado
    findById, // implementado
    findAll// implementado
  }
}
