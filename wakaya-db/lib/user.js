'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (userModel) {
    async function createOrUpdate (user) {
        const cond = {
          _id: user._id
        }
        const existingUser = await userModel.findOne(cond)
    
        if (existingUser) {
          const updated = await userModel.updateOne(
            cond,
            { $set: user }
          )
          return updated ? userModel.findOne(cond) : existingUser
          // modificar
        }
    
        const result = await userModel.create(user)
        return result.toJSON()
    }
    
    function findById (id) {
        
        if (!ObjectId.isValid(id)) {
          return null
        }
        return userModel.findById(id)

    }
    
    function findByEmail (email) {
          return userModel.findOne({
              email: email
          })
    }

    function findAll () {
        return userModel.find()
    }

      return {
          createOrUpdate,
          findById,
          findByEmail,
          findAll
      }
}