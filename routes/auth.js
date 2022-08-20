const express = require('express')
const passport = require('passport')
const authController = require('../controllers/auth')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google Auth Callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard')
})

// @desc    Log Out User
// @route   /auth/logout
router.get('/logout', authController.logout)

module.exports = router