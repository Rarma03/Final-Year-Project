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

// Route to get flat requests created by a specific user
router.get('/my/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const myFlats = await FlatRequestModel.find({ userId });
        res.status(200).json({ success: true, data: myFlats });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

// Route to delete a flat request by its ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFlat = await FlatRequestModel.findByIdAndDelete(id);
        if (!deletedFlat) {
            return res.status(404).json({ message: 'Flat request not found' });
        }
        res.status(200).json({ message: 'Flat request deleted successfully', data: deletedFlat });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

export default router;
