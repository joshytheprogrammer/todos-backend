const router = require('express').Router()

router.post("/create", async (req, res) => {
  console.log(req.body.task)

  let d = new Date(req.body.task.date).valueOf()

  console.log(d)

  console.log(new Date(d).toString())

  res.status(200).send("request succeeded")
})

module.exports = router