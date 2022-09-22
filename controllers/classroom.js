const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')

module.exports = {
  // @desc    Get Classrooms Summary
  // @route   GET /classroom/classrooms-summary
  getClassroomsSummary: async (req, res) => {
    try {
      const students = await Student.find()
      const classrooms = await Classroom.find();
      res.render('classrooms-summary.ejs', { classrooms: classrooms, students: students })
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

  // @desc    Show Edit Classroom Details Page
  // @route   GET /classroom/edit/:id
  getClassroomsDetailsEdit: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
      res.render('classrooms-details-edit.ejs', { classroom: classroom })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Push Edit Classroom Details
  // @route   PUT /classroom/push-classroom-details-edit/:id
  pushClassroomsDetailsEdit: async (req, res) => {
    try {
      await Classroom.findOneAndUpdate(
        { _id: req.params.id },
        { 
          classroomName: req.body.classroomName,
          ageGroup: req.body.ageGroup,
          teacherName: req.body.teacherName,
        }
      );      
      console.log("Classroom Info Updated!");
      res.redirect(`/classroom/details/${req.params.id}`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },

  // @desc    Get Add Students to Classroom Page
  // @route   GET /classroom/add-students/:id
  getClassroomsStudentListEdit: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
      const students = await Student.find();
      res.render('classrooms-student-list-edit.ejs', { classroom: classroom, students: students })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Push Add Students to Student List
  // @route   PUT /classroom/push-student-list-add/:id
  pushClassroomsStudentListAdd: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
      Object.keys(req.body).forEach(async e => {
        await Student.findOneAndUpdate(
          { _id: e },
          { 
            ageGroup: classroom.ageGroup,
            classroom: classroom.id,
          }
        );
      })
      console.log('Students added to classroom!')
      res.redirect(`/classroom/details/${req.params.id}`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },

  // @desc    Push Remove Students to Student List
  // @route   PUT /classroom/push-student-list-remove/:id
  pushClassroomsStudentListRemove: async (req, res) => {
    try {
      Object.keys(req.body).forEach(async e => {
        await Student.findOneAndUpdate(
          { _id: e },
          { 
            classroom: null,
          }
        );
      })
      console.log('Students removed from classroom!')
      res.redirect(`/classroom/details/${req.params.id}`)
    } catch (error) {
      console.log(error)
      // res.render('error/500')
    }
  },
}