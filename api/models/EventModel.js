import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    posterLink: {
        type: String,
        required: true,
        trim: true,
    },
    registerLink: {
        type: String,
        trim: true,
    },
    instagramLink: {
        type: String,
        trim: true,
    },
    view: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: 60 * 60 * 24 * 7  => delete post after 7 days (in seconds)
    },
});

const EventModel = mongoose.model('Event', EventSchema);
export default EventModel;