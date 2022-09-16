const User = require('../models/User')
const Student = require('../models/Student')

module.exports = {
  // @desc    Get Individual Student Profile
  // @route   GET /student/profile/:id
  getStudent: async (req, res) => {
    const accountType = req.user.accountType
    try {
      if (accountType === 'parent') {
        const students = await Student.find({ user: req.user.id });
        res.render('students-parent.ejs', { students: students, user: req.user })
      } else if (accountType === 'teacher') {
        res.render('students-teacher.ejs')
      } else if (accountType === 'admin') {
        res.render('students-admin.ejs')
      }
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Show New Student Registration Page
  // @route   GET /student/register-new-student
  registerNewStudent: (req, res) => {
    try {
      res.render('student-registration.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  
  // @desc    Push Student Registration
  // @route   POST /student/push-student-application
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
      res.redirect(`/student/student-application-submitted`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },

  // @desc    Show Student Registration Success Page
  // @route   GET /student/student-application-submitted
  studentApplicationSubmitted: (req, res) => {
    try {
      res.render('student-registration-success.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Get Students Summary
  // @route   GET /student/students-summary
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