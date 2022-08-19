const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

// Load Config
dotenv.config({ path: './config/.env' })

// Passport Config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')

// Static Folder
app.use(express.static('public'))

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger('dev'))

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)
  
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Flash (Error Display)
app.use(flash())

// // Set Global Var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Routes
app.use('/', mainRoutes)
app.use('/dashboard', todoRoutes)

// PORT Connection
app.listen(process.env.PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}. Go catch it!`)
})    