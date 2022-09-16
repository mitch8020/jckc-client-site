const express = require('express')
const router = express.Router()
const classroomsController = require('../controllers/classroom')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/classrooms-summary', ensureAuth, classroomsController.getClassroomsSummary)
router.get('/classrooms-add-new', ensureAuth, classroomsController.getClassroomsAddNew)
router.post('/push-classrooms-add-new', ensureAuth, classroomsController.pushClassroomsAddNew)
router.get('/details/:id', ensureAuth, classroomsController.getClassroomsDetails)

module.exports = router