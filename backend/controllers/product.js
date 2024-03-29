const productModel=require('../models/productSchema')

const creatNewProduct = (req, res) => {
    const {Name, price, description, images, brand} = req.body;
    const newProduct = new productModel({Name, price, description, images, brand});
    newProduct.save()
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Created Successfully",
            });
        })
        .catch((err) => {
            res.status(409).json({
                success: false,
                message: "The email already exists"
            });
        });
};

const getAllProduct=(req,res)=>{
    productModel.find({})
    .then((resuilt)=>{
        res.status(200).json({success: true,
            message: "All the product",
            articles: {resuilt}})
    })
    .catch((err)=>{
        res.status(500).json({success: false,
            message: "Server Error",
            err: {err}})
    })
}

module.exports={
    creatNewProduct,
    getAllProduct
}