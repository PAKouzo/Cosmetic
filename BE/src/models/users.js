import mongoose from "mongoose";
import Collections from '../database/collections.js'

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
        required: false
    },
    refresh_Token: {
        type: String, 
        required: false
    }},
    {
        timestamps: true
    }
)
const UserModel = mongoose.model(Collections.USERS, userSchema);
export default UserModel;