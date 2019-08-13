'use strict'

const setupDatabase = require('./lib/db')
// modelos
const setupUserModel = require('./models/user')
const setupOrganizationModel = require('./models/organization')
const setupProducerModel = require('./models/producer')
const setupClientModel = require('./models/client')
const setupProductModel = require('./models/product')
const setupSaleModel = require('./models/sale')
const setupCategorieModel = require('./models/categorie')

// metodos
const setupUser = require('./lib/user')
const setupOrganization = require('./lib/organization')
const setupProducer = require('./lib/producer')
const setupClient = require('./lib/client')
const setupProduct = require('./lib/product')
const setupSale = require('./lib/sale')
const setupCategorie = require('./lib/categorie')

const defaults = require('defaults')

module.exports = async function (uri, config) {
  config = defaults(config, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  })

  const mongoose = await setupDatabase(uri, config)

  const UserModel = await setupUserModel(uri, config)
  const OrganizationModel = await setupOrganizationModel(uri, config)
  const ProducerModel = await setupProducerModel(uri, config)
  const ClientModel = await setupClientModel(uri, config)
  const ProductModel = await setupProductModel(uri, config)
  const SaleModel = await setupSaleModel(uri, config)
  const CategorieModel = await setupCategorieModel(uri, config)

  if (config.setup) {
    // falta implementar
    await mongoose.connection.dropDatabase()
  }

  const User = setupUser(UserModel)
  const Organization = setupOrganization(OrganizationModel)
  const Producer = setupProducer(ProducerModel)
  const Client = setupClient(ClientModel)
  const Product = setupProduct(ProductModel)
  const Sale = setupSale(SaleModel)
  const Categorie = setupCategorie(CategorieModel)

  return {
    User,
    Organization,
    Producer,
    Client,
    Product,
    Sale,
    Categorie
  }
}
