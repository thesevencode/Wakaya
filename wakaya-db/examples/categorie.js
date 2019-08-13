'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015'
  }
  const { Categorie } = await db(uri, config).catch(handleFatalError)

    const categorie1 = await Categorie.createOrUpdate({
      description: 'Chocolate'
    }).catch(handleFatalError)

    const categorie2 = await Categorie.createOrUpdate({
        description: 'licor'
    }).catch(handleFatalError)

    

  const categories = await Categorie.findAll()
  console.log(categories)
  console.log('===============')
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()
