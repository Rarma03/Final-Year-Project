import express from "express";
import DataModel from "../models/DataModel.js";
import UserModel from "../models/UserModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, ...formData } = req.body;
        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userInfo = user.isTeacher
            ? { userId: userId, department: formData.department, subjects: formData.subjects }
            : { userId: userId, graduationYear: formData.graduationYear, branch: formData.branch, enrollmentNumber: formData.enrollmentNumber };
        
        const userData = new DataModel(userInfo);
        await userData.save();

        // Update the isFirstTime field to false
        user.isFirstTime = false;
        await user.save();
        
        res.status(201).json({ message: "User info added", userData });
    } catch (err) {
        // res.status(500).json({ message: "Internal Server Error" });
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

export default router;