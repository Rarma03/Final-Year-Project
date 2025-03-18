import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    tag: {
        type: String,
        enum: ['Q&A', 'Advice', 'Tutorial', 'Discussion', 'Review', 'Experience', 'Complain'],
        required: true
    },
    upvote: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    dowvote: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }],
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now, expire: 24 * 60 * 60 * 15 }
});

const CommunityModel = mongoose.model('Community', PostSchema);
export default CommunityModel;