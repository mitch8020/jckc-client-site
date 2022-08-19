const express = require('express')
const passport = require('passport')
const router = express.Router()
const authController = require('../controllers/auth')

// @desc    Auth with Facebook
// @route   GET /auth/facebook
router.get('/facebook', authController.facebookLogIn)

// @desc    Google Auth Callback
// @route   GET /auth/google/callback
router.get('/facebook/callback', authController.facebookCallBack)

// @desc    Log Out User
// @route   /auth/logout
router.get('/logout', authController.logout)

module.exports = router