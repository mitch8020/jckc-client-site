const passport = require('passport')

const User = require('../models/User')

// @desc    Log Out User
// @route   GET /auth/logout
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/')
  })
}

// @desc    Redirect No Account User
// @route   GET /auth/error/noAccount
exports.noAccount = (req, res) => {
  res.render('./error/no-account.ejs')
}

// @desc    Register Account
// @route   GET /auth/acctRegistration
exports.acctRegistration = (req, res) => {
  res.render('registration-user.ejs')
}

// @desc    Push Account Registration
// @route   PUT /auth/acctRegistration
exports.pushRegistration = async (req, res) => {
  const accountType = req.body.accountType
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { 
        firstNameApp: req.body.firstNameApp,
        lastNameApp: req.body.lastNameApp,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        accountType: req.body.accountType,
        registrationStatus: true 
      }
    );
    if (accountType === 'parent') {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { parentPermission: true }
    )} else if (accountType === 'teacher') {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { teacherPermission: true }
    )} else if (accountType === 'admin') {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { adminPermission: true }
    )}
    console.log("Account Registered!");
    res.redirect(`/auth/registration-success/${req.params.id}`)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Get Registration Success Page
// @route   GET /auth/registrationSuccess
exports.registrationSuccess = (req, res) => {
  res.render('registration-user-success.ejs')
}