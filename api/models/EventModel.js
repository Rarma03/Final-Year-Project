import mongoose from "mongoose";

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
    }
});

// Create and export the User model
const EventModel = mongoose.model('Event', EventSchema);
export default EventModel;