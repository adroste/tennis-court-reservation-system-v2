import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { postLoginApi, postLogoutApi } from './api';

import { useApi } from './useApi';

const TOKEN_NAME = 'usertoken';

export const authContext = React.createContext();

export function AuthContextProvider({ children }) {

    const [user, _setUser] = useState(null);
    const rememberLoginRef = useRef(false);

    const setUser = useCallback(getResult => {
        _setUser(data => {
            const newData = getResult(data);
            if (newData?.token) {
                if (rememberLoginRef.current)
                    localStorage.setItem(TOKEN_NAME, newData.token);
                else
                    sessionStorage.setItem(TOKEN_NAME, newData.token);
            }
            return newData;
        });
    }, []);

    const [autoLoginState, postLogin] = useApi(postLoginApi, setUser);
    const [, postLogout] = useApi(postLogoutApi);

    useEffect(() => {
        const token = sessionStorage.getItem(TOKEN_NAME) || localStorage.getItem(TOKEN_NAME);
        if (token)
            postLogin({
                type: 'token',
                token,
            });
    }, [postLogin]);

    const setRememberLogin = useCallback(rememberLogin => {
        rememberLoginRef.current = rememberLogin;
    }, []);

    const logout = useCallback(() => {
        postLogout({
            userId: user?.userId,
        });
        _setUser(null);
        sessionStorage.removeItem(TOKEN_NAME);
        localStorage.removeItem(TOKEN_NAME);
    }, [postLogout, user]);

    const value = useMemo(() => ({
        autoLoginState,
        logout,
        setRememberLogin,
        setUser,
        user,
    }), [
        autoLoginState,
        logout,
        setRememberLogin,
        setUser,
        user,
    ]);

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}