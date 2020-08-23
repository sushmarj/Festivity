const mongoose =require("mongoose");

const eventSchema =mongoose.Schema({
    eventname:{
        type:String
    },
    start:{
        type:String
    },
    end:{
        type:String
    },
    startt:{
        type:String
    },
    endt:{
        type:String
    },
    eventcreated:{
        type:String
    },
    image:{
        type:String
    },
    location:{
        type:String
    },
    adultprice:{
        type:Number
        
    },
    childprice:{
        type:Number
    },
    vegprice:{
        type:Number
    },
    nonvegprice:{
        type:Number
    },
    drinksprice:{
        type:Number
    },
    startbook:{
        type:String
    },
    endbook:{
        type:String
    },
    description:{
        type:String
        
    }
})
const event= module.exports= mongoose.model('event', eventSchema);