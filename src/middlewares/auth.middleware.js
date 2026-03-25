const jwt = require("jsonwebtoken")



function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ 
            message: "Access denied. No token provided." 
        })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET) 

        req.user = decode

        next()

    } catch (err) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }

}

module.exports = { authUser }