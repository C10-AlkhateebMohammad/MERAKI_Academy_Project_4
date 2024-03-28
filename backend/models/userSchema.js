const mongoose=require('mongoose')
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({

    firstName : {
        type : String,
        required :true
    },
    lastName : {
        type : String,
        required :true

    },
    age : {
        type : Number
    },
    country : {
        type : String
    },
    email : {
        type :String,
        required :true,
        unique:true

    },
    password : {
        type : String,
        required :true


    }
})

module.exports=mongoose.model('User',userSchema)