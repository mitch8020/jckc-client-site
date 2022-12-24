const express = require('express')
const router = express.Router()
const guardiansController = require('../controllers/guardian')
const { ensureGuest, ensureAuth } = require('../middleware/auth')

router.get('/registration-guardian/:student/:guardian', ensureAuth, guardiansController.registerNewGuardian)
router.post('/push-register-new-guardian/:student/:guardian', ensureAuth, guardiansController.pushRegisterNewGuardian)
router.get('/details/:id', ensureAuth, guardiansController.getGuardianDetails)
router.get('/edit/:id', ensureAuth, guardiansController.getEditGuardianDetails)
router.put('/push-guardian-details-edit/:id', ensureAuth, guardiansController.pushGuardianDetailsEdit)

module.exports = router