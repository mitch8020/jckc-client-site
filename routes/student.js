const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/student')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/profile/:id', ensureAuth, studentsController.getStudent)

module.exports = router