'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (clientModel) {
  async function createOrUpdate (client) {
    const cond = {
      _id: client._id
    }
    const existingClient = await clientModel.findOne(cond)

    if (existingClient) {
      const updated = await clientModel.updateOne(
        cond,
        { $set: client }
      )
      return updated ? clientModel.findOne(cond) : null
      // modificar
    }

    const result = await clientModel.create(client)
    return result.toJSON()
  }
  function findByUserId (user_id) {
    if (!ObjectId.isValid(user_id)) {
      return null
    }
    const cond = {
      user_id
    }
    return clientModel.findOne(cond)
  }
  function findById (_id) {
    if (!ObjectId.isValid(_id)) {
      return null
    }
    return clientModel.findById(_id)
  }

  function findAll () {
    return clientModel.find()
  }

  return {
    createOrUpdate, // implementado
    findByUserId, // implementado
    findById, // implementado
    findAll// implementado
  }
}
