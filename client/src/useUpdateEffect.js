import { useEffect } from 'react';

export function useUpdateEffect(callback, seconds) {
    useEffect(() => {
        const update = () => {
            if (!document.hidden)
                callback();
        };

        document.addEventListener('visibilitychange', update);
        const int = setInterval(update, seconds * 1000);

        return () => {
            document.removeEventListener('visibilitychange', update);
            clearInterval(int);
        }
    }, [callback, seconds]);
}