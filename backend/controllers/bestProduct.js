const bestModal=require('../models/bestSellingProductSchema')

const createBestProduct=(req,res)=>{
    const {name,price,category,images,brand}=req.body;
    const newBestProduct=new bestModal({name,price,category,images,brand})
    console.log(newBestProduct)
    newBestProduct.save()
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "Created Successfully",
            resui:result
        })
    })
    .catch((err)=>{
        res.status(409).json({
            success:false,
            message :"error added"

        })
    })
}

const getAllProductSelling=(req,res)=>{
    bestModal.find({})
    .then((result)=>{
        res.status(201).json({
            success:true,
            message:"All the product Selling",
            result:result
        })
    })
    .catch((err)=>{
        res.status(409).json({
            success:false,
            message:"erro all"

        })
    })
}

module.exports={
    createBestProduct,
    getAllProductSelling
}