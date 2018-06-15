const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const db = require('./db/db')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db })
const app = express()
module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  db.models.user
    .findById(id)
    .then(user => done(null, user))
    .catch(done)
})

app.use(volleyball)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'diet coke',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  await db.sync()
  console.log('DB synced!')
  console.log(`Listening on port ${PORT}`)
})
