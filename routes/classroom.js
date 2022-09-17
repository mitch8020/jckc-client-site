const express = require('express')
const router = express.Router()
const classroomsController = require('../controllers/classroom')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/classrooms-summary', ensureAuth, classroomsController.getClassroomsSummary)
router.get('/classrooms-add-new', ensureAuth, classroomsController.getClassroomsAddNew)
router.post('/push-classrooms-add-new', ensureAuth, classroomsController.pushClassroomsAddNew)
router.get('/details/:id', ensureAuth, classroomsController.getClassroomsDetails)
router.get('/edit/:id', ensureAuth, classroomsController.getClassroomsDetailsEdit)
router.put('/push-classroom-details-edit/:id', ensureAuth, classroomsController.pushClassroomsDetailsEdit)

module.exports = router