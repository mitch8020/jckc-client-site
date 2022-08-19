const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, homeController.getIndex)

module.exports = router