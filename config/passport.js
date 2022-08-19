const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
  ));
  passport.serializeUser( (user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
