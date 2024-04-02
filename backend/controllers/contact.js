const contacModel=require('../models/contactSchema')

const CreateContactUs=(req,res)=>{
    const {email,Sbject,Message,PhoneNumber}=req.body
    const newCreate=new contacModel({email,Sbject,Message,PhoneNumber})
    newCreate.save()
    .then((result)=>{
        res.status(201).json({
            success:true,
            Message:"created"
        })
    })
    .catch((err)=>{
        res.status(201).json({
            success:true,
            Message:err
        })
    })
}
module.exports={
    CreateContactUs
}