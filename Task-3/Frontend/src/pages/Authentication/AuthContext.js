import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check local storage for authentication status and expiration time
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        const expirationTime = localStorage.getItem('authExpirationTime');

        if (storedAuthStatus === 'true' && expirationTime && new Date().getTime() < expirationTime) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('authExpirationTime');
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        const expirationTime = new Date().getTime() + 36 * 60 * 60 * 1000; // 36 hours from now
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authExpirationTime', expirationTime);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authExpirationTime');
        window.location.href = '/signinout'; // Redirect to sign-in page
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
