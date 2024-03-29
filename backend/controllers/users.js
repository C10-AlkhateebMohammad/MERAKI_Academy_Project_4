const userModel=require("../models/userSchema");
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const rolesModel = require("../models/roles");

const creatNewUser=(req,res)=>{
    const {firstName,lastName,age,country,email,password,role}=req.body;
    const newUser=new userModel({firstName,lastName,age,country,email,password,role : "6606a66ca5a6bdd391f90167"})
    newUser.save()
    .then((resuilt)=>{
        res.status(201).json({success: true,
            message: "Account Created Successfully",
            author: "the new user"})

    })
    .catch((err)=>{
        res.status(409).json({success: false,
            message: "The email already exists"})
    })


}

const loginUser = (req, res) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    userModel
      .findOne({ email })
      .then(async (result) => {
        if (!result) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        try {
          const valid = await bcrypt.compare(password, result.password);
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The email doesn't exist or The password you’ve entered is incorrect`,
            });
          }
          const role = await rolesModel.findById('6606a66ca5a6bdd391f90167')
          const payload = {
            userId: result._id,
            author: result.firstName,
            role: role,
            country: result.country,
          };
  
          console.log('payload', payload);
          const options = {
            expiresIn: "2d",
          };
          const token = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
          });
        } catch (error) {
          throw new Error(error.message);
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };


module.exports={
    creatNewUser,
    loginUser
}