const express=require("express")
const visitRouter=express.Router();

const {incrementPageVisit}=require('../controllers/visitCounter')
visitRouter.get('/',incrementPageVisit)
module.exports=visitRouter