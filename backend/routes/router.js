const express = require('express')
const myRoutes = express.Router()

// Midlleware & Controllers Imports
const signUp = require('../controllers/signup')
const suAuth = require('../middleware/signupAuth')
const login = require('../controllers/login')
const tokenCheck = require('../middleware/tokenCheck')
const getStarted = require('../controllers/getStarted')
const addTask = require('../controllers/addTask')
const getTasks = require('../controllers/getTasks')
const todoComplete = require('../controllers/todoComplete')
const todoDelete = require('../controllers/todoDelete')

// Signup Route
myRoutes.post('/signup', suAuth, signUp)

// Login Route
myRoutes.post('/login',  login)

// Get Started Route In This Check User Login Or Not
myRoutes.get('/getStarted', tokenCheck, getStarted)

// Add User Task (Todo) IN The DataBase Route
myRoutes.post('/addTask',tokenCheck, addTask)

// Get User Task (Todo) IN The DataBase Route
myRoutes.get('/getTasks', tokenCheck, getTasks)

// Complete User task Updte his Todo Status
myRoutes.put('/CompleteTask/:todoId', tokenCheck, todoComplete)

// Delete User Task 
myRoutes.delete('/deleteTask/:todoId', tokenCheck, todoDelete)

module.exports = myRoutes