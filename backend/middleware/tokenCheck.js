const tokenCheck = (req, res, next) => {
   const token = req.cookies.token;
   console.log('tokenCheck MW', token);
   
   
   if(!token) return res.status(400).json({message : 'Login Required'})

   next()
   
}

module.exports = tokenCheck;