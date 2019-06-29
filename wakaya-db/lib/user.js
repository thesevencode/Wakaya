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
          return updated ? userModel.findOne(cond) : null
          // modificar
        }

        user.activate = false
        const result = await userModel.create(user)
        return result.toJSON()
    }
    
    async function activateEmail (_id) {

      if (!ObjectId.isValid(_id)) {
        return null
      }

      const cond = {
        _id
      }

      const activate = await userModel.updateOne(cond,{
        activate: true
      })

      return activate ? true : false
    }

    function findById (_id) {
        
        if (!ObjectId.isValid(_id)) {
          return null
        }
        return userModel.findById(_id)

    }
    
    function findByEmail (email) {
          return userModel.findOne({
              email: email
          })
    }

    function findAll () {
        return userModel.find()
    }

    function findByEmailSelectPassword(email) {
        return userModel.findOne({
          email
        }).select('password')
    }

    return {
        createOrUpdate,//implementado
        activateEmail,//implementado
        findById,//implementado
        findByEmail,//implementado
        findAll,//implementado
        findByEmailSelectPassword//implementado
    }
}