import mongoose from "mongoose";

const JobpostSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        default: "NA",
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: String,
        default: "Competitive Salary",
        required: true,
        trim: true
    },
    city: {
        type: String,
        default: "As Per Business Req.",
        trim: true
    },
    jobLink: {
        type: String,
        trim: true
    },
    jobType: {
        type: String,
        trim: true,
        enum: [
            "Full-Time", "Intern", "Part-Time"
        ]
    },
    linkedinUrl: {
        type: String,
        trim: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // Reference to the user (student/alumni) who posted the job
        required: true
    }, // Links the job post to the user who created it
    createdAt: {
        type: Date,
        default: Date.now
    }, // Timestamp for when the job post was created
});

// Create and export the Jobpost model
const JobpostModel = mongoose.model('JobpostModel', JobpostSchema);
export default JobpostModel;