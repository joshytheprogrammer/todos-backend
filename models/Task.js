const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema(
  {
    title: {type: String, required: true, unique:false},
    desc: {type: String, required: false, unique: false},
    deadline: {type: String, required: true},
  },
  { timestamps: true }
)

module.exports = mongoose.model("Task", TaskSchema)