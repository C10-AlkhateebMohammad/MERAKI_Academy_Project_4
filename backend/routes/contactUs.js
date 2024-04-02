const express=require("express")
const contactRouter=express.Router();

const {CreateContactUs}=require('../controllers/contact');
const { model } = require("mongoose");

contactRouter.post('/creat',CreateContactUs)

module.exports=contactRouter
