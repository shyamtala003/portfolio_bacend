const mongoose=require("mongoose");
const validator=require("validator");

const emailSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter a valid email address"],
        unique:[true,"already email exists in over records"],
        validate: [validator.isEmail, "Email address is invalid"],
    }
})

module.exports=mongoose.model("email",emailSchema);