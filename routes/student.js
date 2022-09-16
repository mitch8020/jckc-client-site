const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/student')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/profile/:id', ensureAuth, studentsController.getStudent)
router.get('/registration-student', ensureAuth, studentsController.registerNewStudent)
router.post('/push-registration-student', ensureAuth, studentsController.pushStudentApplication)
router.get('/registration-student-success', ensureAuth, studentsController.studentApplicationSubmitted)
router.get('/students-summary', ensureAuth, studentsController.getStudentsSummary)

module.exports = router