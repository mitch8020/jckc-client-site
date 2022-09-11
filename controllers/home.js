const User = require('../models/User')

module.exports = {
  // @desc    Login/Landing Page
  // @route   GET /
  getIndex: (req,res) => {
    res.render('index.ejs')
  },

  // @desc    Dashboard
  // @route   GET /dashboard
  getDashboard: (req, res) => {
    const accountType = req.user.accountType
    try {
      if (!req.user.registrationStatus) {
        res.redirect('/auth/acctRegistration')
      } else {
        if (accountType === 'parent') {
          res.render('dashboard-parent.ejs')
        } else if (accountType === 'teacher') {
          res.render('dashboard-teacher.ejs')
        } else if (accountType === 'admin') {
          res.render('dashboard-admin.ejs')
        }
      }
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

}

