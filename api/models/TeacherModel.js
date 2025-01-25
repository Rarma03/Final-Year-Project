import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes leading/trailing spaces
    }, // Teacher's full name
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    subjects: {
        type: [String], // Array of subjects chosen by the teacher
        required: true,
        enum: [
            "Computer Architecture and Organization",
            "Computer Networks",
            "Operating System",
            "Database Management System",
        ]
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Teacher model
const TeacherModel = mongoose.model('TeacherModel', TeacherSchema);
export default TeacherModel;