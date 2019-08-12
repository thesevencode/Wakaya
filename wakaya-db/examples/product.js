'use strict'
'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015'
  }

  const { Product } = await db(uri, config).catch(handleFatalError)

    // const product1 = await Product.createOrUpdate({
    //   id_producer : '5d51795ed9c82c15c466f18d',
    //   name: 'Botella de miel',
    //   description: 'Miel de abeja embotellada',
    //   categories: ['apicultura'],
    //   records: [],
    //   price: 20.50,
    //   stock: 150,
    //   qualifications: [],
    //   comments: [],
    //   offer: 0
    // }).catch(handleFatalError)

    // const product2 = await Product.createOrUpdate({
    //   id_producer : '5d51795ed9c82c15c466f18e',
    //   name: 'Caja de bombon',
    //   description: 'Chocolates hechos de cacao',
    //   categories: ['chocolate'],
    //   records: [],
    //   price: 50.00,
    //   stock: 50,
    //   qualifications: [],
    //   comments: [],
    //   offer: 0
    // }).catch(handleFatalError)

    // const product3 = await Product.createOrUpdate({
    //   id_producer : '5d51795ed9c82c15c466f18d',
    //   name: 'Copoazu licor',
    //   description: 'Bebida elaborada por la fruta copoazu',
    //   categories: ['licor'],
    //   records: [],
    //   price: 10.87,
    //   stock: 300,
    //   qualifications: [],
    //   comments: [],
    //   offer: 0
    // }).catch(handleFatalError)

    // const updateStock = await Product.updateStock('5d517c642d3346572838fda0', 100)
    // console.log(updateStock)
    // console.log('===============')

    // const productsByCategories = await Product.findByCategories(['manualidades'])
    // console.log(productsByCategories)
    // console.log('===============')

    // const productById = await Product.findById('5d29896b10ee082a38bdaa59')
    // console.log(productById)
    // console.log('===============')

    // const productByProducerId = await Product.findByProducerId('5d12f490eb6db63fd009b4fa')
    // console.log(productByProducerId)
    // console.log('===============')


//   const products = await Product.findAll()
//   console.log(products)
//   console.log('===============')
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()
