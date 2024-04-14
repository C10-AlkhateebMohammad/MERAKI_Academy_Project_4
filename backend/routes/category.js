const express=require("express")
const categoryRouter=express.Router();
const {createCategory,getAllcaetgories}=require('../controllers/category')



categoryRouter.post('/creat',createCategory)
categoryRouter.get('/',getAllcaetgories)



module.exports=categoryRouter
