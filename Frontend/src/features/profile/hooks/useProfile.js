import { useState, useEffect } from "react"
import { getProfile, updateProfile } from "../services/profile.api"

export const useProfile = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        getProfile()
            .then(data => setProfile(data.user))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const handleSave = async (formData) => {
        setSaving(true)
        setError(null)
        setSuccess(false)
        try {
            const data = await updateProfile(formData)
            setProfile(data.user)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save")
        } finally {
            setSaving(false)
        }
    }

    return { profile, loading, saving, error, success, handleSave }
}
