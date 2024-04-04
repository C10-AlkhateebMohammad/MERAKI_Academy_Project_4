const mongoose=require("mongoose")

const winterScema=new mongoose.Schema({
    Name : {
        type : String,
        required :true
    },
    price : {
        type : String,

    }, 
    images : {
        type : [String]
    },
    
    brand : {
        type :String,
       
    }
})
module.exports=mongoose.model('Winter',winterScema)