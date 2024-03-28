const express=require("express")
const userrouter=express.Router();
const {creatNewUser}=require('../controllers/users')


userrouter.post('/register',creatNewUser)
//userrouter.post('/login',loginUser)

module.exports=userrouter