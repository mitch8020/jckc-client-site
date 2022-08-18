const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/logins', authController.postLogin)
router.get('/auth/google', authController.googleLogin)
router.get('/auth/google/callback', authController.googleCallback)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signups', authController.postSignup)

module.exports = router