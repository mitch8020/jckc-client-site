const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')
const Guardian = require('../models/Guardian')

module.exports = {
  // @desc    Show New Guardian Registration Page
  // @route   GET /guardian/register-new-guardian/:student/:guardian
  registerNewGuardian: async (req, res) => {
    try {
      const student = await Student.findById(req.params.student)
      const guardianSelected = req.params.guardian === 'new-guardian' ? 'new-guardian' : await Guardian.findById(req.params.guardian)
      const guardianID = guardianSelected._id || 'new-guardian'
      const guardiansAll = await Guardian.find().sort({ guardianFirstName: 1 }).lean()
      const guardiansStudent = guardiansAll.filter(guardian => guardian.students.some(child => child.student.toString() === student._id.toString()))
      const guardiansFiltered = guardiansAll.filter(guardian => !guardiansStudent.map(e => e._id.toString()).includes(guardian._id.toString()) && guardianID.toString() !== guardian._id.toString())
      res.render('registration-guardian.ejs', {
        student: student,
        guardianID: guardianID,
        guardianSelected: guardianSelected,
        guardiansAll: guardiansAll,
        guardiansStudent: guardiansStudent,
        guardiansFiltered: guardiansFiltered,
      })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Push New Guardian Registration for Student
  // @route   POST /guardian/push-register-new-guardian/:student/:guardian
  pushRegisterNewGuardian: async (req, res) => {
    try {
      const student = await Student.findById(req.params.student)
      const guardianSelected = req.params.guardian === 'new-guardian' ? 'new-guardian' : await Guardian.findById(req.params.guardian)
      const guardiansAll = await Guardian.find().sort({ guardianFirstName: 1 }).lean()
      const studentInfo = {
        student: student._id,
        relationshipToStudent: req.body.relationshipToStudent,
        authorizedToPickUp: true,
      }
      if (guardianSelected === 'new-guardian') {
        await Guardian.create(      
        { 
          guardianFirstName: req.body.guardianFirstName,
          guardianLastName: req.body.guardianLastName,
          guardianStreetAddress: req.body.guardianStreetAddress,
          guardianCity: req.body.guardianCity,
          guardianState: req.body.guardianState,
          guardianZIP: req.body.guardianZIP,
          phoneNumber: req.body.phoneNumber,
          students: [studentInfo],
        })
        console.log("Guardian created!");
      } else {
        await Guardian.findOneAndUpdate(
          { _id: guardianSelected }, 
          {
            students: [...guardianSelected.students, studentInfo],
          }
        )
        console.log("Guardian updated!")
      }
      res.redirect(`/student/details/${student._id}`)
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Show Guardian Details
  // @route   GET /guardian/details/:id
  getGuardianDetails: async (req, res) => {
    try {
      const guardian = await Guardian.findById(req.params.id)
      let students = []
      for (i = 0; i < guardian.students.length; i++) {
        const child = await Student.findById(guardian.students[i].student)
        students.push(child)
      }
      res.render('guardian-details.ejs', {
        guardian: guardian,
        students: students,
      })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Show Edit Guardian Details Page
  // @route   GET /guardian/edit/:id
  getEditGuardianDetails: async (req, res) => {
    try {
      const guardian = await Guardian.findById(req.params.id)
      res.render('guardian-details-edit.ejs', {
        guardian: guardian,
      })
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Push Update for Individual Guardian Profile
  // @route   PUT /guardian/push-guardian-details-edit/:id
  pushGuardianDetailsEdit: async (req, res) => {
    try {
      await Guardian.findOneAndUpdate(
        { _id: req.params.id },
        { 
          guardianFirstName: req.body.guardianFirstName,
          guardianLastName: req.body.guardianLastName,
          guardianStreetAddress: req.body.guardianStreetAddress,
          guardianCity: req.body.guardianCity,
          guardianState: req.body.guardianState,
          guardianZIP: req.body.guardianZIP,
          phoneNumber: req.body.phoneNumber,
        }
      );
      console.log("Guardian Info Updated!");
      res.redirect(`/guardian/details/${req.params.id}`)
    } catch (error) {
      console.log(error)
    }
  },
}