import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Removes leading/trailing spaces
    }, // Title of the book
    semester: {
        type: Number,
    },
    branch: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
        enum: ["Computer Architecture and Organization", "Computer Networks", "Operating System", "Database Managment System", "Data Structure and Alogrithm", "Object Oriented Programming", "Software Engineering", "Theory of Computation", "Discrete Mathematics", "Cloud Computing", "Compiler Design", "Design and Analysis of Algorithm"]
    }, // Dropdown menu for subject selection
    tags: [{
        type: String
    }], // Tags for better categorization
    driveLink: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /https?:\/\/(drive\.google\.com|docs\.google\.com)\/.+/.test(value),
            message: "Invalid Google Drive link"
        }
    }, // Link to the user's Google Drive document

    verified: {
        type: Number, // 0 - teacher load , 1 - main section load, 2 - rejected
        default: 0
    }, // Whether the book is verified
    verifiedBy: {
        type: String,
        default: null
    }, // Name of the teacher who verified the book

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Reference to the user who uploaded the book

    // bookmarks: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'StudentModel'
    // }], // References to users who bookmarked the book

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }] // References to users who liked the book
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Book model
const BookModel = mongoose.model('BookModel', BookSchema);
export default BookModel;