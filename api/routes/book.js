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

export default router;