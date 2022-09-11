const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  firstNameApp: {
    type: String
  },
  lastNameApp: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  registrationStatus: {
    type: Boolean,
  },
})

module.exports = mongoose.model('Student', StudentSchema)