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
  res.render('acct-registration.ejs')
}

// @desc    Push Account Registration
// @route   PUT /auth/acctRegistration
exports.pushRegistration = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { registrationStatus: true }
    );
    console.log("Account Registered!");
    res.redirect(`/dashboardParent/${req.params.id}`);
  } catch (error) {
    console.log(error)
  }
}