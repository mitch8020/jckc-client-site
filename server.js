const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

const app = express()

// Load Config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Body-Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

// PORT Connection
app.listen(process.env.PORT, ()=>{
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})