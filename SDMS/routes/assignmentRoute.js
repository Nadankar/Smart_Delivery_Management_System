const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignment");

router.get("/", async (req, res) => {
    try {
        const assignments = await Assignment.find(); 
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving assignments", error });
    }
});

router.post("/", async (req, res) => {
    try {
        const newAssignment = new Assignment(req.body); 
        await newAssignment.save(); 
        res.json(newAssignment); 
    } catch (error) {
        res.status(500).json({ message: "Error creating assignment", error });
    }
});

// Update an assignment
router.put("/:id", async (req, res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAssignment);
    } catch (error) {
        res.status(400).json({ message: "Error updating assignment", error });
    }
});


//delete assignment
router.delete("/:id", async (req, res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!deletedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting assignment", error });
    }
});


module.exports = router;
