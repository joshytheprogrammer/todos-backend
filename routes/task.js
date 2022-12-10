const router = require('express').Router()
const Task = require('../models/Task')

router.get("/", async (req, res) => {
  console.log(req.query)
})

router.post("/create", async (req, res) => {
  let deadline = new Date(req.body.task.date).valueOf()

  const newTask = new Task({
    user_id: req.body.user_id,
    title: req.body.task.title,
    desc: req.body.task.desc,
    deadline: deadline
  })

  try {
    await newTask.save()
    res.status(200).send("Task created successfully")
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router