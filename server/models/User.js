import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
    },
    lastName: {
        type: String,
        trim: true,
        max: 50,
    },
    username: {
        type: String,
        unique: [true, 'Username exist']
    },
    email: {
        type: String,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        unique: [true, "Email exist"],
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    birthday: {
        type: Date,
        default: Date.now,
    },
    gender: String,
    profilePicturePath: {
        type: String,
        default: "",
    },
    bio: String,
    followers: {
        type: Map,
        of: Boolean,
    },
    following: {
        type: Map,
        of: Boolean,
    },
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;