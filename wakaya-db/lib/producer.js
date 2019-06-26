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
            return updated ? producerModel.findOne(cond) : existingProducer
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

    function findByCategories (categories) {
        return producerModel.find({
            categories: { $in: categories }
        })
    }

    async function addCategorie (_id, categorie) {

        if (!ObjectId.isValid(_id)) {
            return null
        }
        
        return producerModel.updateOne(
            { _id },
            {
                $push: {
                    categories: {
                        $each: [categorie]
                    }
                }
            }
        )

    }

    function findAll () {
        return producerModel.find()
    }

    return {
        createOrUpdate,//implementado
        findById,//implementado
        findByCategories,//implementado
        addCategorie,//implementado
        findAll//implementado
    }
}