import { useEffect, useState } from 'react';
import StatCard from '../components/todoCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaRegClock, FaPlus, FaTimes, FaTrashAlt, FaEdit, FaTasks, FaClipboardList, FaMoon, FaSun } from 'react-icons/fa';
import { toast } from 'react-toastify';


export default function Todo() {
  const [showModal, setShowModal] = useState(false);   // state to show & hide modal
  const [isDarkMode, setIsDarkMode] = useState(true);  // state to toggle light/dark mode
  const [tasks, setTasks] = useState([]);            // state hold all the Tasks (Todos)
  const [getAllTasks, setGetAllTasks] = useState(null) // state managed that when all the users tasks get
  const [newTaskText, setNewTaskText] = useState('');  // state add task input value Hold

// UseEffect in This im Getting users Tasks all 
useEffect(() => {
  let get =  async () => {
  try {
    let response =  await fetch('http://localhost:3000/getTasks', {
      method : 'GET',
      credentials : 'include'
    })
   let resData = await response.json()

      if(response.status == 200){
         return setTasks(resData.data)}

      throw new Error (resData) 
}
  catch (error) {
    alert(error.message)}  }
get()
}, [getAllTasks])


  // In This Function We Add Task (Todo) & Set In The Database
const addTaskSubmit = async () => {
  setShowModal(false) // Modal Off
  setNewTaskText('') // Input Value empty

  // Now Send The Backend Current Task Backend Stored Taks In The Database
 try {
  let response = await fetch('http://localhost:3000/addTask', {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body:  JSON.stringify({taskName : newTaskText, status : 'Pending'}),    // Task Status Initiall Value Pending
    credentials :'include'
  })

 let resData = await response.json()
     if(response.status !== 200) throw new Error(resData)
    // Change the State Bcuz again get Updated Todos
      setGetAllTasks(!getAllTasks)

    toast.success('Add Task Sucesfully', {theme : 'dark', position : 'top-left'})
 }
  catch (error) {
   console.log(error)
  }  
} 


// Todo Complete Change his Status to Complete
const taskComplete = async (taskId) => {
  try {
    let response = await fetch(`http://localhost:3000/CompleteTask/${taskId}`, {
      method : 'PUT',
      credentials :'include'
    })
    let resData = await response.json()
     if(response.status !== 200) throw new Error(resData)

      setGetAllTasks(!getAllTasks)
      toast.success('Sucessfully Completed', {theme : 'dark'})

  } 
  catch (error) {
    alert(error.message)
  }
}


// Todo Deleted
const taskDelete = async (taskId) => {
  try {
    let response = await fetch(`http://localhost:3000/deleteTask/${taskId}`, {
      method : 'DELETE',
      credentials :'include'
    })
    let resData = await response.json()
     if(response.status !== 200) throw new Error(resData)

       toast.warn('Deleted', {theme : 'dark', position : 'bottom-left'})
      setGetAllTasks(!getAllTasks)
  } 
  catch (error) {
    alert(error.message)
  }
}


// Count How many Tasks user Completed
const completedTasksCount = (status) => {
  let count = 0;

  tasks.forEach(todo => todo.status === status && count++)
  return count;
}

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900' : 'bg-white'} text-white p-6`}>
      {/* Top Bar with Light/Dark Mode Toggle */}
      <header className="flex justify-between items-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
        >
          My Taskboard
        </motion.h1>

        {/* Light/Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-xl p-2 rounded-full hover:bg-gray-700"
        >
          {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
        </button>
      </header>

      <p className={`text-gray-400 ${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>Track, manage and master your day!</p>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Tasks"
          count={tasks.length}
          color="bg-blue-500"
          icon={<FaTasks className="inline mr-2 text-3xl" />}
        />
        <StatCard
          title="Completed"
          count={completedTasksCount('completed')}
          color="bg-green-500"
          icon={<FaCheckCircle className="inline mr-2 text-3xl" />}
        />
        <StatCard
          title="Pending"
          count={completedTasksCount('Pending')}
          color="bg-yellow-500"
          icon={<FaRegClock className="inline mr-2 text-3xl" />}
        />
        <StatCard
          title="Productivity"
          count={tasks.length}
          color="bg-purple-500"
          icon={<FaClipboardList className="inline mr-2 text-3xl" />}
        />
      </section>

      {/* Buttons with no functionality */}
      {tasks.length > 0 && (
      <div className="flex justify-end mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">All</button>
        <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">Completed</button>
        <button className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500">Pending</button>
      </div>
      )}

          {/* Here Print The Todo Tasks  */}
      <motion.ul layout className="space-y-4">
        {tasks.length > 0 ?  (
        tasks.map(task => (
          <motion.li
            key={task._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-lg px-6 py-5 flex items-center justify-between hover:bg-gray-200 ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/5' : 'bg-gray-100 text-black hover:bg-gray-300'}`}
          >
            {/* Left: Task Name */}
            <div className=" text-left text-lg font-medium break-words w-[40%]">
              {task.taskName}
            </div>
        
            {/* Center: Status */}
            <div className="w-[40%] text-sm font-semibold">
              <span className={task.status === 'completed' ? 'text-green-400' : 'text-yellow-300'}>
                {task.status}
              </span>
            </div>
        
            {/* Right: Icons */}
            <div className="flex items-center space-x-3">
              <button className={`text-green-500 hover:text-green-600 disabled-bg
              ${task.status === 'completed' && 'opacity-50 cursor-not-allowed'}
              `}
                 disabled={task.status === "completed"}
                onClick={() => taskComplete(task._id)}
              >
                <FaCheckCircle className="text-lg"/>
              </button>
              <button className="text-yellow-400 hover:text-yellow-500">
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-600"
                onClick={() => taskDelete(task._id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </motion.li>
        ))) : <p className='mt-2 ml-2 text-gray-400'>No Tasks Added Yet</p>}
      </motion.ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-teal-400 text-black px-6 py-3 rounded-full shadow-xl text-lg flex items-center gap-2"
      >
        <FaPlus /> Add Task
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm flex items-center justify-center z-50`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-2xl shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white text-black'}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add New Task</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className={`${isDarkMode ? 'text-white' : 'text-black'} hover:${isDarkMode ? 'text-red-400' : 'text-red-500'}`}
                >
                  <FaTimes />
                </button>
              </div>
              <input
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => {e.key === 'Enter' && addTaskSubmit()}}
                type="text"
                placeholder="Enter task description"
                className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} focus:outline-none`}
              />
              <button
                 onClick={addTaskSubmit}
                className="mt-4 w-full bg-teal-500 hover:bg-teal-400 text-black font-semibold px-4 py-2 rounded-lg"
              >
                Add Task
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


