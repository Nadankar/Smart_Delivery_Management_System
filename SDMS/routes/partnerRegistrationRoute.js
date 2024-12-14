const express=require("express");
const router = express.Router();
const Registration=require("../models/partnerRegistration");



router.post("/",async(req,res)=>{
    try{
        const newRegistration=new Registration(req.body);
        await newRegistration.save();
        res.status(201).json({ message: "Registration successful", data: newRegistration });


    }catch(error){
        res.status(500).json({message:"Error creating registration",error});

    }

})

module.exports = router;