const mongoose =require("mongoose");
const joi =require('joi');
const userSchema =mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
       
    }
    
   
})
const user= module.exports= mongoose.model('user', userSchema);