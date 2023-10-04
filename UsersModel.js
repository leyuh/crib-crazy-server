import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mostRecentRatings: [{
        type: Number
    }],
    level: {
        type: Number,
        required: true
    },
    hitCount: {
        type: Number,
        required: true
    },
    missCount: {
        type: Number,
        required: true
    },
    currHitStreak: {
        type: Number,
        required: true
    },
    longestHitStreak: {
        type: Number,
        required: true
    },
    highestThrowScore: {
        type: Number,
        required: true
    },
    accountCreationDate: {
        type: Date,
        required: true
    },
    currTheme: {
        type: String,
        required: true
    }
})

const UsersModel = mongoose.model("users", UserSchema);
export default UsersModel;