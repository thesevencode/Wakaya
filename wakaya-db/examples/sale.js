'use strict'
'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015'
  }

  const { Sale } = await db(uri, config).catch(handleFatalError)

//     const sale1 = await Sale.createOrUpdate({
//         client: {
//             _id: '5d517b40a88bad5290990e35',
//             name: 'Juan Manuel',
//             lastName: 'Delgado Marcos'
//           },
//           product: {
//             _id: '5d517c642d3346572838fda0',
//             id_producer: '5d51795ed9c82c15c466f18d',
//             name: 'Botella de miel',
//             description: 'Miel de abeja embotellada',
//             quantity: 10,
//             price: 20.5
//           },
//           destination: 'Madre de Dios',
//           total: 205,
//           payment: 'cash',
//           date: Date.now()
//     }).catch(handleFatalError)

//     const sale2 = await Sale.createOrUpdate({
//       client: {
//           _id: '5d517b40a88bad5290990e35',
//           name: 'Juan Manuel',
//           lastName: 'Delgado Marcos'
//         },
//         product: {
//           _id: '5d517c642d3346572838fda1',
//           id_producer: '5d51795ed9c82c15c466f18e',
//           name: 'Caja de bombon',
//           description: 'Chocolates hechos de cacao',
//           quantity: 15,
//           price: 50
//         },
//         destination: 'Madre de Dios',
//         total: 750,
//         payment: 'cash',
//         date: Date.now()
//   }).catch(handleFatalError)

//   const sale3 = await Sale.createOrUpdate({
//     client: {
//         _id: '5d517b40a88bad5290990e36',
//         name: 'Ciro',
//         lastName: 'Yupanqui Pumachapi'
//       },
//       product: {
//         _id: '5d517c652d3346572838fda2',
//         id_producer: '5d51795ed9c82c15c466f18d',
//         name: 'Copoazu licor',
//         description: 'Bebida elaborada por la fruta copoazu',
//         quantity: 5,
//         price: 10.87
//       },
//       destination: 'Cusco',
//       total: 54.35,
//       payment: 'cash',
//       date: Date.now()
// }).catch(handleFatalError)

    
    // const findByClientId = await Sale.findByClientId('5d517b40a88bad5290990e36')
    // console.log(findByClientId)
    // console.log('===============')

    // const findByProducerId = await Sale.findByProducerId('5d51795ed9c82c15c466f18d')
    // console.log(findByProducerId)
    // console.log('===============')

    // const findByProductId = await Sale.findByProductId('5d517c652d3346572838fda2')
    // console.log(findByProductId)
    // console.log('===============')

    // const findByDestination = await Sale.findByDestination('Cusco')
    // console.log(findByDestination)
    // console.log('===============')

    const findByPayment = await Sale.findByPayment('cash')
    console.log(findByPayment)
    console.log('===============')

    
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()
