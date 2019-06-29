'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015'
  }
  const { Client } = await db(uri, config).catch(handleFatalError)



//   const client1 = await Client.createOrUpdate({
//     user_id: '5d12f1eba0a4fe03942c9f55',
//     name: 'cliente 1',
//     lastName: 'lopez perez',
//     phones: [987564321, 987657890],
//     address: 'Jr. Sinchi Roca',
//     photography: 'wara.png',
//     document: {
//         type: 'dni',
//         number: 71632670
//     }
//   }).catch(handleFatalError)
  
//   const client2 = await Client.createOrUpdate({
//     user_id: '5d134198f4cc8e37a0f56145',
//     name: 'cliente 2',
//     lastName: 'Wareloz ',
//     phones: [987564321, 987657890],
//     address: 'Jr. Sinchi Roca',
//     photography: 'wara.png',
//     document: {
//         type: 'dni',
//         number: 71632670
//     }
//   }).catch(handleFatalError)
  
//   const client3 = await Client.createOrUpdate({
//     user_id: '5d13d8a1bd8bfb17bc07afea',
//     name: 'cliente 3',
//     lastName: 'Quispe perez',
//     phones: [987564321, 987657890],
//     address: 'Jr. Sinchi Roca',
//     photography: 'wara.png',
//     document: {
//         type: 'dni',
//         number: 71632670
//     }
//   }).catch(handleFatalError)
  
//   const client4 = await Client.createOrUpdate({
//     user_id: '5d12e5e2536758167c79438b',
//     name: 'cliente 4',
//     lastName: 'Lopez',
//     phones: [987564321, 987657890],
//     address: 'Jr. Sinchi Roca',
//     photography: 'wara.png',
//     document: {
//         type: 'dni',
//         number: 71632670
//     }
//   }).catch(handleFatalError)



    // const addMember = await Organization.addMembers('5d12e8cc205f7c10a0f0e74f',[
    //   {name: 'Jose', lastName: 'Quispe Mamani', phones: [985323123], categories: ['apicultura', 'artesania'], img: 'jose.jpg'},
    //   {name: 'Marcos', lastName: 'Delgado', phones: [982567432], categories: ['artesanía'], img:'marcos.png'}
    // ])

    // const updateMember = await Organization.updateMember('5d12e8cc205f7c10a0f0e74f',
    //   {_id: Object('5d15a5d9dbbc1f1834dda4b7'),name: 'Marcos', lastName: 'Delgado', phones: [982567432], categories: [], img:'marcosmodificadp.png'},
    // )
    // console.log(updateMember)
    // console.log('===============')

    // const findByIdListMembers = await Organization.findByIdListMembers('5d12e8cc205f7c10a0f0e750')
    // console.log(findByIdListMembers)
    // console.log('===============')
  
    // const clientFindById = await Client.findById('5d168f1e90e2c2061c92a686')
    // console.log(clientFindById)
    // console.log('===============')

    // const clientFindByUserId= await Client.findByUserId('5d12f1eba0a4fe03942c9f55')
    // console.log(clientFindByUserId)
    // console.log('===============')



    // const clients = await Client.findAll()
    // console.log(clients)
    // console.log('===============')
  
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()
