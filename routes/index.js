const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

// const Entry = require('../models/Entry')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, homeController.getIndex)

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    res.render('dashboard.ejs')
  } catch (error) {
    console.error(error)
    // res.render('error/500')
  }
})

module.exports = router