const router = require('express').Router()
const Task = require('../models/Task')

router.get("/", async (req, res) => {
  let user_id = req.query.user_id
  
  const tasks = await Task.
  find({user_id: user_id}).
  where('completed').equals(false)

  res.status(200).send(tasks)
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

router.post("/complete", async (req, res) => {
  try {
    await Task.updateOne({_id: req.body.task_id}, {completed: true})
    res.send("Congratulations on completing your task")
  }catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router