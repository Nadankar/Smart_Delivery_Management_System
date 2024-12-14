const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    orderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    partnerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner",
        required: true,
    },
    timestamp: { 
        type: Date, 
        default: Date.now,
    },
    status: {   
        type: String,
        enum: ["success", "failed"],   
        required: true,
    },
    reason: { 
        type: String,
        default: null,
    },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
