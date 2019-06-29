'use strict'

const ObjectId = require('mongoose').Types.ObjectId
 
module.exports = function (organizationModel) {

    async function createOrUpdate (organization) {
        const cond = {
            _id: organization._id
        }
        const existingOrganization = await organizationModel.findOne(cond)

        if (existingOrganization) {
            const updated = await organizationModel.updateOne(
                cond,
                { 
                    $set: organization
                }
            )
            
            return updated ? organizationModel.findOne(cond) : null
        }

        const result = await organizationModel.create(organization)
        return result.toJSON()

    }

    async function addMembers (_id, listMembers) {

        const organization = await findById(_id)
        if(organization) {
            
            const newMembers = await  organizationModel.updateOne(
                    { _id },
                    {
                    $push: {
                        members: {
                            $each: listMembers
                        }
                    }
                    }
                )
            return newMembers ? findByIdListMembers(_id) : null

        }

        return null
    }

    function findByIdListMembers (_id) {
        if (!ObjectId.isValid(_id)) {
            return null
        }

        const cond = {
            _id
        }
        return organizationModel.findById(cond).select('members')
    }

    async function updateMember (_id, member) {

        const cond = {
            _id,
            "members._id": member._id
        }

        const update  = await organizationModel.updateOne(cond,{
            $set: { "members.$": member }
        })

        return update ? member : null


    }


    function findById (_id) {

        if (!ObjectId.isValid(_id)) {
            return null
        }

        return organizationModel.findById(_id)
    }

    function findByProducerId (producer_id) {
        if (!ObjectId.isValid(_id)) {
            return null
        }
        
        const cond = {
            producer_id
        }
        return organizationModel.findOne(cond)
    }

    function findByEmail (email) {
        return organizationModel.findOne({
            email: email
        })
    }

    function findAll () {
        return organizationModel.find()
    }

    return {
        createOrUpdate,//implementado
        addMembers,//implementado
        findByIdListMembers,//implementado
        updateMember,//implementado
        findById,//implementado
        findByProducerId,//implementado
        findByEmail,//implementado
        findAll//implementado
    }
}