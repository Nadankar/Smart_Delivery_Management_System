const express = require("express");
const router = express.Router();
const AssignmentMetrics = require("../models/assignmentMetrics");

router.get("/", async (req, res) => {
    try {
        const assignmentMetrics = await AssignmentMetrics.find(); 
        res.status(200).json(assignmentMetrics); 
    } catch (error) {
        res.status(500).json({ message: "Error retrieving assignment metrics", error }); 
    }
});

router.post("/", async (req, res) => {
    try {
        const newAssignmentMetric = new AssignmentMetrics(req.body);
        await newAssignmentMetric.save(); 
        res.status(201).json(newAssignmentMetric); 
    } catch (error) {
        res.status(400).json({ message: "Error creating assignment metric", error }); 
    }
});

// Update assignment metrics
router.put("/:id", async (req, res) => {
    try {
        const updatedAssignmentMetrics = await AssignmentMetrics.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAssignmentMetrics);
    } catch (error) {
        res.status(400).json({ message: "Error updating assignment metrics", error });
    }
});


//delete assignmentMetric
router.delete("/:id", async (req, res) => {
    try {
        const deletedAssignmentMetric = await AssignmentMetric.findByIdAndDelete(req.params.id);
        if (!deletedAssignmentMetric) {
            return res.status(404).json({ message: "assignmentmetric not found" });
        }
        res.json({ message: "AssignmentMetric deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting AssignmentMetric", error });
    }
});


module.exports = router;
