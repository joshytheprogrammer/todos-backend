const express = require('express')
const dotenv = require("dotenv")
const { Sequelize } = require('sequelize')

dotenv.config()
const app = express()

const sequelize = new Sequelize(process.env.DB_CONNECTION_URL)

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running @ http://localhost:"+process.env.PORT)
})
 