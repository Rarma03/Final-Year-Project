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

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const userData = await DataModel.findOne({ userId });
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User data not found"
            });
        }

        // Derive counts from the arrays
        const bookCount = userData.booksUploaded.length;
        const jobPostCount = userData.jobPosts.length;
        const fundRaisingCount = userData.flatRequests.length;

        res.status(200).json({
            success: true,
            data: {
                bookCount,
                jobPostCount,
                fundRaisingCount
            }
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

router.get("/bookmarks/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing userId" });
        }
        const userData = await DataModel.findOne({ userId }).populate("booksBookmark");
        if (!userData) {
            return res.status(404).json({ success: false, message: "User data not found" });
        }
        return res.status(200).json({ success: true, data: userData });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;