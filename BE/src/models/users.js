import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    access_Token: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    bio: {
        type: String
    },
    refresh_Token: {
        type: String, 
        required: true
    }},
    {
        timestamps: true
    }
)
const UserModel = mongoose.model("users", userSchema);
export default UserModel;