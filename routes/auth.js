const router = require('express').Router()
const User = require("../models/User")
const CryptoJs = require("crypto-js")

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
  })

  try {
    await newUser.save()
    res.status(200).send("User created successfully")
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router