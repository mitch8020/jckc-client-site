// @desc    Login/Landing Page
// @route   GET /
module.exports = {
  getIndex: (req,res)=>{
    res.render('index.ejs')
  }
}