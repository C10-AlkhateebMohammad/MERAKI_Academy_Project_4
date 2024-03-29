const CartModel = require('../models/cartItemSchema.');

const addToCart=(req,res)=>{
    const {product,quantity}=req.body;
    const newProduct=new CartModel({product,quantity})
    newProduct.save()
    .then((resuilt)=>{
res.status(201).json({success: true,
    message: "Added Product Successfully"
    })
    })
    .catch((err)=>{
res.status(409).json({
    success: false,
    message: "Error Added Product "
})
    })
}

module.exports = {
    addToCart
}