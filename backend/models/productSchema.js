const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    Name : {
        type : String,
        required :true
    },
    price : {
        type : String,

    },
    description : {
        type : String
    },
    images : {
        type : [String]
    },
    brand : {
        type :String,
       

    }
})

module.exports=mongoose.model('Product',productSchema)


