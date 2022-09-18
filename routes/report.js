const express = require('express')
const router = express.Router()
const reportsController = require('../controllers/report')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/reports-summary', ensureAuth, reportsController.getReportsSummary)

module.exports = router