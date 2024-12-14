const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find(); 
        res.json(orders); 
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
});

// Add a new order
router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body); 
        await newOrder.save(); 
        res.json(newOrder); 
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
});

//update order
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: "Error updating order", error });
    }
});


//delete order
router.delete("/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "order not found" });
        }
        res.json({ message: "order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
});


module.exports = router;
