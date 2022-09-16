const User = require('../models/User')
const Student = require('../models/Student')

module.exports = {
  // @desc    Login/Landing Page
  // @route   GET /
  getIndex: (req,res) => {
    res.render('index.ejs')
  },

  // @desc    Redirect Dashboard
  // @route   GET /dashboard
  redirectDashboard: (req, res) => {
    try {
      res.redirect(`/dashboard/${req.user.id}`)
    } catch (error) {
      console.error(error)
    }
  },

  // @desc    Dashboard
  // @route   GET /dashboard/:id
  getDashboard: async (req, res) => {
    const accountType = req.user.accountType
    try {
      if (!req.user.registrationStatus) {
        res.redirect('/auth/acct-registration')
      } else {
        if (accountType === 'parent') {
          res.render('dashboard-parent.ejs')
        } else if (accountType === 'teacher') {
          res.render('dashboard-teacher.ejs')
        } else if (accountType === 'admin') {
          const students = await Student.find();
          res.render('dashboard-admin.ejs', { students: students })
        }
      }
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Profile
  // @route   GET /profile/:id
  getProfile: (req, res) => {
    const accountType = req.user.accountType
    try {
      if (accountType === 'parent') {
        res.render('profile-parent.ejs')
      } else if (accountType === 'teacher') {
        res.render('profile-teacher.ejs')
      } else if (accountType === 'admin') {
        res.render('profile-admin.ejs')
      }
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

}