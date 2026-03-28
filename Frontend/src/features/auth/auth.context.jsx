import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Run once on app start to restore session
    useEffect(() => {
        getMe()
            .then(data => { if (data?.user) setUser(data.user) })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
