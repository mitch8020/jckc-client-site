// const Entry = require('../models/Entry')

module.exports = {
  // @desc    Login/Landing Page
  // @route   GET /
  getIndex: (req,res) => {
    res.render('index.ejs')
  },

  // @desc    Dashboard
  // @route   GET /dashboard
  getDashboard: async (req, res) => {
    try {
      if (!req.user.registrationStatus) {
        res.redirect('/auth/acctRegistration')
      } else {
        res.render('dashboard.ejs')
      }
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Dashboard (Parent)
  // @route   GET /dashboardParent/:id
  getDashboardParent: async (req, res) => {
    res.render('dashboard-parent.ejs')
  }
}

