const productModel=require('../models/productSchema')
const bodyParser=require('querystring')

const creatNewProduct = (req, res) => {
    const {Name, price,categoryId, images, brand,tages} = req.body;
    const newProduct = new productModel({Name, price,categoryId, images, brand,tages});
    newProduct.save()
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Created Successfully",
                resui:result
            });
        })
        .catch((err) => {
            res.status(409).json({
                success: false,
                message: ""
            });
        });
};

const getAllProduct=(req,res)=>{
    const {categoryId,tages}=(bodyParser.parse(req.url.split('?')[1]))

    const filter={

    }
   if(categoryId)
    Object.assign(filter,{categoryId})
    if(tages)
    Object.assign(filter,{tages})
    console.log(filter)
    productModel.find(filter)
    .then((resuilt)=>{
        console.log(resuilt)
        res.status(200).json({success: true,
            message: "All the product",
            articles: resuilt
            
         } )
    })
    .catch((err)=>{
        res.status(500).json({success: false,
            message: "Server Error",
            err: {err}})
    })
}




module.exports={
    creatNewProduct,
    getAllProduct,
}