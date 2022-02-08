process.stdout.write('\x1B[2J\x1B[0f')

require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

;(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB
    })
    console.log('Connected')
  } catch (error) {
    console.error('Error connecting to DB')
    throw new Error (`Can't start Express: ${error}`)

  }

})()

const app = express()

try  {
  app
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use('/api', require('./api/routes'))
  
    .listen(process.env.PORT, () => {
      console.info('💻 Reboot Server Live')
      console.info(`📡 PORT: http://localhost:${process.env.PORT}`)
    })
} catch (error) {
  throw new Error (`Can't start Express: ${error}`)
}