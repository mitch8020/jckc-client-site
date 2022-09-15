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
        res.redirect('/auth/acctRegistration')
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

  // @desc    Register New Student
  // @route   GET /registerNewStudent
  registerNewStudent: (req, res) => {
    try {
      res.render('student-registration.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  
  // @desc    Push Student Registration
  // @route   POST /pushStudentApplication
  pushStudentApplication: async (req, res) => {
    try {
      await Student.create(      
      { 
        studentFirstName: req.body.studentFirstName,
        studentLastName: req.body.studentLastName,
        dateOfBirth: req.body.dateOfBirth,
        studentStreetAddress: req.body.studentStreetAddress,
        studentCity: req.body.studentCity,
        studentState: req.body.studentState,
        studentZIP: req.body.studentZIP,
      })
      console.log("Student Application Submitted!");
      res.redirect(`/studentApplicationSubmitted`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },

  // @desc    Show Student Registration Success Page
  // @route   GET /studentApplicationSubmitted
  studentApplicationSubmitted: (req, res) => {
    try {
      res.render('student-registration-success.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Get Students Summary
  // @route   GET /studentsSummary
  getStudentsSummary: async (req, res) => {
    const accountType = req.user.accountType
    try {
      if (accountType === 'parent') {
        const students = await Student.find({ user: req.user.id });
        res.render('students-parent.ejs', { students: students, user: req.user })
      } else if (accountType === 'teacher') {
        res.render('students-teacher.ejs')
      } else if (accountType === 'admin') {
        const students = await Student.find();
        res.render('students-admin.ejs', { students: students })
      }
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },
}