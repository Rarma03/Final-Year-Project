import mongoose from "mongoose";

const InterviewExpSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    interviewRounds: {
        type: Number,
        trim: true,
    },
    interviewRoundsDescription: {
        type: String,
        default: "NA",
        trim: true
    },
    interviewDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: String,
        default: "Not Mentioned",
        trim: true
    },
    interviewDifficulty: {
        type: String,
        trim: true,
        default: "Medium",
        enum: ["Easy", "Medium", "Hard", "Difficult"]
    },
    city: {
        type: String,
        default: "PAN India",
        trim: true
    },
    jobType: {
        type: String,
        trim: true,
        enum: ["Full-Time", "Intern", "Intern + FT"]
    },
    linkedinUrl: {
        type: String,
        trim: true
    },
    uploaderName: {
        type: String,
        trim: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // Reference to the user (student/alumni) who posted the Exp
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Create and export the Jobpost model
const InterviewExpModel = mongoose.model('InterviewExpModel', InterviewExpSchema);
export default InterviewExpModel;