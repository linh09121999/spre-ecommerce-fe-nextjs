'use client';

import { getRefreshTokenFromCookie } from '@/service/authentication/oAuth';
import { useState_ResOAuth } from '@/useState/useStateOAuth';
import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';

interface AuthContextType {
    token: string | null;
    handleLogin: (tokenData: any) => void; // Thay đổi để nhận toàn bộ token data
    handleLogOut: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { resOAuth, setResOAuth, clearOAuth, refreshAccessToken } = useState_ResOAuth();
    const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
    const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // Thời gian timeout (2 tiếng)
    const AUTO_LOGOUT_TIME = 2 * 60 * 60 * 1000;
    // Token hết hạn sau 5 phút (300 giây)
    const TOKEN_EXPIRY_TIME = 5 * 60 * 1000;

    useEffect(() => {
        // Kiểm tra nếu có refresh token trong cookie thì thử refresh
        const refreshToken = getRefreshTokenFromCookie();
        if (refreshToken) {
            // Thử refresh token khi component mount
            initializeToken();
        }
        
        return () => {
            // Cleanup timers khi component unmount
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
        };
    }, []);

    const initializeToken = async () => {
        try {
            const newToken = await refreshAccessToken();
            if (newToken) {
                startAutoRefresh();
                startLogoutTimer();
            }
        } catch (error) {
            console.error('Failed to initialize token:', error);
        }
    };

    const startAutoRefresh = () => {
        // Clear interval cũ nếu có
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
        }

        // Tự động refresh token trước khi hết hạn (4.5 phút)
        const refreshInterval = setInterval(async () => {
            try {
                await refreshAccessToken();
            } catch (error) {
                console.error('Auto refresh failed:', error);
                handleAutoLogout();
            }
        }, 4.5 * 60 * 1000); // 4.5 phút

        refreshIntervalRef.current = refreshInterval;
    };

    const startLogoutTimer = () => {
        // Clear timer cũ nếu có
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

        // Set timer mới cho logout sau 2 tiếng
        const timer = setTimeout(() => {
            handleAutoLogout();
        }, AUTO_LOGOUT_TIME);

        setLogoutTimer(timer);
    };

    const resetLogoutTimer = () => {
        startLogoutTimer();
    };

    const handleAutoLogout = () => {
        clearOAuth();
        
        // Clear timers
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
        }
        
        // Reload page để clear mọi state
        window.location.reload();
    };

    const handleLogin = (tokenData: any) => {
        // Lưu token data vào zustand (bao gồm cả refresh token vào cookie)
        setResOAuth(tokenData);
        
        // Bắt đầu auto refresh
        startAutoRefresh();
        
        // Bắt đầu logout timer
        startLogoutTimer();
    };

    const handleLogOut = () => {
        clearOAuth();
        
        // Clear timers
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
        }
        
        // Reload page
        window.location.reload();
    };

    // Lắng nghe sự kiện user activity để reset logout timer
    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        const handleUserActivity = () => {
            if (resOAuth?.access_token) {
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
    }, [resOAuth?.access_token]);

    // Lấy token từ zustand state
    const token = resOAuth?.access_token || null;
    const isAuthenticated = !!token;

    const value: AuthContextType = {
        token,
        handleLogin,
        handleLogOut,
        isAuthenticated,
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