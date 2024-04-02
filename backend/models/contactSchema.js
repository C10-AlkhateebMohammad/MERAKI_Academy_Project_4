const mongoose=require('mongoose')
const contactMode=new mongoose.Schema({
    email :{
        type :String
    },
    Sbject:{
        type:String
    },

    Message:{
        type:String
    },
    PhoneNumber:{
        type:String
    },

})
module.exports=mongoose.model('Contact',contactMode)