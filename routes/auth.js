const router = require('express').Router()
const User = require("../models/User")
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")

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

// * Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})

    if(!user) {
      res.status(401).json("Wrong credentials!")
      return
    }

    const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC)
    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8)

    if( OriginalPassword !== req.body.password ) {
      res.status(401).json("Wrong Credentials")
      return
    }

    const token = jwt.sign({
      id: user._id,
    }, 
      process.env.JWT_SEC,
      {expiresIn: "3d"}
    )

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
  
    res.send({
      message: 'Authentication Success'
    })
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router