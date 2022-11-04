const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Successful"))
.catch((err) => {
  console.log(err)
})

app.use(express.json())

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running @ http://localhost:"+process.env.PORT)
})
 