// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    handleLogin: (token: string) => void;
    handleLogOut: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
    // Thời gian timeout (30 phút)
    const AUTO_LOGOUT_TIME = 12 * 60 * 60 * 1000; // 2 tieng phút

    useEffect(() => {
        // Kiểm tra token từ localStorage khi component mount
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            startLogoutTimer();
        }
    }, []);

    const startLogoutTimer = () => {
        // Clear timer cũ nếu có
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

        // Set timer mới
        const timer = setTimeout(() => {
            handleAutoLogout();
        }, AUTO_LOGOUT_TIME);

        setLogoutTimer(timer);
    };


    const resetLogoutTimer = () => {
        startLogoutTimer();
    };

    const handleAutoLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        window.location.reload();

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    const handleLogin = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        startLogoutTimer();
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        window.location.reload();

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    // Lắng nghe sự kiện user activity để reset timer
    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        const handleUserActivity = () => {
            if (token) {
                resetLogoutTimer();
            }
        };

        events.forEach(event => {
            document.addEventListener(event, handleUserActivity);
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleUserActivity);
            });
        };
    }, [token]);

    const value: AuthContextType = {
        token,
        handleLogin,
        handleLogOut,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};