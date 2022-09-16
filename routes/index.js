const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/', ensureGuest, homeController.getIndex)
router.get('/dashboard', ensureAuth, homeController.redirectDashboard)
router.get('/dashboard/:id', ensureAuth, homeController.getDashboard)
router.get('/profile/:id', ensureAuth, homeController.getProfile)
router.get('/register-new-student', ensureAuth, homeController.registerNewStudent)
router.post('/push-student-application', ensureAuth, homeController.pushStudentApplication)
router.get('/student-application-submitted', ensureAuth, homeController.studentApplicationSubmitted)
router.get('/students-summary', ensureAuth, homeController.getStudentsSummary)

module.exports = router