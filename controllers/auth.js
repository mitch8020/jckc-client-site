const passport = require('passport')
const User = require('../models/User')

// @desc    Auth with Facebook
// @route   GET /auth/facebook
exports.facebookLogIn = () => {
  passport.authenticate('facebook');
}

// @desc    Facebook Auth Callback
// @route   GET /auth/facebook/callback
exports.facebookCallBack = () => {
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect to dashboard.
    res.redirect('/dashboard');
  }
}

// @desc    Log Out User
// @route   /auth/logout
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/')
  })
}