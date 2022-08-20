const passport = require('passport')

// @desc    Log Out User
// @route   /auth/logout
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/')
  })
}