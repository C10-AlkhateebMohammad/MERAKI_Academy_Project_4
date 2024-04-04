const winterModel=require('../models/winterScema')
 
const creatWinterProduct=(req,res)=>{
    const {Name,price,images,brand}=req.body
    const newWinterProduct=new winterModel({
        Name,price,images,brand
    })
    newWinterProduct.save()
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "added product",
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
    })

}

const getAllWinterProduct=(req,res)=>{
    winterModel.find({})
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "get all",
            result:result
        })

    })
    .catch((err)=>{
       res.status(409).json({
        success: false,
        message: "get error",
       })
    })
}


module.exports={creatWinterProduct,getAllWinterProduct}