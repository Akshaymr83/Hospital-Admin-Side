const mongoose=require('mongoose')
const userSchema =mongoose.Schema({
    department:String,
    year:Number,
    image:String,
    description:String,
   
})
const departmentModel = mongoose.model("Department",userSchema)
module.exports=departmentModel;