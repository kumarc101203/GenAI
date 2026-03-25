const mongoose = require("mongoose")


const userScheme = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required: true,
    },

    email:{
        type:String,
        unique:[true,"Account already exist with this email"],
        required: true,
    },

    password: {
        type:String,
        unique:[true,"Password is already used"],
        required: true,
    }
})

const userModel = mongoose.model("users", userScheme)

module.exports = userModel