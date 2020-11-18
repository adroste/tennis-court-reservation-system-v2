import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { authContext } from './AuthContext';

const defaultResFunc = (currentData, reqData, resData) => resData;

// WARNING: function reference to 'call' changes when 
// user.token or user.userId changes
export function useApi(
    {
        url,
        method = 'GET',
        // res must return new state
        // signature: (currentData, reqData, resData) => updatedData
        res = defaultResFunc,
    },
    setData,
    autoFetch = false
) {
    const { user, logout } = useContext(authContext) || {};
    const userToken = user?.token;
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);
    const lastCallRef = useRef(null);

    const call = useCallback((reqData, successCallback) => {
        if (lastCallRef.current)
            lastCallRef.current.cancel();

        let cancelled = false;

        const doFetch = async (reqData) => {
            setSuccess(false);
            setLoading(true);
            let is401 = false;
            try {
                const headers = {};
                if (userToken)
                    headers['Authorization'] = `Bearer ${userToken}`;
                if (reqData)
                    headers['Content-Type'] = 'application/json';

                const response = await fetch(url, {
                    method,
                    headers,
                    body: reqData ? JSON.stringify(reqData) : undefined,
                });
                if (cancelled) return;

                const resData = await response.json();
                if (cancelled) return;

                if (response.ok) {
                    setSuccess(true);
                    if (setData)
                        setData(data => res(data, reqData, resData));
                    if (successCallback)
                        successCallback();
                } else {
                    setError(resData);
                    is401 = response.status === 401;
                }
            } catch (err) {
                if (!cancelled)
                    setError(err);
            } finally {
                if (!cancelled)
                    setLoading(false);
                if (is401)
                    logout?.();
            }
        };

        const task = doFetch(reqData);
        task.cancel = () => cancelled = true;
        lastCallRef.current = task;
        return task.cancel;
    }, [
        method,
        res,
        setData,
        url,
        userToken,
        logout, // changes when user.userId changes
    ]);

    useEffect(() => {
        if (autoFetch && !lastCallRef.current)
            return call();
    }, [autoFetch, call])

    useEffect(() => {
        return () => lastCallRef.current?.cancel?.();
    }, []);

    return useMemo(() => ([
        {
            success,
            loading,
            error,
        },
        call, // see hint at top of file
    ]), [
        success,
        loading,
        error,
        call,
    ]);
}