import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import loginImg from '../assets/loginImg.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login() {

  const [formValues , setFormValues] = useState({
            email : '',
            password : '',
  })
  const [formErr , setFormErr] = useState({
            email : '',
            password : '',
  })
  const [serverRes, setServerRes] = useState(null)
  let navigate = useNavigate(null)
    
  const validation = () => {
      let {email, password} = formValues;
      let validaErr = {}
      let emailRegex = /^[a-zA-Z0-9._%+-]{4,}@(gmail\.com|yahoo\.com|outlook\.com)$/; // Email Regex
    
    
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
    
 const loginSubmit = async (e)  => {
    e.preventDefault()
 
    if(!validation()){
     return "Validation Complete!"
    }

    try {
      let response = await fetch('http://localhost:3000/login', {
        method : 'POST',
        headers :{"Content-Type" : 'application/json'},
        body : JSON.stringify(formValues), 
        credentials: 'include', // ye line btati ha ka cookies send & recived Ho pai         
      },)
      let responseData =  await response.json()

      if(response.status != 200){
        return setServerRes(responseData.message)
      }

      setServerRes(responseData.message)
      setTimeout(() => {
       navigate('/')
      }, 1000);

  
    } 
    catch (error) {
      console.log('l Catched', error); 
    }
 }


  return (
    <div className="flex items-center justify-center bg-black px-6 min-h-screen">
      <div className="w-[430px] h-[655px] bg-dark-card dark:bg-dark-card rounded-3xl border-dotted border-2  flex flex-col items-center p-8">
        {/* Top Image Section */}
        <div className="w-full flex justify-center">
          <img
            src={loginImg} // Image URL
            alt="signup-image"
            className="rounded-2xl w-[80%] h-[200px]  drop-shadow-amber-50 border-amber-300"
          />
        </div>

        {/* Form Section */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">Login Account</h2>

        <form onSubmit={loginSubmit} className="w-full max-w-md space-y-6">

          {/* Email Input */}
          <div className="relative">
            <div className="absolute left-2.5 top-7 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
              <FaEnvelope />
            </div>
            <input
              type="email"
              value={formValues.email}
              onChange={(e) => setFormValues({...formValues, ['email'] : e.target.value})}
              placeholder="Enter your Email"
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
              value={formValues.password}
              onChange={(e) => setFormValues({...formValues, ['password'] : e.target.value})}
              placeholder="Enter your password"
              className="w-full pl-8.5 pr-4 py-3 rounded-lg outline-none border-2 border-gray-600  text-white placeholder-gray-500 transition-all focus:border-blue-500"
            />
            {formErr.password && <p className='text-red-500 text-[13px] ml-1.5'>{formErr.password}</p>}
         {/* Server Response Show Here */}
         {serverRes && <p className={serverRes.includes('SucessFully') ? 'text-green-600' : 'text-red-500 text-[14px]'}>
          {serverRes}
          </p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition mt-4"
          >
            Sign In
          </button>

          {/* Alternative Sign In Link */}
          <p className="text-center mt-4 text-gray-400 dark:text-gray-500">
            Don't have an account?
          <Link to='/signup' className="text-blue-600 hover:underline"> Signup </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
