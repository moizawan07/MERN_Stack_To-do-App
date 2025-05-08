const taskModel = require('../models/task')

const todoComplete = async (req, res) => {
  let {todoId} = req.params

  try {
    let update = await taskModel.findByIdAndUpdate(todoId,{status : 'completed'})
    console.log("update ==>", update);

    res.status(200).json({message : 'Sucessfully Update'})
  } 
  catch (error) {
    res.status(500).json({message : 'Server Error'})
  }
}


module.exports = todoComplete