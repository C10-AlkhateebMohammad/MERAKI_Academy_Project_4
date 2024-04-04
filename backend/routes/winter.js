const express=require('express');
const { model } = require('mongoose');
const routerWinter=express.Router();

const {creatWinterProduct,getAllWinterProduct}=require("../controllers/winter")

routerWinter.post('/creat',creatWinterProduct)
routerWinter.get('/',getAllWinterProduct)
module.exports=routerWinter