const pricemodel=require('../models/newPriceProduct')

const createNewproductPrice = (req, res) => {
    const { Name, images, oldprice, newprice } = req.body;
    const newPrice = new pricemodel({ Name, images, oldprice, newprice });
    
    newPrice.save()
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Created Successfully",
            });
        })
        .catch((err) => {
            res.status(409).json({
                success: false,
                message: "Error"
            });
        });
}

const getAllPrice=(req,res)=>{
    pricemodel.find({})
    .then((result)=>
    {
        res.status(201).json({
            success: true,
            message: "Created Successfully",

        })
    })
   .catch((err)=>{
    res.status(409).json({
        success: false,
        message: "Error"
        
    });
   })
}

module.exports = {
    createNewproductPrice,
    getAllPrice
}