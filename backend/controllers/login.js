let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken')
const signupModel = require('../models/user');

const login = async (req, res) => {
    console.log("Login CON ma");
    let {email, password} = req.body

 // 1: Check if the user email is registered
 // 2: Verify if the entered password matches the stored password

 try {
    let user = await signupModel.findOne({email})
    console.log("users email true ==>", user);

    if(!user){
        return res.status(404).json({message : 'Email Not Regester'})
    }
    
// if Email is Register Now Check Pass Match
let passwordMatched = await bcrypt.compare(password,user.password)

if(!passwordMatched){
    return res.status(404).json({message : 'Password Not matched'})
}

// Email Or Password Ok Now Generate a JWT Token and Add In The Cookies


let token =  jwt.sign({
    id :    user._id,
    name :  user.name,
    email : user.email,
}, 
process.env.JWT_SECRET,
{expiresIn : "30d"})

console.log('token', token);

    // Cookies Set 
 res.cookie("token", token, {
     httpOnly: true,  // JavaScript se access nahi ho sakti
     sameSite: "Lax", // Same site ya trusted site se hi bheji jaayegi
     maxAge: 30 * 24 * 60 * 60 * 1000 // 30 din
 });

 res.status(200).json({message : 'SucessFully login'})
    
 } 
 catch (error) {
    res.status(500).json({message : "Server Error"})
 }
  
    
}

module.exports = login