const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/', ensureGuest, homeController.getIndex)
router.get('/dashboard', ensureAuth, homeController.getDashboard)
router.get('/dashboardParent/:id', ensureAuth, homeController.getDashboardParent)

module.exports = router