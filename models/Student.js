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
  parentFirstName: {
    type: String
  },
  parentLastName: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  teacher: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  applicationApprovalStatus: {
    type: Boolean,
  },
  checkInStatus: {
    type: Boolean,
  }
})

module.exports = mongoose.model('Student', StudentSchema)