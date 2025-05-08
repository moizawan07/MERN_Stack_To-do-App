const jwt =  require('jsonwebtoken');
const tasksModel = require('../models/task')

const addTask = async (req, res) => {
// 1: Find the User Dedails Ka Kis User ka Task Ha  
 let token = req.cookies.token
 let user = jwt.verify(token, process.env.JWT_SECRET)
 
 

  try {
    let addSucess = await tasksModel.create({
        userId : user.id,
        ...req.body
    })
    
    res.status(200).json({
        message : 'Sucess',
     })
  }
   catch (error) {
    res.status(500).json({
        message : 'Server Error',
     })}


  
}

module.exports = addTask