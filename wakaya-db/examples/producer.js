'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015'
  }

  const { Producer, Organization } = await db(uri, config).catch(handleFatalError)



//   const producer1 = await Producer.createOrUpdate({
//     _id : '5d12f490eb6db63fd009b4fa',
//     user_id: '5d12e78c24328748c82f267f',
//     name: 'Lourdes',
//     lastName: 'Medina Quispe',
//     phones: [987657890],
//     categories: ['chocolate'],
//     url: '',
//     img: 'lourdes.png',
//   }).catch(handleFatalError)

  
    // const addCategorie = await Producer.addCategorie('5d12f490eb6db63fd009b4fa', 'chocolate')
    // console.log(addCategorie)
    // console.log('===============')


    // const producersByCategories = await Producer.findByCategories(['apicultura'])
    // console.log(producersByCategories)
    // console.log('===============')

    // const producers = await Producer.findAll()
    // console.log(producers)
    // console.log('===============')


    const producer = await Producer.findById('5d12f490eb6db63fd009b4fa')
    console.log(producer)
    console.log('===============')

    const addMember =  await Organization.addMembers('5d12e8cc205f7c10a0f0e750',[producer])


    console.log(addMember)
    console.log('===============')


}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()
