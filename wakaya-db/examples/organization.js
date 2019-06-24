'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb://localhost:27017/wakaya'
  const config = {
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS || ''
  }
  const { Organization } = await db(uri, config).catch(handleFatalError)



  // const organization1 = await User.createOrUpdate({
  //   email: 'joseMariaArguedas@gmail.com',
  //   password: 'test123456',
  //   type: 'client' // client  or salesman
  // }).catch(handleFatalError)


  

//   console.log('CREATING NEWS USERS')

//   console.log(User2)
//   console.log('===============')

    const organizaciones = await Organization.findAll()
    console.log(organizaciones)
    console.log('===============')
  
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()
