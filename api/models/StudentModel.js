import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"] // Basic email validation
    },
    password: {
        type: String,
        required: true
    },
    accessLevel: {
        type: Number, // 1 - student, 2 - alumni
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    enrollmentNumber: {
        type: String,
        unique: true,
        trim: true
    },
    booksUploaded: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookModel'
    }], // References to books uploaded by the student
    jobPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobModel'
    }] // References to job posts created by the student/alumni
});

const StudentModel = mongoose.model('StudentModel', StudentSchema);
export default StudentModel;