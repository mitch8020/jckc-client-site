const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')

module.exports = {
  // @desc    Get Reports Summary
  // @route   GET /report/reports-summary
  getReportsSummary: (req, res) => {
    try {
      res.render('reports-summary-admin.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

}