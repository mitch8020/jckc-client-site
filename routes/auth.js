const express = require('express')
const passport = require('passport')
const authController = require('../controllers/auth')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google Auth Callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/error/noAccount' }), async (req, res) => {
  if (!req.user.registrationStatus) {
    res.redirect('/auth/acctRegistration')
  } else {
    res.redirect('/dashboard')
  }
})

router.get('/logout', authController.logout)
router.get('/error/noAccount', authController.noAccount)
router.get('/acctRegistration', authController.acctRegistration)

module.exports = router