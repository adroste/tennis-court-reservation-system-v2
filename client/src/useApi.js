import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { authContext } from './AuthContext';

const defaultSetFunc = ({ res }) => res;

// WARNING: function reference to 'call' changes when 
// user.token or user.userId changes
export function useApi(
    {
        url,
        method = 'GET',
        // res must return new state
        // signature: ({ cur, params, req, res }) => updatedData
        setFunc = defaultSetFunc,
    },
    setData,
    // autoFetch can be boolean or object like { reqParams, reqData }
    autoFetch = false,
) {
    const { user, logout } = useContext(authContext) || {};
    const userToken = user?.token;
    const [success, setSuccess] = useState(false);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(!!autoFetch);
    const [error, setError] = useState(null);
    const lastCallRef = useRef(null);

    // reqParams like { query: { example: 1 }, path: { id: 4 }}
    const call = useCallback((reqParams, reqData, successCallback) => {
        if (lastCallRef.current)
            lastCallRef.current.cancel();

        let cancelled = false;

        const doFetch = async () => {
            setSuccess(false);
            setStatus(null);
            setLoading(true);
            let is401 = false;
            try {
                let parameterizedUrl = Object.keys(reqParams?.path || {})
                    .reduce((acc, param) => acc.replace(`:${param}`, reqParams.path[param]), url);
                const queryString = Object.keys(reqParams?.query || {})
                    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(reqParams.query[key])}`)
                    .join('&');
                if (queryString)
                    parameterizedUrl += `?${queryString}`;
                
                const headers = {};
                if (userToken)
                    headers['Authorization'] = `Bearer ${userToken}`;
                if (reqData)
                    headers['Content-Type'] = 'application/json';

                const response = await fetch(parameterizedUrl, {
                    method,
                    headers,
                    body: reqData ? JSON.stringify(reqData) : undefined,
                });
                if (cancelled) return;

                setStatus(response.status);

                const resData = await response.json();
                if (cancelled) return;

                if (response.ok) {
                    setSuccess(true);
                    if (setData)
                        setData(cur => setFunc({
                            cur, 
                            params: reqParams,
                            req: reqData, 
                            res: resData,
                        }));
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

        const task = doFetch();
        task.cancel = () => cancelled = true;
        lastCallRef.current = task;
        return task.cancel;
    }, [
        logout, // changes when user.userId changes
        method,
        setData,
        setFunc,
        url,
        userToken,
    ]);

    useEffect(() => {
        if (autoFetch && !lastCallRef.current)
            call(autoFetch?.reqParams, autoFetch?.reqData);
    }, [autoFetch, call])

    useEffect(() => {
        return () => lastCallRef.current?.cancel?.();
    }, []);

    return useMemo(() => ([
        {
            success,
            loading,
            error,
            status,
        },
        call, // see hint at top of file
    ]), [
        success,
        loading,
        error,
        status,
        call,
    ]);
}