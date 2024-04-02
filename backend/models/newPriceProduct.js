const monoose=require('mongoose')
const priceSchema=new monoose.Schema({
    Name : {
        type :String
    },
    images : {
        type : [String]
    },
    oldprice :{
        type:String
    },
    newprice:
    {
        type:String

    }
})
module.exports=monoose.model('Price',priceSchema)