const express = require('express')
const router = express.Router()
const reportsController = require('../controllers/report')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/reports-summary', ensureAuth, reportsController.getReportsSummary)
router.get('/sign-in-sheets', ensureAuth, reportsController.createSignInSheets)
router.get('/roll-call-sheets', ensureAuth, reportsController.createRollCallSheets)

module.exports = router