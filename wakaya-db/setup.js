'use strict'

const inquirer = require('inquirer')
const minimist = require('minimist')
const chalk = require('chalk')
const db = require('./index')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()

async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'Esta acción destruirá la base de datos, ¿ desea continuar?'
      }
    ])

    if (!answer.setup) {
      return console.log('Accion cancelada')
    }
  }

  const uri = 'mongodb+srv://@wakayadb-dk6m4.mongodb.net/test?retryWrites=true&w=majority'
  const config = {
    user: process.env.DB_USER || 'Denis',
    pass: process.env.DB_PASS || '@Denis15121015',
    setup: true
  }

  await db(uri, config).catch(handleFatalError)

  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)// terminar proceso con error
}

setup()
