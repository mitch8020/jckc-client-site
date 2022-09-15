const User = require('../models/User')
const Student = require('../models/Student')

module.exports = {
  // @desc    Students
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


}