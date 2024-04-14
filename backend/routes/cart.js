const express=require("express")
const cartRouter=express.Router();

const {addToCart,getAllCart,deleteCartById}=require('../controllers/cart')
const authentication=require('../middleware/Authentication')



cartRouter.post('/add',authentication,addToCart)
cartRouter.get('/',authentication,getAllCart)
cartRouter.delete('/:id',deleteCartById)




module.exports=cartRouter