const express=require("express")
const cartRouter=express.Router();

const {addToCart,getAllCart}=require('../controllers/cart')
const authentication=require('../middleware/Authentication')



cartRouter.post('/add',authentication,addToCart)
cartRouter.get('/',authentication,getAllCart)



module.exports=cartRouter