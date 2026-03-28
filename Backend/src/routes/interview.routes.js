const express = require("express")
const multer = require("multer")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")

const upload = multer({ storage: multer.memoryStorage() })

const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @description generate a new interview report based on the candidate's resume pdf, self-description, and the job description.
 * @access Private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)
interviewRouter.get("/history", authMiddleware.authUser, interviewController.getHistoryController)
interviewRouter.get("/:id", authMiddleware.authUser, interviewController.getReportByIdController)

module.exports = interviewRouter

