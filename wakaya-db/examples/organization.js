'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015'
  }
  const { Organization } = await db(uri, config).catch(handleFatalError)



  const organization1 = await Organization.createOrUpdate({
    name: 'Wara',
    email: 'wara@gmail.com',
    type: 'public',
    phones: [987564321, 987657890],
    address: 'Jr. Sinchi Roca',
    url: 'http://wara.pe',
    img: 'wara.png',
    members: []
  }).catch(handleFatalError)

  const organization2 = await Organization.createOrUpdate({
    name: 'Sahona',
    email: 'Sahona@gmail.com',
    type: 'private',
    phones: [987657890],
    address: 'AV. Andre Avelino Caceres',
    url: 'http://sahona.pe',
    img: 'sahona.png',
    members: []
  }).catch(handleFatalError)

  const organization3 = await Organization.createOrUpdate({
    name: 'AnacondaLodge',
    email: 'AnacondaLodge@gmail.com',
    type: 'public',
    phones: [987657890],
    address: 'Av. Madre de Dios',
    url: 'http://AnacondaLodge.com',
    img: 'AnacondaLodge.png',
    members: []
  }).catch(handleFatalError)

  const organization4 = await Organization.createOrUpdate({
    name: 'Shanshop',
    email: 'Shanshop@gmail.com',
    type: 'private',
    phones: [987564321],
    address: 'AV. Dos de Mayo',
    url: 'http://shanshop.pe',
    img: 'shanshop.png',
    members: []
  }).catch(handleFatalError)


  

  // console.log('CREATING NEWS USERS')

  // console.log(organization1)clear

  // console.log('===============')

    // const addMember = await Organization.addMembers('5d1277c5cf22193c50894b79',[
    //   {name: 'Jose', lastName: 'Quispe Mamani', phones: [985323123], categories: ['apicultura', 'artesania'], img: 'jose.jpg'},
    //   {name: 'Marcos', lastName: 'Delgado', phones: [982567432], categories: ['artesanía'], img:'marcos.png'}
    // ])

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
