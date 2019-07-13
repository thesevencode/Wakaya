'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (producerModel) {
  async function createOrUpdate (producer) {
    const cond = {
      _id: producer._id
    }
    const existingProducer = await producerModel.findOne(cond)

    if (existingProducer) {
      const updated = await producerModel.updateOne(
        cond,
        {
          $set: producer
        }
      )
      return updated ? producerModel.findOne(cond) : null
    }

    const result = await producerModel.create(producer)
    return result.toJSON()
  }

  function findById (_id) {
    if (!ObjectId.isValid(_id)) {
      return null
    }

    return producerModel.findById(_id)
  }

  function findByidOrganization (id_organization) {
    const cond = {
      id_organization
    }

    return producerModel.find(cond)
  }

  function findByCategories (categories) {
    return producerModel.find({
      categories: { $in: categories }
    })
  }

  async function addCategorie (_id, categorie) {
    if (!ObjectId.isValid(_id)) {
      return null
    }

    const update = await producerModel.updateOne(
      { _id },
      {
        $push: {
          categories: {
            $each: [categorie]
          }
        }
      }
    )

    return !!update
  }

  async function addOrUpdateOrganization (_id, organization) {
    if (!ObjectId.isValid(_id)) {
      return null
    }

    const cond = {
      _id
    }

    const updated = await producerModel.updateOne(cond, {
      organization: organization
    })

    return updated ? producerModel.findOne(cond, 'organization') : false
  }
  async function deleteOrganization (_id) {
    const cond = {
      _id
    }

    const deleted = await producerModel.updateOne(cond, {
      $unset: { 'organization': '' }
    })

    return !!deleted
  }

  function findAll () {
    return producerModel.find()
  }

  return {
    createOrUpdate, // implementado
    findById, // implementado
    findByidOrganization, // implemetado
    findByCategories, // implementado
    addCategorie, // implementado
    addOrUpdateOrganization, // implementado
    deleteOrganization, // implementado
    findAll// implementado
  }
}
