const mongoose=require('mongoose')
const userSchema =mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    image:String,
    description:String,
    report:String,
    department:String
})
const userModel = mongoose.model("Employee",userSchema)
module.exports=userModel;