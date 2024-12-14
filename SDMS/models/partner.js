const mongoose=require("mongoose");

const partnerSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    status:{
        type:String,
        enum:["active","inactive"],
        default: "inactive"
    },
    currentLoad:{
        type:Number,
        default:0,
        max:3
    },
    areas:{
        type:String,
        default:"N/A"
    },
    shift:{
        start:{
            type:String,
            default:"9.00AM"
        },
        end:{
            type:String,
            default:"1.00PM"
        },
    },
    metrics:{
        rating:{
            type:Number,
            default:0,
        },
        completedOrders:{
            type:Number,
            default:0,
        },
        cancelledOrders:{
            type:Number,
            default:0,
        }
    },
})

module.exports=mongoose.model("Partner",partnerSchema);