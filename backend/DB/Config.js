require('dotenv').config()
let mongoose = require('mongoose')
const URL = process.env.DB_URL


const dbConnect = async () => {
   
    try {
      await  mongoose.connect(URL)
      console.log('Database Connected');
      
    } 
    catch (error) {
     console.log('Database NOT Connected', error);
    //  process.exit()
    }
    

}
module.exports = dbConnect