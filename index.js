const express = require('express')
const dotenv = require("dotenv")
const { Sequelize } = require('sequelize')

dotenv.config()
const app = express()

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  username: 'postgres',
  password: '',
  database: ''
})


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running @ http://localhost:"+process.env.PORT)
})
 