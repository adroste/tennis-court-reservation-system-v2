import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

const checkIntervalMs = 60000; // minute

export function useTime(unit) {
    const [time, setTime] = useState(() => dayjs.tz());

    useEffect(() => {
        const interval = setInterval(() => {
            const newTime = dayjs.tz();
            if (!time.isSame(newTime, unit))
                setTime(newTime);
        }, checkIntervalMs);

        return () => clearInterval(interval);
    }, [time, unit]);

    return time;
}