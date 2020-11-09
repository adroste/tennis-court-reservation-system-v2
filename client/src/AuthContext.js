import React, { useEffect, useState } from 'react';

export const authContext = React.createContext();

export function AuthContextProvider({ children }) {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        (async () => {
            setAuth({
                userId: 1,
                name: 'Müller',
                mail: 'mueller@example.com',
            });
        })();
    }, []);

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}