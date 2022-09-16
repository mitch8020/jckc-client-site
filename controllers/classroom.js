const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')

module.exports = {
  // @desc    Get Classrooms Summary
  // @route   GET /classroom/classrooms-summary
  getClassroomsSummary: async (req, res) => {
    try {
      const classrooms = await Classroom.find();
      res.render('classrooms-summary.ejs', { classrooms: classrooms })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Show Add New Classroom Page
  // @route   GET /classroom/classrooms-add-new
  getClassroomsAddNew: (req, res) => {
    try {
      res.render('classrooms-add-new.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Push Add New Classroom
  // @route   POST /classroom/push-classrooms-add-new
  pushClassroomsAddNew: async (req, res) => {
    try {
      await Classroom.create(      
      { 
        classroomName: req.body.classroomName,
        ageGroup: req.body.ageGroup,
        teacherName: req.body.teacherName,
      })
      console.log("New Classroom Created!");
      res.redirect(`/classroom/classrooms-summary`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },

  // @desc    Show Add New Classroom Page
  // @route   GET /classroom/classrooms-add-new
  getClassroomsDetails: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
      const students = await Student.find({ classroom: req.params.id});
      res.render('classrooms-details.ejs', { classroom: classroom, students: students })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

}