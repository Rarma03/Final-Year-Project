import express from "express";
import DataModel from "../models/DataModel.js";
import FlatRequestModel from "../models/FlatRequestModel.js";

const router = express.Router();

// Create a flat request
router.post("/", async (req, res) => {
    try {
        // console.log(req.body);
        const newFlatRequest = new FlatRequestModel(req.body);
        await newFlatRequest.save();

        const { userId } = req.body;

        const updatedUser = await DataModel.findOneAndUpdate(
            { userId: userId },
            { $push: { flatRequests: newFlatRequest._id } },
            { new: true }
        );

        res.status(201).json({ 
            message: "Flat request created", 
            newFlatRequest,
            updatedUser
        });
    } catch (err) {
        res.status(500).json({ 
            message: "Internal Server Error", 
            error: err.message 
        });
    }
});

// Get all flat - requests
router.get("/", async (req, res) => {
    try {
        const flats = await FlatRequestModel.find();
        res.status(200).json({ success: true, data: flats });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


export default router;
