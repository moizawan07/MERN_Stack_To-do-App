const signupModel = require("../models/user");

const signAuth = async (req, res, next) => {
  console.log("Signup MW ma");
  let { email } = req.body;

  //     Check Current user Email Is Use Any Other user In the DATABASE
  //     if Yes So return the curr user and say change the email
  //     if No So Add the user In the DATABASE

  try {
    let user = await signupModel.findOne({ email: email });
    console.log("user is signup..?", user);

    if (user) {
      return res.status(400).json({message: "Email already exist" });
    }
    next();
  } 
  catch (error) {
    console.log("middlware catched err", error);
    res.status(500).json({message : "Server Error"})
  }
};

module.exports = signAuth;
