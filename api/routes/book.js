import express from "express";
import BookModel from "../models/BookModel.js";
import DataModel from "../models/DataModel.js";

const router = express.Router();

// Create a new book document and update the user's DataModel document
router.post("/", async (req, res) => {
    try {
        // Extract data from the request body
        const bookData = req.body;

        // Create a new instance of the BookModel
        const newBook = new BookModel(bookData);

        // Save the new book to the database
        await newBook.save();

        // Update the DataModel for the user by pushing the new book's _id into booksUploaded
        await DataModel.findOneAndUpdate(
            { userId: newBook.uploadedBy },
            { $push: { booksUploaded: newBook._id } },
            { new: true }
        );

        // Respond with the newly created book
        res.status(201).json({
            success: true,
            message: "Book created successfully and added to user profile",
            data: newBook,
        });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: error.message,
        });
    }
});

// GET pending books for a teacher (using teacher's userId)
router.get("/pending/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        // Find the teacher's data by userId in DataModel
        const teacherData = await DataModel.findOne({ userId });
        if (!teacherData) {
            return res.status(404).json({ success: false, message: "Teacher data not found" });
        }
        const teacherSubjects = teacherData.subjects; // Array of subjects

        // Find all books with verified status 0 and subject in teacherSubjects
        const pendingBooks = await BookModel.find({
            verified: 0,
            subject: { $in: teacherSubjects },
        });
        res.status(200).json({ success: true, data: pendingBooks });
    } catch (error) {
        console.error("Error fetching pending books:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// PUT route to update book status (accept/decline)
router.put("/:bookId/status", async (req, res) => {
    try {
        const { bookId } = req.params;
        const { status, verifiedBy } = req.body; // status: 1 (accept) or 2 (decline)

        const updatedBook = await BookModel.findByIdAndUpdate(
            bookId,
            { verified: status, verifiedBy },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        console.error("Error updating book status:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

export default router;