const express=require("express")
const categoryRouter=express.Router();
const {createCategory}=require('../controllers/category')



categoryRouter.post('/creat',createCategory)


module.exports=categoryRouter
