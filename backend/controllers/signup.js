const bcrypt = require('bcrypt')
const signupModel = require('../models/user')

const signUp = async (req, res) => {
    console.log('Signup CON ma');
  let {name, email, password} = req.body
  
  try {
     let hashPass = await bcrypt.hash(password, 10)
     console.log('hashpass==>', hashPass);
        

    let userRegister = await signupModel.create({
        name ,
        email,
        password : hashPass,
    })

    res.status(201).json({message: 'SignUp Sucessfully', user : userRegister})
     
  } 
  catch (error) {
    console.log('controller catched err', error);
    res.status(500).json({message : 'Server Error'})
  }
}

module.exports = signUp