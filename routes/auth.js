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

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, 
      process.env.JWT_SEC,
      {expiresIn: "3d"}
    )

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken})
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router