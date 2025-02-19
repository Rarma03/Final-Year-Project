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

// GET /api/books/search?q=searchString
// GET /api/book/search?q=...&subject=...&page=...&limit=...
router.get("/search", async (req, res) => {
    try {
        const { q, subject, page, limit } = req.query;
        const criteria = { verified: 1 }; // Only accepted books

        // If a search query exists, add OR conditions
        if (q && q.trim().length > 0) {
            const searchRegex = new RegExp(q.trim(), "i");
            criteria.$or = [
                { title: searchRegex },
                { subject: searchRegex },
                { tags: { $in: [searchRegex] } }
            ];
        }

        // If a subject filter is provided, override subject criteria
        if (subject) {
            criteria.subject = subject;
        }

        // Pagination defaults
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;
        const skipNum = (pageNum - 1) * limitNum;

        const books = await BookModel.find(criteria)
            .sort({ createdAt: -1 })
            .skip(skipNum)
            .limit(limitNum)
            .populate("uploadedBy", "name email"); // Optional: include uploader info

        const totalBooks = await BookModel.countDocuments(criteria);

        res.status(200).json({
            success: true,
            data: books.map(book => ({
                ...book._doc,
                likesCount: book.likes.length
            })),
            total: totalBooks,
            page: pageNum,
            pages: Math.ceil(totalBooks / limitNum)
        });
    } catch (error) {
        console.error("Error searching books:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// PATCH /api/book/:bookId/like
router.patch("/:bookId/like", async (req, res) => {
    try {
        const { bookId } = req.params;
        const { userId } = req.body;

        // $addToSet will add userId only if it's not already in the likes array
        const updatedBook = await BookModel.findByIdAndUpdate(
            bookId,
            { $addToSet: { likes: userId } },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        console.error("Error updating like:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
});

export default router;