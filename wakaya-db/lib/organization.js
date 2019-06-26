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
            
            return updated ? organizationModel.findOne(cond) : existingOrganization
        }

        const result = await organizationModel.create(organization)
        return result.toJSON()

    }

    async function addMembers (_id, listMembers) {

        const organization = await findById(_id)
        if(organization) {
            
            // const newMembers = await organization.members.push(members)
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
            return newMembers

        }

        return false
    }

    async function updateMember (_id, member) {
        const update  = await organizationModel.updateOne({
            
        })
    }


    function findById (_id) {

        if (!ObjectId.isValid(_id)) {
            return null
        }

        return organizationModel.findById(_id)
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
        updateMember,
        findById,//implementado
        findByEmail,//implementado
        findAll//implementado
    }
}