const express = require('express')
const myRoutes = express.Router()

// Midlleware & Controllers Imports
const signUp = require('../controllers/signup')
const suAuth = require('../middleware/signupAuth')
const login = require('../controllers/login')
const getStarted = require('../controllers/getStarted')

// Signup Route
myRoutes.post('/signup', suAuth, signUp)

// Login Route
myRoutes.post('/login',  login)

// Get Started Route In This Check User Login Or Not
myRoutes.get('/getStarted', getStarted)

module.exports = myRoutes