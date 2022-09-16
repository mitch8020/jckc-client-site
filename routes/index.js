const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/', ensureGuest, homeController.getIndex)
router.get('/dashboard', ensureAuth, homeController.redirectDashboard)
router.get('/dashboard/:id', ensureAuth, homeController.getDashboard)
router.get('/profile/:id', ensureAuth, homeController.getProfile)

module.exports = router