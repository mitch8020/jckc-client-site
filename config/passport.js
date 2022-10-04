const GoogleStrategy = require('passport-google-oauth20').Strategy
const { render } = require('ejs')
const mongoose = require('mongoose')
const User = require('../models/User')

let baseUrl = process.env.NODE_ENV == 'development' ? "http://localhost:3000/auth/google/callback" : "https://jckc-client-site-demo.herokuapp.com/auth/google/callback"

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: baseUrl
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstNameGoog: profile.name.givenName,
      lastNameGoog: profile.name.familyName,
      firstNameApp: '',
      lastNameApp: '',
      dateOfBirth: '',
      phoneNumber: '',
      accountType: '',
      image: profile.photos[0].value,
      parentPermission: false,
      teacherPermission: false,
      adminPermission: false,
      registrationStatus: false,
    }
    try {
      let user = await User.findOne({ googleId: profile.id })
      if (user) {
        done(null, user)
      } else {
        user = await User.create(newUser)
        done(null, user)
      }
    } catch (error) {
      console.log(error)
    }
  }));
  passport.serializeUser( (user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}