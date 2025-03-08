import express from "express";
import InterviewExpModel from "../models/InterviewExpModel.js";

const router = express.Router();

// Create an interview experience
router.post("/create", async (req, res) => {
    try {
        const { companyName, role, interviewRounds, interviewRoundsDescription, salary, interviewDifficulty, city, jobType, linkedinUrl, postedBy } = req.body;

        if (!companyName || !role || !salary || !postedBy) {
            return res.status(400).json({ error: "Company name, role, salary, and user ID are required." });
        }

        const newInterview = new InterviewExpModel({
            companyName,
            role,
            interviewRounds,
            interviewRoundsDescription,
            salary,
            interviewDifficulty,
            city,
            jobType,
            linkedinUrl,
            postedBy,
        });

        await newInterview.save();
        res.status(201).json({ message: "Interview experience submitted successfully!" });
    } catch (error) {
        console.error("Error saving interview experience:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// GET /api/interview/search
router.get("/search", async (req, res) => {
    try {
        const { q = "", company = "", sort = "", page = 1, limit = 20 } = req.query;

        const query = {};

        // If a search query is provided, search in companyName and role (case-insensitive)
        if (q) {
            query.$or = [
                { companyName: { $regex: q, $options: "i" } },
                { role: { $regex: q, $options: "i" } }
            ];
        }

        // Filter by company if provided
        if (company) {
            query.companyName = { $regex: company, $options: "i" };
        }

        // Set up sort options
        let sortOptions = {};
        if (sort === "date_desc") {
            // Assuming you want to sort by interviewDate descending
            sortOptions = { interviewDate: -1 };
        } else if (sort === "date_asc") {
            sortOptions = { interviewDate: 1 };
        } else {
            // Default sorting by createdAt descending
            sortOptions = { createdAt: -1 };
        }

        // Convert page and limit to integers
        const pageInt = parseInt(page);
        const limitInt = parseInt(limit);
        const skip = (pageInt - 1) * limitInt;

        // Get total matching documents for pagination calculation
        const total = await InterviewExpModel.countDocuments(query);

        // Fetch paginated results
        const experiences = await InterviewExpModel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitInt);

        const totalPages = Math.ceil(total / limitInt);

        return res.json({
            success: true,
            data: experiences,
            page: pageInt,
            pages: totalPages,
            total,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// GET interview experience details by ID
router.get("/:id", async (req, res) => {
    try {
        const interview = await InterviewExpModel.findById(req.params.id);
        if (!interview) {
            return res.status(404).json({ error: "Interview experience not found" });
        }
        console.log(interview);
        res.json(interview);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;