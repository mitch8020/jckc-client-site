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
// @route   /auth/no-account
exports.noAccount = (req, res) => {
  res.render('./errors/no-account.ejs')
}