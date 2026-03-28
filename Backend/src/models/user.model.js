const mongoose = require("mongoose")


const userScheme = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "Username already taken"],
        required: true,
    },
    email:{
        type: String,
        unique: [true, "Account already exist with this email"],
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    // Profile fields
    fullName:    { type: String, default: "" },
    phone:       { type: String, default: "" },
    gender:      { type: String, enum: ["male", "female", "non-binary", "prefer-not-to-say", ""], default: "" },
    dateOfBirth: { type: String, default: "" },
    bio:         { type: String, default: "" },
    location:    { type: String, default: "" },
    website:     { type: String, default: "" },
    linkedin:    { type: String, default: "" },
    github:      { type: String, default: "" },
    twitter:     { type: String, default: "" },
    jobTitle:    { type: String, default: "" },
    company:     { type: String, default: "" },
    experience:  { type: String, enum: ["0-1", "1-3", "3-5", "5-10", "10+", ""], default: "" },
    skills:      [{ type: String }],
    education:   { type: String, default: "" },
    avatar:      { type: String, default: "" },
}, { timestamps: true })

const userModel = mongoose.model("users", userScheme)

module.exports = userModel