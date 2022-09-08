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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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