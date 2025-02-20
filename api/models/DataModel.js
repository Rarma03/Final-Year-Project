import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            // type: String,
            required: true,
        },

        // Teacher-specific fields
        department: {
            type: String,
            default: "Not Provided",
        },

        subjects: {
            type: [String],
            // Default to an empty array when not provided
            default: [],
            // Allowed subjects (each element of the array must be one of these)
            enum: ["Computer Architecture and Organization", "Computer Networks", "Operating System", "Database Management System", "Data Structure and Algorithm", "Object Oriented Programming", "Software Engineering", "Theory of Computation", "Discrete Mathematics", "Cloud Computing", "Compiler Design", "Design and Analysis of Algorithm"],
        },

        // Student-specific fields        
        graduationYear: {
            type: Number,
        },
        branch: {
            type: String,
        },
        enrollmentNumber: {
            type: String,
            // unique: true
        },

        // other model references
        booksUploaded: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BookModel",
            },
        ],
        jobPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JobpostModel",
            },
        ],
        flatRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FlatRequestModel",
            },
        ],
        booksBookmark: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BookModel",
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// Create and export the combined model with the updated name "DataModel"
const DataModel = mongoose.model("DataModel", DataSchema);
export default DataModel;