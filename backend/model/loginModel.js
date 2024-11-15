const mongoose = require("mongoose");
const personSchema = mongoose.Schema(
    {
        email:{
            type:String,
            require:[true,"please add your email"],
        },
        name:{
            type:String,
            require:[true,"please add your name"],
        },
        gender:{
            type:String,
            require:[true,"please add your gender"],
        },
        address:{
            type:String,
            require:[true,"please add your address"],
        },
        phoneNumber:{
            type:Number,
            require:[true,"please add your phonenumber"],
        },
        password:{
            type:String,
            require:[true,"please add your password"],
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Person",personSchema);