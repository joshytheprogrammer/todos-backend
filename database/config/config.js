require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DB_CONNECTION_DEV,
    dialect: 'postgres',
  },
  test: {
    url: process.env.DB_CONNECTION_DEV,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DB_CONNECTION_PROD,
    dialect: 'postgres',
  },
}