const taskModel = require('../models/task')

const todoDelete = async (req, res) => {
  let {todoId} = req.params

  try {
    let deleteTodo = await taskModel.findByIdAndDelete(todoId)
    console.log("Delete ==>", deleteTodo);

    res.status(200).json({message : 'Sucessfully Delete'})
  } 
  catch (error) {
    res.status(500).json({message : 'Server Error'})
  }
}


module.exports = todoDelete