const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: String,  
    orderNumber: String,  
    customer: {  
        name: String,
        phone: String,
        address: String,
    },
    area: String,
    items: [      
        {
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    scheduledFor: String,  
    status: {             
        type: String,
        enum: ["pending", "assigned", "picked", "delivered"],
        default: "pending",
    },
    scheduledFor: String,
    assignedTo: {       
        type:String,
        default: null,
    },

    totalAmount: {      
        type: Number,
        required: true,
    },
    createdAt: {          
        type: Date,
        default: Date.now,
    },
    updatedAt: {           
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);

