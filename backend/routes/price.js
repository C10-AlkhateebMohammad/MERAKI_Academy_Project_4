const express=require("express")
const priceRouter=express.Router();

const {createNewproductPrice,getAllPrice}=require('../controllers/price')

priceRouter.post('/create',createNewproductPrice)
priceRouter.get('/',getAllPrice)


module.exports=priceRouter