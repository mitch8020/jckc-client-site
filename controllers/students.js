const User = require('../models/User')
const Student = require('../models/Student')

module.exports = {
  // @desc    Students
  // @route   GET /students/:id
  getStudents: async (req, res) => {
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

  // @desc    Register New Student
  // @route   GET /students/registerNewStudent/:id
  registerNewStudent: (req, res) => {
    try {
      res.render('student-registration.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Register New Student
  // @route   POST /students/registerNewStudent/:id
  pushStudentApplication: async (req, res) => {
    try {
      await Student.create(      
      { 
        studentFirstName: req.body.studentFirstName,
        studentLastName: req.body.studentLastName,
        parentFirstName: req.user.firstNameApp,
        parentLastName: req.user.lastNameApp,
        dateOfBirth: req.body.dateOfBirth,
        user: req.user.id,
        applicationApprovalStatus: false,
        checkInStatus: false,
      })
      console.log("Student Application Submitted!");
      res.redirect(`/students/studentApplicationSubmitted/${req.params.id}`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },

  // @desc    Register New Student
  // @route   GET /students/studentApplicationSubmitted/:id
  studentApplicationSubmitted: (req, res) => {
    try {
      res.render('student-registration-success.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

}