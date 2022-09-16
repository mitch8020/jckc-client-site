const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/student')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/profile/:id', ensureAuth, studentsController.getStudent)
router.get('/register-new-student', ensureAuth, studentsController.registerNewStudent)
router.post('/push-student-application', ensureAuth, studentsController.pushStudentApplication)
router.get('/student-application-submitted', ensureAuth, studentsController.studentApplicationSubmitted)
router.get('/students-summary', ensureAuth, studentsController.getStudentsSummary)

module.exports = router