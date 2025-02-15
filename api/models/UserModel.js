import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
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
    // googleString: {
    //     type: String,
    //     default: ""
    // },
    
    isTeacher: {
        type: Boolean,
        // default: false
    },
    
    isFirstTime:{
        type: Boolean,
        default: true
    }
    // unique teacher password - gsfaculty
});

// Create and export the User model
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;