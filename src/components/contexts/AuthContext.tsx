
// contexts/AuthContext.tsx
'use client';
import { useState_ResOAuth } from '@/useState/useStateOAuth';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react'

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { resOAuth, refreshToken } = useState_ResOAuth()
    const [token, setToken] = useState<string | null>(resOAuth?.access_token || null)

    // Auto-refresh timer
    useEffect(() => {
        if (!resOAuth) return

        const expiresIn = resOAuth.expires_in * 1000
        const timeout = setTimeout(async () => {
            await refreshToken()
            setToken(useState_ResOAuth.getState().resOAuth?.access_token || null)
        }, expiresIn - 10_000) // refresh 10s trước khi hết hạn

        return () => clearTimeout(timeout)
    }, [resOAuth])

    const refreshAccessToken = async () => {
        await refreshToken()
        setToken(useState_ResOAuth.getState().resOAuth?.access_token || null)
    }

    const value: AuthContextType = {
        token,
        isAuthenticated: !!token,
        refreshAccessToken
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
