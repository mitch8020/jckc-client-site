const User = require('../models/User')
const Student = require('../models/Student')

module.exports = {
  // @desc    Show New Student Registration Page
  // @route   GET /student/register-new-student
  registerNewStudent: (req, res) => {
    try {
      res.render('registration-student.ejs')
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
      res.redirect(`/student/registration-student-success`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },

  // @desc    Show Student Registration Success Page
  // @route   GET /student/student-application-submitted
  studentApplicationSubmitted: (req, res) => {
    try {
      res.render('registration-student-success.ejs')
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
        res.render('students-summary-parent.ejs', { students: students, user: req.user })
      } else if (accountType === 'teacher') {
        res.render('students-summary-teacher.ejs')
      } else if (accountType === 'admin') {
        const students = await Student.find();
        res.render('students-summary-admin.ejs', { students: students })
      }
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Get Individual Student Profile
  // @route   GET /student/details/:id
  getStudentDetails: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.render('students-details.ejs', { student: student })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Get Individual Student Profile Edit Page
  // @route   GET /student/edit/:id
  getStudentDetailsEdit: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.render('students-details-edit.ejs', { student: student })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Push Update for Individual Student Profile
  // @route   PUT /student/push-student-details-edit/:id
  pushStudentDetailsEdit: async (req, res) => {
    try {
      await Student.findOneAndUpdate(
        { _id: req.params.id },
        { 
          studentFirstName: req.body.studentFirstName,
          studentLastName: req.body.studentLastName,
          dateOfBirth: req.body.dateOfBirth,
          studentStreetAddress: req.body.studentStreetAddress,
          studentCity: req.body.studentCity,
          studentState: req.body.studentState,
          studentZIP: req.body.studentZIP,
        }
      );
      console.log("Student Info Updated!");
      res.redirect(`/student/details/${req.params.id}`)
    } catch (error) {
      console.log(error)
    }
  },

}