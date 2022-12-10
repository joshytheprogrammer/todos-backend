const router = require('express').Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 10

router.post("/register", async (req, res) => {

  const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds)

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
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

    passwordMatch = await bcrypt.compareSync(req.body.password, user.password)

    if( !passwordMatch ) {
      return res.status(401).send({
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      {id: user._id, },
      process.env.JWT_SEC,
      {
        expiresIn: 24 * 60 * 60 * 3
      }
    )
  
    res.send({
      token: token,
      message: 'Authentication Success'
    })
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization

    const claims = jwt.verify(token, process.env.JWT_SEC) 

    if(!claims) {
      return res.status(401).send({
        message: 'Invalid credentials'
      })
    }

    const user = await User.findOne({_id: claims.id})

    let {email, password, createdAt, updatedAt, ...data} = await user.toJSON()

    data = {
      user: data
    }

    res.send(data)

  }catch(e) {
    return res.status(401).send({
      message: 'Caught error: ' + e
    })
  }
  
})

router.post('/logout', (req, res) => {
   
})

module.exports = router