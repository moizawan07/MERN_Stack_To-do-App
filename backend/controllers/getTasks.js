const jwt = require("jsonwebtoken")
const tasksModel = require('../models/task')

const getTasks = async (req, res) => {
   let token = req.cookies.token
   let user = jwt.verify(token, process.env.JWT_SECRET)

   try {
     let tasks = await tasksModel.find({userId : user.id})

     res.status(200).json({
        message : 'SucessFully get',
        data : tasks
     })
   } 
   
   catch (error) {
     res.status(500).json({
        message : 'Server Error',
     })}
  
}

module.exports = getTasks