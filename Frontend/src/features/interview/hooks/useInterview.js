import { useState } from "react"
import { useNavigate } from "react-router"
import { generateReport } from "../services/interview.api"

export const useInterview = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleGenerateReport = async ({ resume, jobDescription, selfDescription }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await generateReport({ resume, jobDescription, selfDescription })
            navigate("/report", { state: { report: data.interviewReport } })
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, handleGenerateReport }
}
