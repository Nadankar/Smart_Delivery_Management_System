const mongoose=require("mongoose");

const assignmentMetricsSchema = new mongoose.Schema({
    totalAssigned: {  
        type: Number,
        default: 0,
    },
    successRate: {
        type: Number,
        default: 0,
    },
    averageTime: {  
        type: Number,
        default: 0,  
    },
    failureReasons: [
        {   
            reason: String,
            count: Number,
        },
    ],
});

module.exports = mongoose.model("AssignmentMetrics", assignmentMetricsSchema);
