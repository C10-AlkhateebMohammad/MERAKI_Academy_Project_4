const express=require("express")
const userrouter=express.Router();
const {creatNewUser,loginUser}=require('../controllers/users')


userrouter.post('/register',creatNewUser)
userrouter.post('/login',loginUser)

module.exports=userrouter