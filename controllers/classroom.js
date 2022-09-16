const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')

module.exports = {
  // @desc    Get Students Summary
  // @route   GET /student/students-summary
  getClassroomsSummary: async (req, res) => {
    try {
      const classrooms = await Classroom.find();
      res.render('classroom-summary.ejs', { classrooms: classrooms })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

}