const mongoose=require('mongoose')
const userSchema =mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    image:String,
    description:String,
    department:String
})
const userModelDH = mongoose.model("DepartmentHeads",userSchema)
module.exports=userModelDH;