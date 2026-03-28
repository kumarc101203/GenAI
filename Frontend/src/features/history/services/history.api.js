import { api } from "../../../config/api"

export const getHistory = async () => {
    const res = await api.get("/api/interview/history")
    return res.data
}

export const getReportById = async (id) => {
    const res = await api.get(`/api/interview/${id}`)
    return res.data
}
