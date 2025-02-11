import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true }, // expects a Google Maps link
        genderPreference: {
            type: String,
            enum: ["any", "male", "female"],
            default: "any"
        },
        rent: { type: Number },
        moveInDate: { type: Date },
        contactInfo: { type: String, required: true }
    },
    { timestamps: true } // automatically adds createdAt and updatedAt fields
);

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;