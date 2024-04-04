const express=require("express")
const productRouter=express.Router();
const {creatNewProduct,getAllProduct,deletedProductByid}=require('../controllers/product')

productRouter.post('/create',creatNewProduct)
productRouter.get('/',getAllProduct)

module.exports=productRouter
