import mongoose from "mongoose";

const JobpostSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: String,
        default: "NA",
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // Reference to the user (student/alumni) who posted the job
        required: true
    }, // Links the job post to the user who created it
    isActive: {
        type: Boolean,
        default: true
    }, // Indicates if the job post is active or inactive (can be toggled by the user)
    createdAt: {
        type: Date,
        default: Date.now
    }, // Timestamp for when the job post was created
});

// Middleware to automatically update `updatedAt` before saving
// JobpostSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// Create and export the Jobpost model
const JobpostModel = mongoose.model('JobpostModel', JobpostSchema);
export default JobpostModel;