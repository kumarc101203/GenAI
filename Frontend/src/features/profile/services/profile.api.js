import { api } from "../../../config/api"

export const getProfile = async () => {
    const res = await api.get("/api/profile")
    return res.data
}

export const updateProfile = async (data) => {
    const res = await api.put("/api/profile", data)
    return res.data
}
