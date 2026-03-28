import { api } from "../../../config/api"

export async function generateReport({ resume, jobDescription, selfDescription }) {
    const formData = new FormData()
    formData.append("resume", resume)
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    const response = await api.post("/api/interview", formData)
    return response.data
}
