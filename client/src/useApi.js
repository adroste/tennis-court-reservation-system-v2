import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const defaultResFunc = (currentData, reqData, resData) => resData;

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
    // todo auth context bearer token
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);
    const lastCallRef = useRef();

    const call = useCallback((reqData) => {
        if (lastCallRef.current)
            lastCallRef.current.cancel();

        let cancelled = false;

        const doFetch = async (reqData) => {
            setLoading(true);
            setSuccess(false);
            try {
                const response = await fetch(url, {
                    method,
                    headers: reqData ? {
                        'Content-Type': 'application/json'
                    } : undefined,
                    body: reqData ? JSON.stringify(reqData) : undefined,
                });
                if (cancelled) return;

                const resData = await response.json();
                if (cancelled) return;

                if (response.ok) {
                    setSuccess(true);
                    if (setData)
                        setData(data => res(data, reqData, resData));
                } else {
                    setError(resData);
                }
            } catch (err) {
                if (!cancelled)
                    setError(err);
            } finally {
                if (!cancelled)
                    setLoading(false);
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
    ]);

    useEffect(() => {
        if (autoFetch)
            return call();
    }, [autoFetch, call])

    return useMemo(() => ([
        {
            success,
            loading,
            error,
        },
        call,
    ]), [
        success,
        loading,
        error,
        call,
    ]);
}