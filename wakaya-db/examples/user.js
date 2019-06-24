'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb://localhost:27017/wakaya'
  const config = {
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS || ''
  }
  const { User } = await db(uri, config).catch(handleFatalError)



  // const User1 = await User.createOrUpdate({
  //   email: 'joseMariaArguedas@gmail.com',
  //   password: 'test123456',
  //   type: 'client' // client  or salesman
  // }).catch(handleFatalError)

//   const User2 = await User.createOrUpdate({
//     email: 'empresa@gmail.com',
//     password: 'test123456',
//     kind: 'salesman', // client  or salesman
//     company: {
//         name: 'Empresa',
//         uuid: '12345678'
//     }
//   }).catch(handleFatalError)

  

//   console.log('CREATING NEWS USERS')

//   console.log(User2)
//   console.log('===============')

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
