'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015'
  }
  const { User } = await db(uri, config).catch(handleFatalError)

  // const User1 = await User.createOrUpdate({
  //   email: 'denisricardo@gmail.com',
  //   password: 'ciro1998',
  //   type: 'producer', // client  or salesman
  //   terms: true
  // }).catch(handleFatalError)

  // const User2 = await User.createOrUpdate({
  //   email: 'sadam@gmail.com',
  //   password: 'sadam4567',
  //   type: 'salesman' // client  or salesma
  // }).catch(handleFatalError)

  // const User3 = await User.createOrUpdate({
  //   email: 'juan@gmail.com',
  //   password: 'loper102',
  //   type: 'client' // client  or salesman
  // }).catch(handleFatalError)

  // const User4 = await User.createOrUpdate({
  //   email: 'denis@gmail.com',
  //   password: 'denis1234',
  //   type: 'salesman' // client  or salesman
  // }).catch(handleFatalError)

  //   console.log('CREATING NEWS USERS')

  //   console.log(User2)
  //   console.log('===============')

  // const findByEmailSelectPassword = await User.findByEmailSelectPassword('juan151210@gmail.com')
  // console.log(findByEmailSelectPassword)
  // console.log('===============')
  // const activateEmail = await User.activateEmail('5d134198f4cc8e37a0f56145')
  // console.log(activateEmail)
  // console.log('===============')

  const usuarios = await User.findAll()
  console.log(usuarios)
  console.log('===============')
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()
