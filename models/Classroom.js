const mongoose = require('mongoose')

const ClassroomSchema = new mongoose.Schema({
  classroomName: {
    type: String,
    required: true
  },
  ageGroup: {
    type: String,
    required: true
  },
  teacherName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Classroom', ClassroomSchema)