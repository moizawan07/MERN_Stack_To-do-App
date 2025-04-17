const getStarted = (req, res) => {
   const token = req.cookies.token;
   
   if(!token) return res.status(400).json({message : 'Login Required'})

    res.status(200).json({message : 'Hes Login User'})
   
}

module.exports = getStarted;