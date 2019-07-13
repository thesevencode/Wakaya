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
    //   id_producer : '5d12f490eb6db63fd009b4fa',
    //   name: 'Caja de bombon',
    //   description: 'Descripcio simple',
    //   categories: ['chocolatería'],
    //   records: [],
    //   price: 129.87,
    //   stock: 1000,
    //   qualifications: [],
    //   comments: [],
    //   offer: 0
    // }).catch(handleFatalError)

  
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
