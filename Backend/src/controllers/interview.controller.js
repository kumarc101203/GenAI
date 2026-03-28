const { PDFParse } = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service.js")
const interviewReportModel = require("../models/interviewReport.model.js")

async function generateInterviewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body

        let resumeText = ""
        if (req.file) {
            const parser = new PDFParse({ data: req.file.buffer })
            const pdfData = await parser.getText()
            resumeText = pdfData.text
        }

        if (!resumeText && !selfDescription) {
            return res.status(400).json({ message: "Either a resume or self description is required" })
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resumeText,
            selfDescription,
            jobDescription,
            matchScore: interViewReportByAi.matchScore,
            strengths: interViewReportByAi.strengths,
            weaknesses: interViewReportByAi.weaknesses,
            suggestions: interViewReportByAi.suggestions,
            technicalQuestions: interViewReportByAi.technicalQuestions,
            behavioralQuestions: interViewReportByAi.behavioralQuestions,
            skillGapAnalysis: interViewReportByAi.skillGaps,
            preparationPlan: interViewReportByAi.preparationPlan,
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getHistoryController(req, res) {
    try {
        const reports = await interviewReportModel
            .find({ user: req.user.id })
            .select("jobDescription matchScore createdAt selfDescription")
            .sort({ createdAt: -1 })
        res.status(200).json({ reports })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getReportByIdController(req, res) {
    try {
        const report = await interviewReportModel.findOne({ _id: req.params.id, user: req.user.id })
        if (!report) return res.status(404).json({ message: "Report not found" })
        res.status(200).json({ report })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { generateInterviewReportController, getHistoryController, getReportByIdController }

