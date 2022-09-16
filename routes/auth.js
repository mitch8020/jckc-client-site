const express = require('express')
const passport = require('passport')
const authController = require('../controllers/auth')
const router = express.Router()
const { ensureGuest, ensureAuth } = require('../middleware/auth')

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google Auth Callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/error/no-account' }), async (req, res) => {
  if (!req.user.registrationStatus) {
    res.redirect('/auth/acct-registration')
  } else {
    res.redirect('/dashboard')
  }
})

router.get('/logout', authController.logout)
router.get('/error/no-account', authController.noAccount)
router.get('/acct-registration', ensureAuth, authController.acctRegistration)
router.put('/push-registration/:id', ensureAuth, authController.pushRegistration)
router.get('/registration-success/:id', ensureAuth, authController.registrationSuccess)

module.exports = router