const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/students')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/:id', ensureAuth, studentsController.getStudents)
router.get('/registerNewStudent/:id', ensureAuth, studentsController.registerNewStudent)
router.post('/pushStudentApplication/:id', ensureAuth, studentsController.pushStudentApplication)
router.get('/studentApplicationSubmitted/:id', ensureAuth, studentsController.studentApplicationSubmitted)

module.exports = router