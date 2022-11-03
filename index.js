const express = require('express')
const dotenv = require("dotenv")

dotenv.config()
const app = express()

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running @ http://localhost:"+process.env.PORT)
})
 