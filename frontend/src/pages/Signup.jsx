import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import signupImg from '../assets/signup.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Signup() {
    const [formValues , setFormValues] = useState({
        name : '',
        email : '',
        password : '',
    })
    const [formErr , setFormErr] = useState({
        name : '',
        email : '',
        password : '',
    })
   const [serverRes, setServerRes] = useState(null)
   let navigate = useNavigate(null)

const validation = () => {
  let {name, email, password} = formValues;
  let validaErr = {}
  let emailRegex = /^[a-zA-Z0-9._%+-]{4,}@(gmail\.com|yahoo\.com|outlook\.com)$/; // Email Regex

//    Name Condition
   if(!name){
    validaErr.name = "Name is Required"
   }
   else if(name.length < 4){
    validaErr.name = "Name must than 4 Character"
   }

//  Email Condition
   if(!email){
    validaErr.email = "Email is Required"
   }
   else if(!emailRegex.test(email)){
    validaErr.email = "Email is not valid"
   }

 //  Password Condition 
   if(!password){
    validaErr.password = "Password is Required"
   }
   else if(password.length < 6){
    validaErr.password = "Password must than 6 Character"
   }
//    Change The Error State 
   setFormErr(validaErr)
//   Now Return Bollean Value Taka signupSubmit ko Pta
//   Chale gyee Error he to Signup nhiii krana user ko

return (Object.keys(validaErr).length === 0)

   
}

const signupSubmit = async (e)  => {
   e.preventDefault()

   if(!validation()){
    return "Validation Complete!"
   }

   try {
    let response = await fetch('http://localhost:3000/signup', {
      method : 'POST',
      headers :{"Content-Type" : 'application/json'},
      body : JSON.stringify(formValues)            
    })
    let responseData =  await response.json()
    
    if(response.status != 201){
      return setServerRes(responseData.message)
    }

    setServerRes(responseData.message)
    setTimeout(() => {
      navigate('/login')
    }, 1000);

    

    
   } 
   catch (error) {
    
   }
 
}

  return (
    <div className="flex items-center justify-center bg-black px-6 min-h-screen">
      <div className="w-[430px] h-[655px] bg-dark-card dark:bg-dark-card rounded-3xl border-dotted border-2  flex flex-col items-center p-8">
        {/* Top Image Section */}
        <div className="w-full flex justify-center">
          <img
            src={signupImg} // Image URL
            alt="signup-image"
            className="rounded-2xl w-[80%] h-[200px]  drop-shadow-amber-50 border-amber-300"
          />
        </div>

        {/* Form Section */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">Create Account</h2>

        <form className="w-full max-w-md space-y-6" onSubmit={signupSubmit}>
          {/* Name Input */}
          <div className="relative">
            <div className="absolute left-2.5 top-7 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={(e) => setFormValues({...formValues, ["name"] : e.target.value})}
              className="w-full pl-8.5 pr-4 py-3 rounded-lg outline-none border-2 border-gray-600  text-white placeholder-gray-500 transition-all focus:border-blue-500"
            />
            {formErr.name && <p className='text-red-500 text-[13px] ml-1.5'>{formErr.name}</p>}
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute left-2.5 top-7 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setFormValues({...formValues, ["email"] : e.target.value})}
              value={formValues.email}
              className="w-full pl-8.5 pr-4 py-3 rounded-lg outline-none border-2 border-gray-600  text-white placeholder-gray-500 transition-all focus:border-blue-500"
            />
            {formErr.email && <p className='text-red-500 text-[13px] ml-1.5'>{formErr.email}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-2.5 top-7 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
             <FaLock />
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={(e) => setFormValues({...formValues, ["password"] : e.target.value})}
              className="w-full pl-8.5 pr-4 py-3 rounded-lg outline-none border-2 border-gray-600  text-white placeholder-gray-500 transition-all focus:border-blue-500"
            />
            {formErr.password && <p className='text-red-500 text-[13px] ml-1.5'>{formErr.password}</p>}
          </div>

          {/* Server Response Message Show Here  */}
          {serverRes && <p className={serverRes.includes('Sucessfully') ? 'text-green-600' : 'text-red-500'}>
            {serverRes}
            </p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition mt-4"
          >
            Sign Up
          </button>

          {/* Alternative Sign In Link */}
          <p className="text-center mt-4 text-gray-400 dark:text-gray-500">
            Already have an account?
            <Link to='/login' className="text-blue-600 hover:underline"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
