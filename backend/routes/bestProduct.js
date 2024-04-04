const express=require("express")
const routerBest=express.Router();
const {createBestProduct,getAllProductSelling}=require("../controllers/bestProduct")

routerBest.post('/creat',createBestProduct)
routerBest.get('/',getAllProductSelling)



module.exports=routerBest