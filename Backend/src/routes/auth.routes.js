const {Router} = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const passport = require("../config/passport")
const jwt = require("jsonwebtoken")

const authRouter = Router()

authRouter.post("/register", authController.registerUserController)
authRouter.post("/login",    authController.loginUserController)
authRouter.get("/logout",    authController.logoutUserController)
authRouter.get("/me",        authMiddleware.authUser, authController.getMeController)

// ── Google OAuth ──────────────────────────────────────────────────
authRouter.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
)

authRouter.get("/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed` }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id, username: req.user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.cookie("token", token, { httpOnly: true, sameSite: "lax" })
        res.redirect(`${process.env.CLIENT_URL}/dashboard`)
    }
)

// ── GitHub OAuth ──────────────────────────────────────────────────
authRouter.get("/github",
    passport.authenticate("github", { scope: ["user:email"], session: false })
)

authRouter.get("/github/callback",
    passport.authenticate("github", { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=github_failed` }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id, username: req.user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.cookie("token", token, { httpOnly: true, sameSite: "lax" })
        res.redirect(`${process.env.CLIENT_URL}/dashboard`)
    }
)

module.exports = authRouter