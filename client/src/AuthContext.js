import React, { useCallback, useEffect, useMemo, useState } from 'react';

export const authContext = React.createContext();

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(() => {
        let user = sessionStorage.getItem('user') || localStorage.getItem('user');
        try {
            return JSON.parse(user)
        } catch (_) {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            const serialized = JSON.stringify(user);
            if (user.rememberLogin)
                localStorage.setItem('user', serialized);
            else
                sessionStorage.setItem('user', serialized);
        } else {
            sessionStorage.removeItem('user');
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = useCallback(({ rememberLogin }) => {
        setUser({
            admin: true,
            userId: 1,
            name: 'Müller',
            mail: 'mueller@example.com',
            rememberLogin,
        });
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        login,
        logout,
    }), [
        user, 
        login, 
        logout
    ]);

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}