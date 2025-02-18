import mongoose from 'mongoose';

const FlatRequestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    genderPreference: {
        type: String,
        enum: ['any', 'male', 'female'],
        default: 'any',
    },
    rent: {
        type: Number,
        required: true,
    },
    moveInDate: {
        type: Date,
        required: true
    },
    contactInfo: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

// Create and export the FlatRequest model
const FlatRequestModel = mongoose.model('FlatRequestModel', FlatRequestSchema);
export default FlatRequestModel;