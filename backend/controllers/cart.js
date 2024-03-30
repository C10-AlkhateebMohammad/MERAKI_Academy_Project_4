const CartModel = require('../models/cartItemSchema.');

const ProductModel=require('../models/productSchema')
const addToCart=(req,res)=>{
    const {product,quantity}=req.body;

    const newProduct=new CartModel({product, quantity})

    newProduct.save()
    .then((result)=>{
        return CartModel.populate(result,{path: 'product',model:ProductModel})
    })
    .then((populatedResult)=>{
        res.status(201).json({
            success: true,
            message: "Added Product Successfully",
            cartItem: populatedResult 
               });

    })
    .catch((err) => {
        res.status(409).json({
            success: false,
            message: "Error Adding Product"
        });
    });
}

module.exports = {
    addToCart
}