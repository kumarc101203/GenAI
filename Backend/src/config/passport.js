const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const GitHubStrategy = require("passport-github2").Strategy
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ email: profile.emails[0].value })

        if (!user) {
            user = await userModel.create({
                username:  profile.displayName.replace(/\s+/g, "_").toLowerCase() + "_" + profile.id.slice(-4),
                email:     profile.emails[0].value,
                fullName:  profile.displayName,
                password:  "oauth_" + profile.id,
                avatar:    profile.photos?.[0]?.value || ""
            })
        }

        return done(null, user)
    } catch (err) {
        return done(err, null)
    }
}))

passport.use(new GitHubStrategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  "/api/auth/github/callback",
    scope:        ["user:email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`
        let user = await userModel.findOne({ email })

        if (!user) {
            user = await userModel.create({
                username:  profile.username + "_" + profile.id.toString().slice(-4),
                email,
                fullName:  profile.displayName || profile.username,
                password:  "oauth_" + profile.id,
                avatar:    profile.photos?.[0]?.value || ""
            })
        }

        return done(null, user)
    } catch (err) {
        return done(err, null)
    }
}))

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

module.exports = passport
