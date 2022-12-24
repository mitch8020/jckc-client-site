const mongoose = require('mongoose')

const GuardianSchema = new mongoose.Schema({
  guardianFirstName: {
    type: String,
    required: true
  },
  guardianLastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  guardianStreetAddress: {
    type: String,
    required: true
  },
  guardianCity: {
    type: String,
    required: true
  },
  guardianState: {
    type: String,
    required: true
  },
  guardianZIP: {
    type: String,
    required: true
  },
  students: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Guardian', GuardianSchema)