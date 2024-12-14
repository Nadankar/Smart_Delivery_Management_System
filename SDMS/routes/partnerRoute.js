const express = require("express");
const router = express.Router();
const Partner = require("../models/Partner");

router.get("/", async (req, res) => {
    try {
        const partners = await Partner.find(); 
        res.status(200).json(partners); 
    } catch (error) {
        res.status(500).json({ message: "Error retrieving partners", error }); 
    }
});

//new partner
router.post("/", async (req, res) => {
    try {
        const newPartner = new Partner(req.body); 
        await newPartner.save(); 
        res.status(201).json(newPartner); 
    } catch (error) {
        res.status(500).json({ message: "Error creating partner", error }); 
    }
});

// Update a partner
router.put("/:id", async (req, res) => {
    try {
        const updatedPartner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPartner);
    } catch (error) {
        res.status(400).json({ message: "Error updating partner", error });
    }
});


//delete a partner
router.delete("/:id", async (req, res) => {
    try {
        const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
        if (!deletedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }
        res.json({ message: "Partner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting partner", error });
    }
});

module.exports = router;
