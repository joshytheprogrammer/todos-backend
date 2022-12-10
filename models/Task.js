const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema(
  {
    user_id: {type: String, required: true, unique: false},
    title: {type: String, required: true, unique:false},
    desc: {type: String, required: false, unique: false},
    deadline: {type: String, required: true},
  },
  { timestamps: false }
)

module.exports = mongoose.model("Task", TaskSchema)