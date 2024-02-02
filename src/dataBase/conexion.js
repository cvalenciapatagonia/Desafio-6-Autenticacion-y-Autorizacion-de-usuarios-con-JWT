const { config } = require('dotenv')
const { Pool } = require('pg')
require('dotenv').config()

const credentials = {
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    allowExitOnIdle: true
}

const pool = new Pool(credentials)

module.exports = pool