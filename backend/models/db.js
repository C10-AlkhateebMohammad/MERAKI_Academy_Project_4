const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/project_4")
.then(()=>{
    console.log("db redy run")
})
.catch((err)=>{
    console.log(err)
})