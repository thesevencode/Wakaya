'use strict'

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const morgan = require('morgan')

const routes = require('./app/routes')

const { error } = require('../handlers')


const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))



routes(app)

if (!module.parent) { // verificamos que el archivo ha sido requerido
    process.on('uncaughtException', error().handleFatalError)
    process.on('unhandledRejection', error().handleFatalError)

    server.listen(port, () => {
        console.log(`${chalk.green('[tragavo-api]')} server listened on port ${port}`)
    })
}
module.exports = server