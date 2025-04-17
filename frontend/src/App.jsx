import { BrowserRouter , Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Todo from './pages/Todo';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PageNotFound from './pages/404';



function App() {
  
  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='todo' element={<Todo />}/> 
        <Route path='/signup' element={<Signup />}/> 
        <Route path='login' element={<Login />}/> 
        <Route path='*' element={<PageNotFound />}/> 
     </Routes>
   </BrowserRouter>
  )
}

export default App;
