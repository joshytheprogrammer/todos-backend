const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors');
// const cookieParser = require('cookier-parser')
const authRoute = require("./routes/auth")

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Successful"))
.catch((err) => {
  console.log(err)
})

app.use(express.json())

// app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

app.use("/api/auth", authRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running @ http://localhost:"+process.env.PORT)
})
 