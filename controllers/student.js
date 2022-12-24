const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')
const Guardian = require('../models/Guardian')


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
        res.render('students-summary-parent.ejs', { 
          students: students, 
          user: req.user,
        })
      } else if (accountType === 'teacher') {
        res.render('students-summary-teacher.ejs')
      } else if (accountType === 'admin') {
        const classrooms = await Classroom.find();
        const students = await Student.find();
        res.render('students-summary-admin.ejs', { 
          classrooms: classrooms, 
          students: students,
        })
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
      const guardiansAll = await Guardian.find().sort({ guardianFirstName: 1 }).lean();
      const guardiansStudent = guardiansAll.filter(guardian => guardian.students.some(child => child.student.toString() === student._id.toString()));
      res.render('students-details.ejs', { 
        student: student,
        guardiansAll: guardiansAll,
        guardiansStudent: guardiansStudent, 
      })
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

  // @desc    Get Individual Student Delete Page
  // @route   GET /student/delete/:id
  getStudentDelete: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.render('students-delete.ejs', { student: student })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Delete Individual Student Profile
  // @route   DELETE /student/push-student-details-edit/:id
  deleteStudentConfirm: async (req, res) => {
    try {
      await Student.deleteOne(
        { _id: req.params.id }
      );
      console.log("Student Deleted!");
      res.redirect(`/student/students-summary`)
    } catch (error) {
      console.log(error)
    }
  },

}