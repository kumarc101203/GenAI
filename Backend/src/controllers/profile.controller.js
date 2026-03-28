const userModel = require("../models/user.model")

async function getProfileController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        res.status(200).json({ user })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function updateProfileController(req, res) {
    try {
        const allowed = ["fullName", "phone", "gender", "dateOfBirth", "bio", "location",
                         "website", "linkedin", "github", "twitter", "jobTitle", "company",
                         "experience", "skills", "education", "username", "avatar"]

        const updates = {}
        for (const key of allowed) {
            if (req.body[key] !== undefined) updates[key] = req.body[key]
        }

        const user = await userModel.findByIdAndUpdate(req.user.id, updates, { new: true })
        res.status(200).json({ message: "Profile updated successfully", user })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getProfileController, updateProfileController }
