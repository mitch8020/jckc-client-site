const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstNameGoog: {
    type: String,
    required: true
  },
  lastNameGoog: {
    type: String,
    required: true
  },
  firstNameApp: {
    type: String
  },
  lastNameApp: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  emailAddress: {
    type: String
  },
  accountType: {
    type: String
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  parentPermission: {
    type: Boolean,
  },
  teacherPermission: {
    type: Boolean,
  },
  adminPermission: {
    type: Boolean,
  },
  registrationStatus: {
    type: Boolean,
  },
})

module.exports = mongoose.model('User', UserSchema)