const express=require("express")
const cartRouter=express.Router();

const {addToCart,getAllCart,removeProductFromCart}=require('../controllers/cart')
const authentication=require('../middleware/Authentication')



cartRouter.post('/add',authentication,addToCart)
cartRouter.get('/',authentication,getAllCart)
cartRouter.delete('/:id',authentication,removeProductFromCart)




module.exports=cartRouter