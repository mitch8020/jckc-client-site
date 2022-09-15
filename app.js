const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()
const PORT = process.env.PORT || 3000

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Body-Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method Override
app.use(methodOverride("_method"))

// Sessions
app.use(session({
  secret: 'keyboard mouse',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Global Var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Helper Functions
  /*
    VARIABLE EXAMPLE
    app.locals.somevar = "hello world";
  */
  /*
    FUNCTION EXAMPLE
    app.locals.someHelper = function(name) {
      return ("hello " + name);
    }
  */
  app.locals.formatDate = function(date) {
    let dateToFormat, month, day, year
    if (!date) {
      dateToFormat = new Date()
    }

    // Check if input is string or date data type
    if (typeof date == 'string') {
      dateToFormat = date.split('-')
      month = dateToFormat[1]
      day = dateToFormat[2]
      year = dateToFormat[0]
    } else {
      month = dateToFormat.getMonth() + 1
      day = dateToFormat.getDate()
      year = dateToFormat.getFullYear()
    }

    return `${month}/${day}/${year}`
  }

  app.locals.convertAge = function(birthday) {
    const today = new Date()
    const dateOfBirth = new Date(birthday)
    let age = ((today - dateOfBirth) / 1000 / 60 / 60 / 24 / 7 / 52)
    if (age * 12 < 12) {
      return `${Math.floor(age * 12)} month${Math.floor(age * 12) > 1 ? 's' : ''} old`
    } else {
      return `${Math.floor(age)} year${Math.floor(age) > 1 ? 's' : ''} old`
    }
  }

  app.locals.properNoun = function(name) {
    let ans = name.toLowerCase()
    return ans[0].toUpperCase() + ans.substring(1, ans.length)
  }

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/student', require('./routes/student'))

// PORT Connection
app.listen(PORT, ()=>{
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})