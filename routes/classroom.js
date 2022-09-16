const express = require('express')
const router = express.Router()
const classroomsController = require('../controllers/classroom')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/classroom/classrooms-summary', ensureAuth, classroomsController.getClassroomsSummary)

module.exports = router