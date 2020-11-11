import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

const checkTodayChangeIntervalMs = 60000; // minute

export function useToday() {
    const [today, setToday] = useState(dayjs());

    // check peridically if today's date changed
    useEffect(() => {
        const todayCheckInterval = setInterval(() => {
            const newToday = dayjs();
            if (!today.isSame(newToday, 'day'))
                setToday(newToday);
        }, checkTodayChangeIntervalMs);

        return () => clearInterval(todayCheckInterval);
    }, [today]);

    return today;
}