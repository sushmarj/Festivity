const mongoose =require("mongoose");

const accountregSchema =mongoose.Schema({
    username:{
        type:String

    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    gender:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    role:{
        type:String,
    }

})
const Accountreg= module.exports= mongoose.model('Accountreg', accountregSchema);