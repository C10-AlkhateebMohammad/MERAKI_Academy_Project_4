const express=require("express")
const cartRouter=express.Router();

const {addToCart}=require('../controllers/cart')



cartRouter.post('/add',addToCart)


module.exports=cartRouter