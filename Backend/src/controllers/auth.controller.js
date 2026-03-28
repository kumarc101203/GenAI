const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require ("../models/blacklist.model")
/**
 * @name registerUserController
 * @description register new user, expects username, email, password in body
 * @access public 
 */
async function registerUserController(req, res) {

    const {username, email, password} = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: "Please Provide Username, email & password" 
        })
    }

    const isUserAlreadyExisted = await userModel.findOne({
        $or: [{email}, {username}]
    })

    if(isUserAlreadyExisted){
        return res.status(409).json({
            message: "User Already Existed with this Email or Username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, 
        email, 
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d" }
    )

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" })

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
        token
    })

}

/**
 * @name loginUserController
 * @description login user, expects email, password in body
 * @access public
 */
async function loginUserController(req, res) {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "Please Provide email and password"
        })
    }

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(404).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d" }
    )

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" })

    res.status(200).json({
        message: "User Logged In Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * 
 * @name GET logoutUserController
 * @description clear token from user cookies and add token in blacklist
 * @access Public 
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User Logged out successfully"
    })
}

/**
 * 
 * @name GET getMeController
 * @description get user details from current logged in user details.
 * @access Private
 */
async function getMeController(req, res) {
    
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })      
}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}