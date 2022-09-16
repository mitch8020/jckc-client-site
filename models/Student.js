const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  studentFirstName: {
    type: String,
    required: true
  },
  studentLastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  studentStreetAddress: {
    type: String,
    required: true
  },
  studentCity: {
    type: String,
    required: true
  },
  studentState: {
    type: String,
    required: true
  },
  studentZIP: {
    type: String,
    required: true
  },
  teacherName: {
    type: String
  },
  ageGroup: {
    type: String
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Student', StudentSchema)