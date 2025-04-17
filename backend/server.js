const express = require('express')
const app = express()

// Imports
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dbConnect = require('./DB/Config')
const myRoutes = require('./routes/router')

// Midllewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173", // Allow requests from this origin Only
    credentials : true                // Allow cookies to be sent/received
}))


dbConnect()
app.use('/', myRoutes)


app.listen(3000, () => console.log('Server is Running on 3000'))