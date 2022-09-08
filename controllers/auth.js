const passport = require('passport')

// @desc    Log Out User
// @route   /auth/logout
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/')
  })
}

// @desc    Redirect No Account User
// @route   /auth/error/noAccount
exports.noAccount = (req, res) => {
  res.render('./error/no-account.ejs')
}

// @desc    Register Parent Account
// @route   /auth/acctRegistration
exports.acctRegistration = (req, res) => {
  res.render('acctRegistration.ejs')
}