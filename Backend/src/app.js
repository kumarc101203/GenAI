const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const passport = require("./config/passport")

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))
app.use(passport.initialize())

/* requires all the rotes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")
const profileRouter = require("./routes/profile.routes")

/* Using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/profile", profileRouter)


module.exports = app